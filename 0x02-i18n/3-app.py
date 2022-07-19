#!/usr/bin/env python3
"""This script will create a basic flask app"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)


class Config():
    """This class will hold a list of supported languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)


@babel.localeselector
def get_locale():
    """This function will select the best language for user"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def basic():
    """This will return simple page"""
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
