from flask import Flask
from src.apis.clarifai import clarifai
from src.apis.nutrition import nutrition


def create_app():
    app = Flask(__name__)
    app.config['IMAGE_UPLOADS'] = './uploads/'
    app.config['ALLOWED_IMAGE_EXTENSIONS'] = ['PNG', 'JPG', 'JPEG', 'GIF']
    app.register_blueprint(clarifai)
    app.register_blueprint(nutrition)
    return app
