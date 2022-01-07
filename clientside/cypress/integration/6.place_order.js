describe('Client place order', () => {
    it('Should start posting an order on the hero image page', () => {
        // First visit the home page
        cy.visit('/')
        // click the login button
        cy.get('#login_span').click()

        // Login first before continuing
        const userEmail = String(Date.now()).concat('@user.com')

        cy.get('#loginEmail')
            .type(userEmail)
            .should('have.value', userEmail)

        // click the login button to continue
        cy.get('#submit_email_btn').click()

        // Fill the place-order form on the heros image

        // Choose discipline
        cy.get('[data-cy=assignment-type-input-hero]').parent().forceClick()
        cy.contains("Case Study").forceClick()

        // Enter number of pages
        cy.wrap([1, 2]).each((num, i, array) => {
            cy.get('#num-of-pages-buttons-client-add-hero').forceClick()
        })

        // Invoke the menu
        cy.get('input[role=button]').click()
        const date = new Date()
        let currentDatePlus1 = new Date().getDate()
        const numOfDaysInAMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        if (currentDatePlus1 !== numOfDaysInAMonth) {
            currentDatePlus1 += 1
        }
        cy.get('table').contains('td', currentDatePlus1).click()

        // Choose deadline time
        cy.get('[data-cy=deadline-time-input-hero]').parent().forceClick()
        // Check whether time is within the required frame
        cy.contains('12AM').forceClick()
    })

    it('Should continue with the posting order on the place-order page', () => {
        // Continue
        cy.get('#continue_btn').forceClick()

        // Choose discipline
        cy.get('[data-cy=discipline-input-hero]').parent().forceClick()
        cy.contains("Business and Management").forceClick()

        // Enter topic
        cy.get('#topic')
            .type('The Enron Scandal of 2001', { force: true })

        // Insert paper instructions
        cy.get('#paper_instructions').type('The story of Enron Corporation depicts a company that reached dramatic heights only to face a dizzying fall.' +
          ' The fated company\'s collapse affected thousands of employees and shook Wall Street to its core. At ' +
          'Enron\'s peak, its shares were worth $90.75; just prior to declaring bankruptcy on Dec. 2, 2001, they were' +
          ' trading at $0.26.1﻿ To this day, many wonder how such a powerful business, at the time one of the ' +
          'largest companies in the United States, disintegrated almost overnight. Also difficult to fathom is how' +
          ' its leadership managed to fool regulators for so long with fake holdings and off-the-books accounting. \n' +
          '\n' +
          'KEY TAKEAWAYS\n' +
          'Enron\'s leadership fooled regulators with fake holdings and off-the-books accounting practices.\n' +
          'Enron used special purpose vehicles (SPVs), or special purposes entities (SPEs), to hide its mountains of ' +
          'debt and toxic assets from investors and creditors.2﻿\n' +
          'The price of Enron\'s shares went from $90.75 at its peak to $0.26 at bankruptcy.1﻿\n' +
          'The company paid its creditors more than $21.7 billion from 2004 to 2011.', { force: true })
        // Choose level of study
        cy.get('[data-cy=level-of-study-input]').parent().forceClick()
        // Check whether time is within the required frame
        cy.contains('Undergraduate').forceClick()

        // Enter number of sources
        cy.get('#sources')
          .type(5, { force: true })

        // Choose formating style
        cy.get('[data-cy=formatting-style-input]').parent().forceClick()
        // Check whether time is within the required frame
        cy.contains('Harvard').forceClick()

        // Click the select writer button to proceed to choose a writer
        cy.get('#continue_btn').forceClick()
    })

    it('Should choose a writer successfully', () => {

        // Select a writer
        cy.get('.accept-btn').first().forceClick()

        // Wait first (for the overlay success button to display) before continuing to the next step
        cy.wait(2000)
    })

    it('Should proceed to checkout', () => {
        // Proceed to checkout
        cy.get('.payment-btn').forceClick()
    })


    it('Should pay via mpesa', () => {
        // Enter mobile phone
        cy.get('#mobile-number').type('0700087410')

        // Pay money
        cy.get('#pay-now-btn').forceClick()

        // Initiate payment
        cy.get('#initiate_payment').forceClick()

        // Wait for mpesa transaction to update before continuing
        cy.wait(20000)
    })
})
