/*globals Cypress cy*/

describe('Feedback Form Tests', () => {
    const submitBtn = '[data-qa="submitBtn"]';
    const happyOption = '[id="happy"]';
    const comments = '[id="comments"]';

    const expectedMessage = 'Thank you for your feedback!';

    const expectedRes = {
        mood: 'happy',
        otherMood: '',
        comments: 'great' 
    };

    it('should post to feedback backend API', () => {
        cy.intercept('POST', '/feedback').as('backendAPI');

        cy.visit(Cypress.env('HOST'));

        cy.get(happyOption).check();
        cy.get(comments).type('great')
        cy.get(submitBtn).click();

        cy.wait('@backendAPI').then(xhr => {
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.response.body).to.deep.equal(expectedRes);
        });

        cy.get('h1').should('contain', expectedMessage);
        cy.get('h1').should('not.contain', 'Feedback Form');
    });
});