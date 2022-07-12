#!/usr/bin/env python3
"""This script will create the BaseCache Class"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """This class will define BasicCache it's attributes and methods"""

    def put(self, key, item):
        """This function will add key-value to self.cache_data"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """This function will return the value of key"""
        if (key is None) or (key not in self.cache_data):
            return None
        return self.cache_data.get(key)
