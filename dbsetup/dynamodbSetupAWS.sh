#!bin/bash

aws dynamodb create-table --table-name feedback --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=3,WriteCapacityUnits=3 --endpoint-url http://dynamodb:8000;

aws dynamodb put-item --table-name feedback --item '{"id": {"S": "1"}, "created": {"S": "2020-12-10T10:26:19.901Z"}, "mood": {"S": "Happy"}, "comments": {"S": "Great!"}, "otherMood": {"S": ""}}' --endpoint-url http://dynamodb:8000;

aws dynamodb list-tables --endpoint-url http://dynamodb:8000;

aws dynamodb scan --table-name feedback --endpoint-url http://dynamodb:8000;

while [ true ]
do 
    sleep 100
done