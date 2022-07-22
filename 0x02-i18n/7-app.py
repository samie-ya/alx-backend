#!/usr/bin/env python3
"""This script will create a basic flask app"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
import pytz


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

app = Flask(__name__)


class Config():
    """This class will hold a list of supported languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)
app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """This function will select the best language for user"""
    locale = request.args.get('locale')
    user = get_user()
    if locale in Config.LANGUAGES:
        return locale
    elif (locale not in Config.LANGUAGES) and (user is not None) and\
         (user['locale'] in Config.LANGUAGES):
        return user['locale']
    elif (user is None) and\
         (locale not in Config.LANGUAGES):
        return request.accept_languages.best_match(Config.LANGUAGES)
    else:
        return Config.BABEL_DEFAULT_LOCALE


@babel.timezoneselector
def get_timezone():
    """This function will select the best timezone for user"""
    try:
        tz = request.args.get('timezone')
        user = get_user()
        if tz is not None:
            timezone = pytz.timezone(tz)
            return timezone
        elif (tz is None) and (user is not None):
            timezone = pytz.timezone(user['timezone'])
            return timezone
        elif (tz is None and user is None):
            return pytz.timezone(Config.BABEL_DEFAULT_TIMEZONE)
    except pytz.exceptions.UnknownTimeZoneError:
        pass


def get_user():
    """This function will check if login is given and return dict"""
    user = request.args.get('login_as')
    if user is not None:
        user_id = int(user)
        if user_id in users.keys():
            return users[user_id]
        else:
            return None
    else:
        return None


@app.before_request
def before_request():
    """This function will be executed before all"""
    g.user = get_user()


@app.route('/')
def basic():
    """This will return simple page"""
    return render_template('7-index.html', user=g.user)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
