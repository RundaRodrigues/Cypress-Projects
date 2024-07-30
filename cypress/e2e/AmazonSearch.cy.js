import testData from '../fixtures/Amazon.json'
describe('Logging into amazon with valid credentials and performing a search', () => {
  it('should login with no errors and validate account name', () => {
    //Clear all cookies
    cy.clearCookies()

    //Opens website and validates its url
    cy.visit(testData.url)
    cy.url().should('include', testData.url)

    //Clicks sign in button
    cy.get('#nav-signin-tooltip > .nav-action-signin-button > .nav-action-inner').click()
    cy.wait(1000)

    //Type email account
    cy.get('#ap_email').type(testData.email)

    //Click Continue Button
    cy.get('.a-button-inner > #continue').click()
    cy.wait(1000)
    
    //Type account password
    cy.get('#ap_password').type(testData.password)

    //Click Login
    cy.get('#signInSubmit').click()
    cy.wait(1000)

    //Validate Account name
    cy.get('#nav-link-accountList-nav-line-1').should('have.text', 'Olá, Cypress')

    //Perform a search
    cy.get('#twotabsearchtextbox').click()
    cy.get('#twotabsearchtextbox').type(testData.item)
    cy.get('#nav-search-submit-button').click()

    //Verify if results are shown
    cy.get('.s-no-outline > .a-size-medium-plus').should('be.visible').should('have.text', 'Resultados')
  })
})
