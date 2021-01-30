import { Selector, RequestLogger } from 'testcafe';

const url = `${process.env.REACT_APP_FEEDBACK_API || 'http:localhost:3001'}`;
const logger = RequestLogger({ url, method: 'post' }, {
    logResponseHeaders: true,
    logResponseBody:    true,
    stringifyResponseBody: true
});


// eslint-disable-next-line no-undef
fixture `Feedback Form`
    .page `${process.env.HOST || 'http://localhost:3000/'}`
    .requestHooks(logger);


test('should recieve response from backend on submit', async t => {
    const submitBtn = Selector('[data-qa="submitBtn"]');
    const happyBtn = Selector('[id="happy"]');
    const comments = Selector('[id="comments"]');
    const success = Selector('h1').innerText;
    
    const expectedRes = {
        mood: 'happy',
        otherMood: '',
        comments: 'great' 
    };


    await t
        .click(happyBtn)
        .typeText(comments, expectedRes.comments)
        .click(submitBtn)
        .expect(success).contains('Thank you for your feedback!', { timeout: 50000 });

    const response = await logger.requests[0].response.body;
    
    await t
        .expect(logger.contains(r => r.response.statusCode === 200)).ok()
        .expect(response).eql(JSON.stringify(expectedRes));
});
