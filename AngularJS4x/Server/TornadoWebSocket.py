#!/usr/bin/env python
# -*- coding: utf-8 -*-
import tornado.web
import tornado.ioloop
import tornado.httpserver
import tornado.options
import os
import datetime
import time
import json
from tornado.web import RequestHandler
from tornado.options import define, options
from tornado.websocket import WebSocketHandler,WebSocketClosedError
import threading
import uuid
from Model import products, comments
from threading import Timer


# 保存所有client的连接
all_client = []

class AttentionPriceHandler(WebSocketHandler,RequestHandler):
    global all_client

    def open(self):
        self.write_message("Welcome to websocket server!")

    def on_message(self, message):
        '''
        接收到客户端数据时执行的方法。
        :param message:
        :return:
        '''
        #将客户端发来的数据转为dict
        params = json.loads(json.loads(message)) # 第一次json.loads()转成原对象str,再次用json.loads()转为dict
        print("FromClient: %s, %s" % (params, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

        for client in all_client:
            if client['user'] == params['user']:
                client['prod'].append(params['prodid'])
                print(all_client)
                return
            else:
                continue

        client = {}
        client['id'] = uuid.uuid1()
        client['con'] = self
        client['ip'] = self.request.remote_ip
        client['user'] = params['user']
        client['prod'] = []
        client['prod'].append(params['prodid'])
        all_client.append(client)
        print(all_client)

    def on_close(self):
        print("Client Close.")
        print(all_client)

    def check_origin(self, origin):
        return True  # 允许WebSocket的跨域请求

# class ChatHandler(WebSocketHandler):
#     global all_client, id, myclient
#
#     def open(self):
#         myclient['id'] = uuid.uuid1()
#         myclient['con'] = self
#         print(myclient['con'].request.remote_ip)
#         myclient['con'].write_message("Welcome to websocket server!")
#         all_client.append(myclient)
#         print(all_client)
#
#
#     def on_message(self, message):
#         print("FromClient: %s, %s" % (message, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
#         self.write_message("This message form Server...")
#
#     def on_close(self):
#         for item in all_client:
#             if item['con'] == self:
#                 all_client.remove(item)
#         print("Client Close.")
#         print(all_client)
#
#     def check_origin(self, origin):
#         return True  # 允许WebSocket的跨域请求


def getNewPrice(prodIds):
    '''
    循环用户关注过的商品，取出原来的价格，并在原来的价格上加20
    :param clients:
    :return:
    '''
    ret = []
    for id in prodIds:
        msg = {}
        msg['prodId'] = id
        for product in products:
            if product.id == id:
                msg['bid'] = product.price
                break
        msg['bid'] = msg['bid'] + 20
        ret.append(msg)
    return ret



def loop():
    '''循环发送数据至所有client'''
    while (True):
        if (len(all_client)!= 0):
            for client in all_client:
                # 循环用户关注过的商品，取出原来的价格，并在原来的价格上加20
                sendMsgs = getNewPrice(client['prod'])
                print(sendMsgs)
                try:
                    client['con'].write_message(json.dumps(sendMsgs))
                    print("send message to client.")
                except Exception as ex:
                    print(ex)
        else:
            print("no client.")
        time.sleep(5)

if __name__ == '__main__':
    t = threading.Thread(target=loop, name='LoopThread')
    t.daemon = True # 设置线程daemon  主线程退出，daemon线程也会推出，即时正在运行
    t.start()
    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r"/attentionPrice/", AttentionPriceHandler)
    ],
        # debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(port=5555, address="127.0.0.1")
    tornado.ioloop.IOLoop.current().start()
