#!/usr/bin/env python3
"""This script will be a helper function"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple:
    """This function will return the start and end index"""
    return ((page - 1) * page_size, page_size * page)
