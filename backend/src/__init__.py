from flask import Flask
import os
from src.routes.auth import auth
from src.routes.food import food
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['IMAGE_UPLOADS'] = os.path.abspath('./uploads')

    CORS(app)

    app.register_blueprint(auth)
    app.register_blueprint(food)

    return app
