/// <reference types="cypress" />


import 'cypress-mailosaur'

import {faker} from '@faker-js/faker'

import { WidgetElements }  from '../../pages/WidgetPageElements'


let globalNumber;


let emailAddress;
let inboxId;


let emailBody;

let optCode;

const WidgetElementsObj = new WidgetElements()

  describe('it should be check widget contact page and index localization prod', () => {

  

    beforeEach(() => {

        
      cy.createInbox().then(inbox => {

        // verify a new inbox was created
        assert.isDefined(inbox);

        cy.visit(Cypress.env('prod').baseUrl + '/en/widget97site77/user/login');
    
        // cy.visit('en/widget97site77/user/login')
        inboxId = inbox.id;
        emailAddress = inbox.emailAddress;


        cy.get('[inputmode="email"]').type(emailAddress); 

        cy.get("[class='p-checkbox p-component base-checkbox']").click()
        cy.get("[class='btn btn-regular']").click()
        cy.wait(2000)
    
    
  
        cy.log(emailAddress);
        cy.log(inboxId)
    

    
    
        cy.waitForLatestEmail(inboxId).then((email) => {
          // verify we received an email
          assert.isDefined(email);
    
          emailBody = email.body
    
          const parser = new DOMParser()
          const doc = parser.parseFromString(emailBody, 'text/html')
          var otp = doc.querySelector('p >span').textContent
          optCode = otp.trim()
          cy.log(optCode)
    
    
          expect(email.subject).to.equal('Your one-time password')
          cy.log(email.text)
    
          cy.get('[inputmode="numeric"]').type(optCode);
          cy.get(".login-form__actions > button").click();
          cy.wait(2000)

      
        });
       
      });

      cy.visit(Cypress.env('prod').baseUrl + '/en/widget97site77/widget/index');

      // cy.visit('en/widget97site77/widget/index')
  
    }); 



  it('it should be check choise event, lock tickets, book tickets prod', () => {

  
  WidgetElementsObj.localizationMenuClick()

    WidgetElementsObj.localizationChoiceClick().eq(2).click()
      
    cy.get('h3').contains('Wszystkie pokazy').should('be.visible')

    if(cy.get('h3').should('have.text', 'Wszystkie pokazy')) {
      cy.log('POL localization works')
    }


    WidgetElementsObj.localizationMenuClick()


    WidgetElementsObj.localizationChoiceClick().eq(5).click()

    cy.get('h3').contains('Alle Shows').should('be.visible')

    if(cy.get('h3').should('have.text', 'Alle Shows')) {
    cy.log('DE localization works')
    }

    WidgetElementsObj.localizationMenuClick()
 
    WidgetElementsObj.localizationChoiceClick().eq(1).click()

    cy.get('h3').contains('All shows').should('be.visible')

    if(cy.get('h3').should('have.text', 'All shows')) {
    cy.log('EN localization works')
    }


    WidgetElementsObj.checkCookieConsentBoxVisible()
    WidgetElementsObj.cookieConsentClick()
    WidgetElementsObj.checkCookieConsentBoxNotVisible()
   
    WidgetElementsObj.checkGetCookieVisible()

      cy.get('.event-list').clickRandomClickableLinkInListProd();


      // Check if element with specific class exists
cy.get('.svg-container--show')
.then(($element) => {
  if ($element.hasClass('sectors-list')) {

    cy.get('.svg-pan-zoom_viewport') 
    .find('.sector.enabled.has-info')
    .not('.disabled')

    .then(($elements) => {
      // Randomly click one of the elements
      const randomIndex = Math.floor(Math.random() * $elements.length);
      const randomElement = $elements[randomIndex];
      cy.wrap(randomElement, { force: true }).click();
    });

    cy.get('.svg-pan-zoom_viewport') 
    .find('.place')
    .not('.disabled') 

    .then(($elements) => {
      // Randomly click one of the elements
      const randomIndex = Math.floor(Math.random() * $elements.length);
      const randomElement = $elements[randomIndex];
      cy.wrap(randomElement).click();
    });


  } else {


     cy.get('body').then((body) => {
if (!body.find('div[data-pc-name="dialog"]') ) {
  cy.get('.service-message-actions') 
  .find('button[type="button"]')  
  .click()


  cy.get('.svg-pan-zoom_viewport')
  .find('.place')
  .not('.disabled') 

  .then(($elements) => {
    // Randomly click one of the elements
    const randomIndex = Math.floor(Math.random() * $elements.length);
    const randomElement = $elements[randomIndex];
    cy.wrap(randomElement).click();

  });

     } else {

      cy.get('.svg-pan-zoom_viewport') // Replace 'your-selector' with the appropriate CSS selector for your enabled elements
      .find('.place')
      .not('.disabled') 

      .then(($elements) => {



        const randomIndices = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * $elements.length)
      );

      // Perform clicks on the randomly selected elements
      randomIndices.forEach(index => {
        cy.wrap($elements[index]).click({ force: true }); // Force click if needed
      });

      });

     }

});
}
});



cy.wait(2000)

cy.get('.basket-order-sum__amount').each($element => {
  const text = $element.text().trim();
  expect(text).to.include('3 tickets');

});

const randomFullName = faker.person.fullName();

WidgetElementsObj.basketTicketsButtonClick().eq(1).find('[class="btn remove-ticket-action"]').click()

    cy.wait(1000)

    cy.get('.basket-order-sum__amount').each($element => {
      const text = $element.text().trim();
      expect(text).to.include('2 tickets');
  
    });


    cy.get("[class='place-price']").should('be.visible')
    cy.get(".place-price__title").click()
    cy.wait(1000)
    cy.get("[class='place-price__list-wrapper']").should('be.visible')
    WidgetElementsObj.btnInfoIconClick().click()
    cy.wait(1000)
    WidgetElementsObj.showDialogModalCloseClick().click()


    WidgetElementsObj.basketActionButtonClick().click()
    cy.wait(1000)

    WidgetElementsObj.checkoutOrderInfoClick().eq(0).find('[class="checkout-section__button"]').click()

      WidgetElementsObj.userContactsFieldInputFind().first().clear().type(randomFullName)  



      WidgetElementsObj.contactFormCheckoutBtnClick().click()


      WidgetElementsObj.toastNificationSuccessFind().should("be.visible").and("contain", "Your contact info saved")
  

      WidgetElementsObj.promoCodeInputType().type('test-relise1') 
      
      cy.wait(1000)


      WidgetElementsObj.promoCodeBlockBtnClick().click()

      WidgetElementsObj.toastNificationSuccessFind().should("be.visible").and("contain", "Promocode applied")

      cy.wait(1000)

      WidgetElementsObj.methodItemNameBookFind().contains('Book a ticket').click()

 
          WidgetElementsObj.basketActionButtonRegularClick().click()


       cy.wait(2000)

       cy.get('.thanks-page').should('be.visible')


       cy.get('.order-congratulation__order > span')
         .eq(1) 
         .invoke('text').as('someText')

          cy.get('@someText').then((text) => {


          const number = parseFloat(text.match(/\d+/)[0])

          globalNumber = number

          cy.log('Saved number:', globalNumber)

        })

      WidgetElementsObj.orderCongratulationBookingClick().click()

      cy.wait(2000)


      cy.get('.order-page').should('be.visible')


      cy.get('.order-list__list > .order-item')
        .eq(0)
        .find('.order-item__order-number > span')
        .eq(1)
        .invoke('text').then((text) => {
          // Parse the text to extract the numerical value
          const orderNumber = parseFloat(text.match(/\d+/)[0])
          // Save the number into a Cypress variable         
          // Log the saved number
          cy.wrap(orderNumber).should('eq', globalNumber );
          cy.log('Saved number in orders list:', orderNumber)
        })

        cy.wait(5000)


        cy.waitForLatestEmail(inboxId).then((email) => {
          // verify we received an email
    
          emailBody = email.body
    
          const parser = new DOMParser()
          const doc = parser.parseFromString(emailBody, 'text/html')
          // var otp = doc.querySelector('div').textContent
          // optCode = otp.trim()
          // cy.log(optCode)
    
    
          expect(email.subject).to.equal('Ordering on the site www.test.test.test.com')
          cy.log(emailBody)  
    
          cy.wait(2000)
                    
        
        });






    });


    it('it should be sing out test on prod', () => {  

      WidgetElementsObj.clickOnElementInList()
      
      WidgetElementsObj.beVisibleElementList()
      
      cy.wait(1000)
      
      WidgetElementsObj.clickOnLoginSingOut().eq(3).click()
      
      
      WidgetElementsObj.clickOnElementInList()
      
      WidgetElementsObj.beVisibleElementList()
      
      cy.wait(1000)
      
      WidgetElementsObj.clickOnLoginSingOut().eq(3).click()
      
      cy.get('.login-page').should('be.visible')
   
       
      
      });


});



