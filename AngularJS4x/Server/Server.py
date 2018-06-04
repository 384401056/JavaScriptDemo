#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from Model import Product, Comment
from flask_cors import CORS
import json

products = [
    Product(1, "第一个商品", 20.3, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    Product(2, "第二个商品", 30.64, 2.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
    Product(3, "第三个商品", 40.4, 1.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    Product(4, "第四个商品", 50.47, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    Product(5, "第四个商品", 60.34, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    Product(6, "第五个商品", 70.34, 2.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    Product(7, "第五个商品", 80.4, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
    Product(8, "第六个商品", 90.34, 4.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "儿童食品"]),
    Product(9, "第一个商品", 120.4, 1.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["电子商品", "日用百货"]),
    Product(10, "第一个商品", 420.34, 3.5, "这是一个商品，就是一个商品，为什么是一个商品？我不知道。", ["儿童食品", "日用百货"]),
]

comments = [
    Comment(1, 1, "2018-12-12 12:20:40", "张三", 1, "商品不错，下次还会光顾的."),
    Comment(2, 1, "2018-12-12 12:20:40", "张三", 2, "商品不错，下次还会光顾的."),
    Comment(3, 2, "2018-12-12 12:20:40", "张三", 3, "商品不错，下次还会光顾的."),
    Comment(4, 2, "2018-12-12 12:20:40", "张三", 4, "商品不错，下次还会光顾的."),
    Comment(5, 3, "2018-12-12 12:20:40", "张三", 5, "商品不错，下次还会光顾的."),
    Comment(6, 3, "2018-12-12 12:20:40", "张三", 1, "商品不错，下次还会光顾的."),
    Comment(7, 4, "2018-12-12 12:20:40", "张三", 2, "商品不错，下次还会光顾的."),
]


app = Flask(__name__)
CORS(app, supports_credentials=True) # 解决跨域

@app.route('/api')
def hello_world():
    return ''


@app.route('/api/products')
def getProducts():
    '''
    返回商品列表
    :return:
    '''
    # 序列表python对象。
    return json.dumps(products, default=lambda obj: obj.__dict__, sort_keys=True, indent=4)


@app.route('/api/products/<int:id>')
def getProductById(id):
    '''
    根据id返回商品信息
    :param id: 商品id
    :return:
    '''
    product = {}
    for item in products:
        if item.id == id:
            product = item
            break
    return json.dumps(product, default=lambda obj: obj.__dict__, sort_keys=True, indent=4)

@app.route('/api/comments')
def getComments():
    '''
    返回所有评论
    :return:
    '''
    return json.dumps(comments, default=lambda obj: obj.__dict__, sort_keys=True, indent=4)

@app.route('/api/comments/<int:id>')
def getCommentsByProdId(id):
    '''
    根据商品id返回评论列表。
    :param id:
    :return:
    '''
    results = []
    for item in comments:
        if item.productId == id:
            results.append(item)
    return json.dumps(results, default=lambda obj: obj.__dict__, sort_keys=True, indent=4)

def main():
    app.run(host="127.0.0.1", port=8000, debug=True)


if __name__ == '__main__':
    main()
