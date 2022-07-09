#!/usr/bin/env python3
"""This script will create server class"""
import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """This function will initilize a class"""
        self.__dataset = None

    @staticmethod
    def indexrange(page: int, page_size: int) -> Tuple:
        """This function will return the start and end index"""
        return ((page - 1) * page_size, page_size * page)

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """This function will return a list of rows forgiven page"""
        if (type(page) == int) and (type(page_size) == int):
            assert(page > 0)
            assert(page_size > 0)
            start_end = Server.indexrange(page, page_size)
            data = self.dataset()
            return data[start_end[0]: start_end[1]]
        raise AssertionError
