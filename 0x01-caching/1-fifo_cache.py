#!/usr/bin/env python3
"""This script will create the FIFOCache Class"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """This class will define FIFOCache it's attributes and methods"""

    def __init__(self):
        """This function will initialize the class"""
        super().__init__()

    def put(self, key, item):
        """This function will add key-value to self.cache_data"""
        if key is not None and item is not None:
            if (len(self.cache_data) < BaseCaching.MAX_ITEMS):
                self.cache_data[key] = item
            else:
                if (key in self.cache_data):
                    self.cache_data[key] = item
                else:
                    first = list(self.cache_data.keys())[0]
                    print("DISCARD: {}".format(first))
                    del self.cache_data[first]
                    self.cache_data[key] = item

    def get(self, key):
        """This function will return the value of key"""
        if (key is None) or (key not in self.cache_data):
            return None
        return self.cache_data.get(key)
