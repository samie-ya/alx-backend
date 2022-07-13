#!/usr/bin/env python3
"""This script will create the LFUCache Class"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """This class will define LFUCache it's attributes and methods"""
    counter = {}

    def __init__(self):
        """This function will initialize the class"""
        super().__init__()

    def put(self, key, item):
        """This function will add key-value to self.cache_data"""
        no_key_list = []
        if key is not None and item is not None:
            if (len(self.cache_data) < BaseCaching.MAX_ITEMS):
                self.cache_data[key] = item
            else:
                if (key in self.cache_data):
                    self.cache_data[key] = item
                else:
                    for k in sorted(self.cache_data.keys()):
                        if k not in LFUCache.counter:
                            no_key_list.append(k)
                    if self.cache_data.keys() == LFUCache.counter.keys():
                        no_key_list.append(list(self.cache_data.keys())[0])
                    first = no_key_list[0]
                    print("DISCARD: {}".format(first))
                    del self.cache_data[first]
                    self.cache_data[key] = item

    def get(self, key):
        """This function will return the value of key"""
        if (key is None) or (key not in self.cache_data):
            return None
        else:
            value = self.cache_data.get(key)
            if key not in LFUCache.counter:
                LFUCache.counter[key] = value
            return self.cache_data.get(key)
