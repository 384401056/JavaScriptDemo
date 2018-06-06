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
from tornado.websocket import WebSocketHandler
import threading
import uuid

class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")

# 保存所有client的连接
all_client = []
myclient = {}
id = 0

class ChatHandler(WebSocketHandler):
    global all_client, id, myclient

    def open(self):
        myclient['id'] = uuid.uuid1()
        myclient['con'] = self
        print(myclient['con'].request.remote_ip)
        myclient['con'].write_message("Welcome to websocket server!")
        all_client.append(myclient)
        print(all_client)


    def on_message(self, message):
        print("FromClient: %s, %s" % (message, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
        self.write_message("This message form Server...")

    def on_close(self):
        for item in all_client:
            if item['con'] == self:
                all_client.remove(item)
        print("Client Close.")
        print(all_client)

    def check_origin(self, origin):
        return True  # 允许WebSocket的跨域请求



def task():
    '''循环发送数据至所有client'''
    while (True):
        if (len(all_client)!= 0):
            for client in all_client:
                try:
                    client['con'].write_message("这是来自服务器的循环推送....")
                    print("send message to client.")
                except WebSocketClosedError:
                    print('WebSocketClosedError')
        else:
            print("no client.")
        time.sleep(5)

if __name__ == '__main__':
    threading.Thread(target=task).start()

    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r"/", IndexHandler),
        (r"/chat", ChatHandler),
    ],
        debug=True
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(port=5555, address="0.0.0.0")
    tornado.ioloop.IOLoop.current().start()
