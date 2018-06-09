#!/usr/bin/env python
# -*- coding: utf-8 -*-
import tornado.web
import tornado.ioloop
import tornado.httpserver
import tornado.options
from tornado.web import RequestHandler
from tornado.options import define, options
from tornado.websocket import WebSocketHandler,WebSocketClosedError
import os
import datetime
import time
import json
import threading
import uuid
from Model import products, comments
from concurrent.futures import ThreadPoolExecutor
import random

# 保存所有client的连接
all_client = []
PUSH_TIME = 2

class AttentionPriceHandler(WebSocketHandler,RequestHandler):


    def open(self):
        # self.write_message("Welcome to websocket server!")
        print("client is connection...")

    def on_message(self, message):
        '''
        接收到客户端数据时执行的方法。
        :param message:
        :return:
        '''
        #将客户端发来的数据转为dict
        params = json.loads(message) # 用json.loads()转为dict
        print("FromClient: %s, %s" % (params, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

        for client in all_client:
            # 如果client list中有此连接，就只修改关注的商品ID。
            if client['con'] == self:
                if params['prodid'] not in client['prod']:
                    client['prod'].append(params['prodid'])
                return
            else:
                continue

        # 如果连接为新，则创建一个新的client
        client = {}
        client['id'] = uuid.uuid1()
        client['con'] = self
        client['ip'] = self.request.remote_ip
        client['prod'] = []
        client['prod'].append(params['prodid']) # 关联关注的商品
        all_client.append(client)
        print(all_client)

    def on_close(self):
        print("Client Close.")
        for client in all_client:
            if client['con'] == self:
                all_client.remove(client)
        print(all_client)

    def check_origin(self, origin):
        return True  # 允许WebSocket的跨域请求



def getNewPrice(prodIds):
    '''
    循环用户关注过的商品，取出原来的价格，并在原来的价格上加上一个随机数。
    :param clients:
    :return:
    '''
    ret = []
    for id in prodIds:
        msg = {}
        msg['prodId'] = id
        for product in products:
            if product.id == id:
                msg['newprice'] = product.price
                break
        msg['newprice'] = msg['newprice'] + random.randint(10,100)
        ret.append(msg)
    return ret



def loop():
    global all_client, PUSH_TIME
    '''循环发送数据至所有client'''
    while (True):
        if (len(all_client)!= 0):
            for client in all_client:
                # 循环用户关注过的商品，取出原来的价格，并在原来的价格上加个随机数
                sendMsgs = getNewPrice(client['prod'])
                print(sendMsgs)
                try:
                    client['con'].write_message(json.dumps(sendMsgs))
                    print("send message to client.")
                except Exception as ex:
                    print(ex)
        else:
            print("no client.")
        time.sleep(PUSH_TIME)



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
    print("Tornado websocket start..")
    tornado.ioloop.IOLoop.current().start()
