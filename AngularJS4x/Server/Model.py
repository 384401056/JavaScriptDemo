#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Product(object):
    def __init__(self, id, title, price, rating, desc, *categories):
        self.id = id
        self.title = title
        self.price = price
        self.rating = rating
        self.desc = desc
        self.categories = categories


class Comment(object):
    def __init__(self, id, productId, timestamp, user, rating, content):
        self.id = id
        self.productId = productId
        self.timestamp = timestamp
        self.user = user
        self.rating = rating
        self.content = content
