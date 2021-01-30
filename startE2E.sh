#!/bin/bash
docker network create feedback-network;
cd frontend
npm install
REACT_APP_FEEDBACK_API='http://host.docker.internal:3001/feedback' npm run build
cd ..

sam local start-api -p 3001 --host 0.0.0.0 --env-vars ./backend/env.json -t ./backend/template.yaml --docker-network feedback-network --debug & docker-compose up --exit-code-from testcafe;

kill -9 `ps aux | grep sam | awk '{print $2}'` &> /dev/null;
