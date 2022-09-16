from flask import Flask
import os
from src.routes.auth import auth
from flasgger import Swagger, swag_from
from src.config.swagger import template


def create_app():

    app = Flask(__name__)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
    app.config['SECRET_KEY'] = SECRET_KEY

    app.register_blueprint(auth)
    Swagger(app, template=template)

    return app
