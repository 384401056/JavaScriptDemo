#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

class Foo(object):
    bar = 'hello'
    baz = 'world'


def main():
    foo = [1,2,3,4,5,6,7]
    # f = Foo()
    # print(obj_to_json(f))
    # print(dict((name, getattr(f, name)) for name in dir(f) if not name.startswith('__')))
    # print(json.dumps(dict((name, getattr(f, name)) for name in dir(f) if not name.startswith('__'))))
    num = lambda x: x==4 ,foo
    print()

def obj_to_json(obj):
    return json.dumps(dict((name, getattr(obj, name)) for name in dir(obj) if not name.startswith('__')))

if __name__ == '__main__':
    main()