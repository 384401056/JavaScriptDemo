#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask,request
from flask_cors import CORS
import json
import urllib
from Model import products, comments,Product, Comment

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
    # print(request.args) # 获取url上传递过来的参数。
    # print(request.form['title']) # 获取form表单提交的参数。

    result = products

    if request.args.get('title'):
        # urllib.parse.unquote 将url中的中文参数转为中文
        title =urllib.parse.unquote(request.args.get('title'))
        result = [pro for pro in result if pro.title == title] # 匹配出title


    if request.args.get('price') and request.args.get('price') != '0' and len(result)>0:
        price = request.args.get('price')
        result = [pro for pro in result if int(pro.price) <= int(price)] # 匹配出price(小于等于)


    if request.args.get('category') and request.args.get('category') != '-1' and len(result)  > 0:
        category = urllib.parse.unquote(request.args.get('category'))
        result = [pro for pro in result if category in pro.categories] # 匹配出 category

    return json.dumps(result,default=lambda obj: obj.__dict__, sort_keys=True, indent=4)


@app.route('/api/products/<int:id>')
def getProductById(id):
    '''
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

# @app.route('/api/addComment')
# def addComment():
#     request.form['username']
#     comments.append()


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


@app.route('/api/categories')
def getCategories():
    results = ["电子商品", "儿童食品","日用百货"]
    return json.dumps(results)


def otj(obj):
    return dict((name, getattr(obj, name)) for name in dir(obj) if not name.startswith('__'))

def main():
    app.run(host="127.0.0.1", port=8000, debug=True)

if __name__ == '__main__':
    main()
