FROM python:alpine3.9

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . /app

EXPOSE 5001

CMD [ "gunicorn", "--bind", "0.0.0.0:5001", "-w", "2" , "server:app","--log-level","debug"]