from flask import Flask
from src.apis.clarifai import clarifai


def create_app():
    app = Flask(__name__)
    app.config['IMAGE_UPLOADS'] = './uploads/'
    app.config['ALLOWED_IMAGE_EXTENSIONS'] = ['PNG', 'JPG', 'JPEG', 'GIF']
    app.register_blueprint(clarifai)
    return app
