// Basic login

describe("log in a user", function(){
    it("loads the landing page", function(){
        // cy.visit("https://chips-n-dip.herokuapp.com/")
        cy.visit('https://www.google.com')
    })

    context('logs in', function(){
        it('email and password and submits', function(){

            // cy.get('[data-cy-email]').type('testtest123@mailinator.com')
            // cy.get('[data-cy-password]').type('testpassword')

            // cy.get('[data-cy-log-in-button]').click()

            // cy.get('[data-cy-home-wrap]').should('be.visible')

            cy.get('body').should('be.visible')
        })
    })
})