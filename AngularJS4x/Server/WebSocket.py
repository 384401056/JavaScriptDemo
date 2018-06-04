#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_socketio import SocketIO, emit
from flask import Flask
from flask_cors import CORS

from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, supports_credentials=True)
socketio = SocketIO(app)

def main():
    socketio.run(app, host="127.0.0.1", port=5555)


if __name__ == '__main__':
    main()