import testData from '../fixtures/Amazon.json'
describe('Logging into amazon with valid credentials', () => {
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
  })
})


describe('Logging into amazon with invalid credentials', () => {
  it('should show error message when leaving all fields blank', () => {
    //Clear all cookies
    cy.clearCookies()

    //Opens website and validates its url
    cy.visit(testData.url)
    cy.url().should('include', testData.url)

    //Clicks sign in button
    cy.get('#nav-signin-tooltip > .nav-action-signin-button > .nav-action-inner').click()
    cy.wait(1000)

    //Type invalid email account
    cy.get('#ap_email').type(testData.wrongEmail)

    //Click Continue Button
    cy.get('.a-button-inner > #continue').click()
    cy.wait(1000)

    //Verify error message
    cy.get('#auth-email-invalid-claim-alert > .a-box-inner > .a-alert-content').should('have.text', '\n  Endereço de e-mail ou número de telefone celular errado ou inválido. Corrija e tente novamente.\n')
    
  })
})