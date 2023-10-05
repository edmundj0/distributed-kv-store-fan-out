FROM python:3.11-slim-buster

WORKDIR /python-docker

RUN pip3 install requests flask

COPY . .

CMD ["python3", "app.py"]
