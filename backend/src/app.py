from json import load
from flask import Flask
from routes.auth import auth


app = Flask(__name__)


app.register_blueprint(auth)


app.run()
