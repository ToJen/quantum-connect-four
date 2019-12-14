FROM node:current as build

WORKDIR /usr/app/client
ENV NODE_ENV production
ENV BACKEND_URL /api
COPY client/package.json client/yarn.lock ./
RUN yarn
COPY client/. ./
RUN yarn build

FROM python:3.7.5 as server

ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/app
COPY server/requirements.txt ./
RUN pip install -r requirements.txt
COPY server/. ./
COPY --from=build /usr/app/client/public/. /usr/app/static
CMD [ "uwsgi", "--ini", "uwsgi.ini" ]