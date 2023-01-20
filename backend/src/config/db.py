import os
import datetime
from sqlalchemy import create_engine, DateTime, Boolean, ForeignKey, Float, Integer, Column, String, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
Base = declarative_base()
engine = create_engine(
    os.environ["DB_ENDPOINT"], echo=True)


class ConsumedFood(Base):
    __tablename__ = "consumed_foods"
    id = Column('id', Integer, primary_key=True)
    user_id = Column("user_id", Integer, ForeignKey(
        'users.id'), nullable=False)
    name = Column("name", String, nullable=False)
    image = Column("image", String, nullable=False)
    calorie = Column("calorie", Float, nullable=False)
    carbohydrates = Column("carbohydrates", Float, nullable=False)
    fat = Column("fat", Float, nullable=False)
    proteins = Column("proteins", Float, nullable=False)
    calcium = Column("calcium", Float, nullable=False)
    is_intake = Column('is_intake', Boolean, default=False)
    consumed_on = Column('consumed_on', DateTime,
                         default=datetime.datetime.utcnow)

    def __init__(self, user_id, name, image, calorie, carbohydrates, fat, proteins, calcium):
        self.user_id = user_id
        self.name = name
        self.image = image
        self.calorie = calorie
        self.carbohydrates = carbohydrates
        self.fat = fat
        self.proteins = proteins
        self.calcium = calcium


class User(Base):
    __tablename__ = "users"
    id = Column('id', Integer, primary_key=True)
    username = Column("username", String)
    email = Column("email", String)
    login_password = Column("login_password", String)
    is_login_process_complete = Column(
        "is_login_process_complete", Boolean, default=False)
    weight = Column("weight", Float)
    height = Column("height", Float)
    age = Column("age", Float)
    gender = Column("gender", String)
    activity = Column("activity", Float)
    __table_args__ = (UniqueConstraint('email'),)

    def __init__(self, username, email, login_password=None):
        self.username = username
        self.email = email
        self.login_password = login_password


Base.metadata.create_all(bind=engine)
session = sessionmaker(bind=engine)()
