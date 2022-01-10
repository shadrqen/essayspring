/* eslint-disable no-undef */
describe('Login', () => {
  it('Should log client in', () => {
    cy.visit('/')
    // click the login button
    cy.get('#login_span').click()

    const userEmail = String(Date.now()).concat('@user.com')

    // Enter email before submitting
    cy.get('#loginEmail')
      .type(userEmail)
      .should('have.value', userEmail)

    // click the login button to continue
    cy.get('#submit_email_btn').click()
  })
})
/* eslint-enable no-undef */
