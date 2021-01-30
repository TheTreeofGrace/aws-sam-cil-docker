const AWS = require('aws-sdk');

exports.lambdaHandler = (event, context, callback) => {

    if(process.env.AWS_SAM_LOCAL === 'true') AWS.config.update({endpoint: 'http://dynamodb:8000'});

    const dynamo = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.FEEDBACK_TABLE_NAME;

    const done = (err) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : event.body,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
    });

    const id = () => {
        return Math.floor(Math.random() * Math.floor(999999)).toString();
    }

    const postFeedback = (payload) => {
        try {
            const now = new Date().toISOString();
            const params = {
                TableName: tableName,
                Item: {
                    id: id(),
                    mood: payload.mood,
                    comments: payload.comments,
                    otherMood: payload.otherMood,
                    created: now,
                },
            };
            return dynamo.put(params).promise();
        } catch(e) {
            return e;
        }
    }
    
    if(event.httpMethod === 'POST') {
        try {
            const payload = JSON.parse(event.body);
            console.log('PAYLOAD: ', payload);
            return postFeedback(payload).then(done());
        } catch (e) {
            return done(e);
        }  
    } else if (event.httpMethod === 'OPTIONS'){
        return done();
    } else {
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
