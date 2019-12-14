FROM python:3.7.5 AS server

WORKDIR /usr/app/server
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./