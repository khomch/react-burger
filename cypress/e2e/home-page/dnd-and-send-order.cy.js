import '@4tw/cypress-drag-drop'

describe('Ingredients grag-and-drop', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    it('should open modal with IngredientDetails and close it', () => {
        cy.get('#60d3b41abdacab0026a733c7').click();
        cy.get('#close-icon').click();
    });
    it('should drag-and-drop Ingredients (Space Sauce, Protostomia & Bun R2-D3) to Burger-Constructor, login and send Order', () => {
        cy.get('#60d3b41abdacab0026a733cd').drag('#burger-constructor');
        cy.get('#60d3b41abdacab0026a733c7').drag('#burger-constructor');
        cy.get('#60d3b41abdacab0026a733c9').drag('#burger-constructor');

        cy.get('button').contains('Оформить заказ').click();

        cy.get('#authorization_form').contains('Email').type('test558@gmail.com')
        cy.get('#authorization_form').contains('Пароль').type('123456');
        cy.get('#authorization_form').contains('Войти').click();

        cy.get('#order-button').click();

        cy.wait(20000)
        cy.get('#close-icon').click();
    });


}); 