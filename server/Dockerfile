FROM python:3.7.5 AS server

ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/app/server
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
CMD [ "python", "main.py" ]