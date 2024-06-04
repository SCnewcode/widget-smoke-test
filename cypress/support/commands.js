// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress-xpath" />

/// <reference types="cypress-mailslurp" />



const { MailSlurp } = require("mailslurp-client");


const apiKey = "a4b806078287db33a34474113799045ffd3640d39112a87e1a579057ac05f6a0";// or Cypress.env("API_KEY")
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
    return mailslurp.inboxController.createInboxWithOptions({
          createInboxDto: {
              useShortAddress: true,
            },
    });
  });
  


  Cypress.Commands.add('waitForLatestEmail', (inboxId) => {

    // const queryParams = {
    //   sort: 'ASC',
    //   unreadOnly: false,
    //   matchOptions: null,
    //   // createdAtAfter: '2000-01-01T00:00:00Z',
    //   // createdAtBefore: '3000-01-01T00:00:00Z',
    //   timeoutMillis: 10000
    // };
      return mailslurp.waitForLatestEmail(inboxId );
 
  });


  Cypress.Commands.add("deleteInbox", (inboxId) => {
    return mailslurp.deleteInbox(inboxId);
  });


  Cypress.Commands.add('clickRandomClickableLinkInList', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject).find('a').then($links => {
      // Filter out only the clickable links
      const clickableLinks = $links.filter((index, link) => {
        return Cypress.$(link).is(':visible') && !link.disabled && Cypress.$(link).css('pointer-events') !== 'none';
      });
  
      // Check if there are any clickable links
      if (clickableLinks.length > 0) {
        // Generate a random index within the range of clickable links
        const randomIndex = Cypress._.random(0, clickableLinks.length - 1);
        // Click the randomly selected clickable link
        cy.wrap(clickableLinks[randomIndex]).click();
    
      } else {
        cy.log('No clickable links found in the list.');
      }
    });
  });


  Cypress.Commands.add('clickRandomClickableLinkInListProd', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject).find('a').then($links => {
      // Filter out only the clickable links
      const clickableLinks = $links.filter((index, link) => {
        return Cypress.$(link).is(':visible') && !link.disabled && Cypress.$(link).css('pointer-events') !== 'none';
      });
  
      // Check if there are any clickable links
      if (clickableLinks.length > 0) {
        // Generate a random index within the range of clickable links
        const randomIndex = Cypress._.random(0, clickableLinks.length - 1);
        // Click the randomly selected clickable link
        cy.wrap(clickableLinks[randomIndex]).click();
    
      } else {
        cy.log('No clickable links found in the list.');
      }
    });
  });



Cypress.Commands.add('loginWithUITest', (username, otp) => {


        cy.session([username, otp],  () => {

          cy.visit(Cypress.env('development').baseUrl + '/widget4site1/user/login');
        // cy.visit('widget4site1/user/login')

        cy.get('[inputmode="email"]').type(username); //test
        cy.get("[class='p-checkbox p-component base-checkbox']").click()
        cy.get("[class='btn btn-regular']").click()
        cy.wait(2000)
        cy.get('[inputmode="numeric"]').type(otp);
        cy.get(".login-form__actions > button").click();
        cy.wait(2000),

        {
          cachesAcrossSpecs: true
        }

     })
 })

