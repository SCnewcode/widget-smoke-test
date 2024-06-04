/// <reference types="cypress" />

import "cypress-mailosaur";

import { faker } from "@faker-js/faker";

import { WidgetElements } from "../../pages/WidgetPageElements";

const WidgetElementsObj = new WidgetElements();

let globalNumber;
let globalTelephoneNumber;
describe("Your Test Suite Description", () => {
  const randomFullName = faker.person.fullName();

  const randomMail = faker.internet.email();

  beforeEach(() => {
    cy.loginWithUITest(randomMail, "111");
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/widget/index");
    // cy.visit('widget4site1/widget/index')
  });

  it("it should be check go to widget contact page", () => {
    WidgetElementsObj.clickOnElementInList();

    WidgetElementsObj.beVisibleElementList();

    WidgetElementsObj.clickOnMenuInList();

    WidgetElementsObj.checkBeVisibleContactPage();
  });

  it("it should be check to add a widget contact info", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/user/index");

    WidgetElementsObj.firstInputTypeTestNegative();

    WidgetElementsObj.btnRegularClick();

    WidgetElementsObj.checkErrorNotificationOnContactPage();

    WidgetElementsObj.checkClearAndEditFullName();

    WidgetElementsObj.telephoneNumberTestNegative();
    WidgetElementsObj.btnRegularClick();

    WidgetElementsObj.checkErroBoxTextVisible();

    WidgetElementsObj.checkClearAndAddPhoneNumber();
    WidgetElementsObj.btnRegularClick();

    WidgetElementsObj.checkSuccessNotificationOnContactPage()
      .should("be.visible")
      .and("contain", "Your contact info saved");
  });

  it("it should be check cookie consent", () => {
    WidgetElementsObj.checkCookieConsentBoxVisible();
    WidgetElementsObj.cookieConsentClick();
    WidgetElementsObj.checkCookieConsentBoxNotVisible();

    WidgetElementsObj.checkGetCookieVisible();
  });

  it("it should be check widget document block", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/user/index");

    WidgetElementsObj.cookieConsentClick();

    WidgetElementsObj.visibleDocumentBlock();

    WidgetElementsObj.documentBlockButtonClick().eq(0).click();

    WidgetElementsObj.chechDocumentDialogModal();

    WidgetElementsObj.clickDialogModalClose();

    WidgetElementsObj.documentBlockButtonClick().eq(1).click();

    WidgetElementsObj.chechDocumentDialogModal();

    WidgetElementsObj.clickDialogModalClose();
  });

  it("it should be check localization on widget contact page", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/user/index");

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(2).click();

    cy.get("h3").contains("Informacje kontaktowe").should("be.visible");

    if (cy.get("h3").should("have.text", "Informacje kontaktowe")) {
      cy.log("POL localization works");
    }

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(5).click();

    cy.get("h3").contains("Kontaktinformation").should("be.visible");

    if (cy.get("h3").should("have.text", "Kontaktinformation")) {
      cy.log("DE localization works");
    }

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(1).click();

    cy.get("h3").contains("Contact information").should("be.visible");

    if (cy.get("h3").should("have.text", "Contact information")) {
      cy.log("EN localization works");
    }
  });

  it("it should be check localization on widget index page", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/widget/index");

    WidgetElementsObj.checkCookieConsentBoxVisible();
    WidgetElementsObj.cookieConsentClick();
    WidgetElementsObj.checkCookieConsentBoxNotVisible();

    WidgetElementsObj.checkGetCookieVisible();

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(2).click();

    cy.get("h3").contains("Wszystkie pokazy").should("be.visible");

    if (cy.get("h3").should("have.text", "Wszystkie pokazy")) {
      cy.log("POL localization works");
    }

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(5).click();

    cy.get("h3").contains("Alle Shows").should("be.visible");

    if (cy.get("h3").should("have.text", "Alle Shows")) {
      cy.log("DE localization works");
    }

    WidgetElementsObj.localizationMenuClick();

    WidgetElementsObj.localizationChoiceClick().eq(1).click();

    cy.get("h3").contains("All shows").should("be.visible");

    if (cy.get("h3").should("have.text", "All shows")) {
      cy.log("EN localization works");
    }
  });

  it("it should be choose random active event on index page", () => {
    cy.get(".event-list").clickRandomClickableLinkInList();
  });

  it("it should be lock ticket in active event", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/286"
    );
    cy.wait(1000);

    WidgetElementsObj.cookieConsentClick();

    // Check if element with specific class exists
    cy.get(".svg-container--show").then(($element) => {
      if ($element.hasClass("sectors-list")) {
        cy.get(".svg-pan-zoom_viewport")
          .find(".sector.enabled.has-info")
          .not(".disabled")
          .then(($elements) => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            const randomElement = $elements[randomIndex];
            cy.wrap(randomElement, { force: true }).click();
          });

        cy.get(".svg-pan-zoom_viewport")
          .find(".place")
          .not(".disabled")

          .then(($elements) => {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            const randomElement = $elements[randomIndex];
            cy.wrap(randomElement).click();
          });
      } else {
        cy.get("body").then((body) => {
          if (!body.find('div[data-pc-name="dialog"]')) {
            cy.get(".service-message-actions")
              .find('button[type="button"]')
              .click();

            cy.get(".svg-pan-zoom_viewport")
              .find(".place")
              .not(".disabled")
              .then(($elements) => {
                // Randomly click one of the elements
                const randomIndex = Math.floor(
                  Math.random() * $elements.length
                );
                const randomElement = $elements[randomIndex];
                cy.wrap(randomElement).click();
              });
          } else {
            cy.get(".svg-pan-zoom_viewport")
              .find(".place")
              .not(".disabled")
              .then(($elements) => {
                const randomIndices = Array.from({ length: 3 }, () =>
                  Math.floor(Math.random() * $elements.length)
                );
                randomIndices.forEach((index) => {
                  cy.wrap($elements[index]).click({ force: true }); // Force click if needed
                });
              });
          }
        });
      }
    });

    cy.wait(2000);
  });

  it("it should be check basket order sum amount", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/286"
    );
    WidgetElementsObj.cookieConsentClick();

    cy.get(".basket-order-sum__amount").each(($element) => {
      const text = $element.text().trim();
      expect(text).to.include("3 tickets");
    });

    WidgetElementsObj.basketTicketsButtonClick()
      .eq(1)
      .find('[class="btn remove-ticket-action"]')
      .click();

    cy.wait(1000);

    cy.get(".basket-order-sum__amount").each(($element) => {
      const text = $element.text().trim();
      expect(text).to.include("2 tickets");
    });
  });

  it("it should be check all event price and event info on page", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/286"
    );
    WidgetElementsObj.cookieConsentClick();

    cy.get("[class='place-price']").should("be.visible");

    cy.get(".place-price__title").click();
    cy.wait(1000);
    cy.get("[class='place-price__list-wrapper']").should("be.visible");

    WidgetElementsObj.btnInfoIconClick().click();
    cy.wait(1000);

    WidgetElementsObj.showDialogModalCloseClick().click();
  });

  it("it should be go to checkout page and check contact field input validation", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/286"
    );
    WidgetElementsObj.cookieConsentClick();
    cy.wait(1000);

    WidgetElementsObj.basketActionButtonClick().click();
    cy.wait(1000);

    WidgetElementsObj.checkoutOrderInfoClick()
      .eq(0)
      .find('[class="checkout-section__button"]')
      .click();

    WidgetElementsObj.userContactsFieldInputFind()
      .first()
      .clear()
      .type(randomFullName);

    WidgetElementsObj.contactFormCheckoutBtnClick().click();

    WidgetElementsObj.toastNificationSuccessFind()
      .should("be.visible")
      .and("contain", "Your contact info saved");
  });

  it("it should be check promo code apply", () => {
    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/286/checkout"
    );
    WidgetElementsObj.cookieConsentClick();
    cy.wait(1000);

    WidgetElementsObj.promoCodeInputType().type("procent2-test");

    cy.wait(1000);

    WidgetElementsObj.promoCodeBlockBtnClick().click();

    WidgetElementsObj.toastNificationSuccessFind()
      .should("be.visible")
      .and("contain", "Promocode applied");

    cy.wait(1000);
  });

  it("it should be Book a ticket test", () => {
    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/286/checkout"
    );
    WidgetElementsObj.cookieConsentClick();
    cy.wait(1000);

    WidgetElementsObj.methodItemNameBookFind()
      .contains("Book a ticket")
      .click();

    WidgetElementsObj.basketActionButtonRegularClick().click();

    cy.wait(2000);

    cy.get(".thanks-page").should("be.visible");

    cy.get(".order-congratulation__order > span")
      .eq(1)
      .invoke("text")
      .as("someText");

    cy.get("@someText").then((text) => {
      const number = parseFloat(text.match(/\d+/)[0]);
      globalNumber = number;
      cy.log("Saved number:", globalNumber);
    });

    WidgetElementsObj.orderCongratulationBookingClick().click();

    cy.wait(2000);

    cy.get(".order-page").should("be.visible");
  });

  it("it should be check if the order number matches", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/user/orders");
    cy.wait(1000);

    cy.get(".order-page").should("be.visible");

    cy.get(".order-list__list > .order-item")
      .eq(0)
      .find(".order-item__order-number > span")
      .eq(1)
      .invoke("text")
      .then((text) => {
        // Parse the text to extract the numerical value
        const orderNumber = parseFloat(text.match(/\d+/)[0]);
        // Log the saved number
        cy.wrap(orderNumber).should("eq", globalNumber);
        cy.log("Saved number in orders list:", orderNumber);
      });
  });

  it("it should be check if the order number matches", () => {
    cy.visit(Cypress.env("development").baseUrl + "/widget4site1/user/orders");
    cy.wait(1000);

    cy.get(".order-page").should("be.visible");

    cy.get(".order-list__list > .order-item")
      .eq(0)
      .find(".order-item__order-number > span")
      .eq(1)
      .invoke("text")
      .then((text) => {
        // Parse the text to extract the numerical value
        const orderNumber = parseFloat(text.match(/\d+/)[0]);
        // Log the saved number
        cy.wrap(orderNumber).should("eq", globalNumber);
        cy.log("Saved number in orders list:", orderNumber);
      });
  });

  it("it should be check payment systems redirect", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/286"
    );
    cy.wait(1000);

    WidgetElementsObj.cookieConsentClick();

    // Check if element with specific class exists
    cy.get(".svg-container--show").then(($element) => {
      if ($element.hasClass("sectors-list")) {
        cy.get(".svg-pan-zoom_viewport")
          .find(".sector.enabled.has-info")
          .not(".disabled")

          .then(($elements) => {
            // Randomly click one of the elements
            const randomIndex = Math.floor(Math.random() * $elements.length);
            const randomElement = $elements[randomIndex];
            cy.wrap(randomElement, { force: true }).click();
          });

        cy.get(".svg-pan-zoom_viewport")
          .find(".place")
          .not(".disabled")

          .then(($elements) => {
            // Randomly click one of the elements
            const randomIndex = Math.floor(Math.random() * $elements.length);
            const randomElement = $elements[randomIndex];
            cy.wrap(randomElement).click();
          });
      } else {
        cy.get("body").then((body) => {
          if (!body.find('div[data-pc-name="dialog"]')) {
            cy.get(".service-message-actions")
              .find('button[type="button"]')
              .click();

            cy.get(".svg-pan-zoom_viewport")
              .find(".place")
              .not(".disabled")

              .then(($elements) => {
                // Randomly click one of the elements
                const randomIndex = Math.floor(
                  Math.random() * $elements.length
                );
                const randomElement = $elements[randomIndex];
                cy.wrap(randomElement).click();
              });
          } else {
            cy.get(".svg-pan-zoom_viewport") // Replace 'your-selector' with the appropriate CSS selector for your enabled elements
              .find(".place")
              .not(".disabled")

              .then(($elements) => {
                const randomIndices = Array.from({ length: 5 }, () =>
                  Math.floor(Math.random() * $elements.length)
                );

                // Perform clicks on the randomly selected elements
                randomIndices.forEach((index) => {
                  cy.wrap($elements[index]).click({ force: true }); // Force click if needed
                });
              });
          }
        });
      }
    });

    WidgetElementsObj.basketActionButtonClick().click();

    cy.wait(2000);

    WidgetElementsObj.methodItemNameBookFind()
      .contains("Electronic ticket")
      .click();

    WidgetElementsObj.findpaymentSystemCheckout()
      .find('label[for="egwmd"]')
      .click();

    WidgetElementsObj.basketActionButtonRegularClick().click();

    cy.wait(3000);

    cy.origin("https://vb059.vb.md", () => {
      cy.wait(1000);
      cy.get(".container-inside-card").should("be.visible");
    });

    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/286/checkout"
    );

    cy.wait(3000);

    WidgetElementsObj.findpaymentSystemCheckout()
      .find('label[for="liqpay-p24"]')
      .click();

    WidgetElementsObj.basketActionButtonRegularClick().click();

    cy.wait(3000);

    cy.origin("https://www.liqpay.ua", () => {
      cy.wait(1000);
      cy.get(".pay__button__content").should("be.visible");
    });

    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/286/checkout"
    );

    cy.wait(3000);

    WidgetElementsObj.findpaymentSystemCheckout()
      .find('label[for="wfp"]')
      .click();

    WidgetElementsObj.basketActionButtonRegularClick().click();

    cy.wait(3000);

    cy.origin("https://secure.wayforpay.com", () => {
      cy.wait(1000);
      cy.get(".pay-form-info").should("be.visible");
    });

    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/286/checkout"
    );

    cy.wait(3000);
  });

  it("it should test fill ticket personal info", () => {
    cy.visit(
      Cypress.env("development").baseUrl + "/widget4site1/widget/event/454"
    );
    cy.wait(1000);

    WidgetElementsObj.cookieConsentClick();

    // Check if element with specific class exists
    cy.get(".svg-container--show");

    cy.get(".svg-pan-zoom_viewport")
      .find(".place")
      .not(".disabled")

      .then(($elements) => {
        // Randomly click one of the elements
        const randomIndex = Math.floor(Math.random() * $elements.length);
        const randomElement = $elements[randomIndex];
        cy.wrap(randomElement).click();
      });

    cy.wait(3000);

    WidgetElementsObj.findPersonalInfoFields().first().type("латинские");

    WidgetElementsObj.clickBtnRegularPersonalInfo();

    cy.wait(1000);

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and(
        "contain",
        "Filed Full name must contains only latin characters or spaces."
      );

    cy.wait(1000);

    WidgetElementsObj.findPersonalInfoFields().first().clear();

    WidgetElementsObj.findPersonalInfoFields().first().type("Test Name");

    WidgetElementsObj.findPersonalInfoFields().eq(1).type("КЕ343434344");

    cy.wait(1000);

    WidgetElementsObj.checkErroBoxOnPersonalInfo().eq(0).should("be.visible");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Filed Phone is required!");

    cy.wait(1000);

    WidgetElementsObj.findPersonalInfoFields().eq(1).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(1).type("BR454455666");

    WidgetElementsObj.findPersonalInfoFields().eq(2).type("38094555");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Phone format is invalid.");

    WidgetElementsObj.findPersonalInfoFields().eq(2).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(2).type("380945559898");

    WidgetElementsObj.findPersonalInfoFields().eq(3).type("123456789");

    WidgetElementsObj.clickBtnRegularPersonalInfo();

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "INN must be 10 digits");

    WidgetElementsObj.findPersonalInfoFields().eq(3).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(3).type("1234567891");

    WidgetElementsObj.findPersonalInfoFields().eq(4).type("@testmail.com");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Email format is invalid.");

    WidgetElementsObj.findPersonalInfoFields().eq(4).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(4).type("newuser@test.com");

    WidgetElementsObj.findPersonalInfoFields().eq(5).type("Uni");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Filed Place of living must be at least 4 characters.");

    WidgetElementsObj.findPersonalInfoFields().eq(5).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(5).type("United States");

    WidgetElementsObj.findPersonalInfoFields().eq(6).type("Den");

    WidgetElementsObj.checkErroBoxOnPersonalInfo().should("be.visible");

    WidgetElementsObj.findPersonalInfoFields().eq(6).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(6).type("Denver");

    WidgetElementsObj.findPersonalInfoFields().eq(7).type("Tes");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Filed Company must be at least 4 characters.");

    WidgetElementsObj.findPersonalInfoFields().eq(7).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(7).type("Test Company");

    WidgetElementsObj.findPersonalInfoFields().eq(8).type("dev");

    WidgetElementsObj.checkErroBoxOnPersonalInfo()
      .should("be.visible")
      .and("contain", "Filed Position must be at least 4 characters.");

    WidgetElementsObj.findPersonalInfoFields().eq(8).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(8).type("developer");

    WidgetElementsObj.clickBtnRegularPersonalInfo();

    cy.get(".basket-order-sum__amount").each(($element) => {
      const text = $element.text().trim();
      expect(text).to.include("1 ticket");
    });

    WidgetElementsObj.clickBasketTicketPersonalInfo();

    WidgetElementsObj.personalInfoDialogModalVisible().should("be.visible");

    WidgetElementsObj.findPersonalInfoFields().first().clear();

    WidgetElementsObj.findPersonalInfoFields().first().type("Test Edit Name");

    cy.wait(1000);

    WidgetElementsObj.findPersonalInfoFields().eq(2).clear();

    WidgetElementsObj.findPersonalInfoFields().eq(2).type("09999999999");

    WidgetElementsObj.findPersonalInfoFields()
      .eq(2)
      .invoke("val")
      .as("numberText");

    cy.get("@numberText").then((text) => {
      globalTelephoneNumber = text;
      cy.log("Saved telephone number:", globalTelephoneNumber);
    });

    WidgetElementsObj.clickBtnRegularPersonalInfo();

    cy.wait(2000);

    WidgetElementsObj.basketActionButtonClick().click();
  });

  it("it should test if the ticket personal info matches and visible in orders list", () => {
    cy.visit(
      Cypress.env("development").baseUrl +
        "/widget4site1/widget/event/454/checkout"
    );
    WidgetElementsObj.cookieConsentClick();
    cy.wait(1000);

    WidgetElementsObj.methodItemNameBookFind()
      .contains("Book a ticket")
      .click();

    WidgetElementsObj.basketActionButtonRegularClick().click();

    cy.wait(2000);

    cy.get(".thanks-page").should("be.visible");

    WidgetElementsObj.orderCongratulationBookingClick().click();

    cy.wait(2000);

    cy.get(".order-page").should("be.visible");

    WidgetElementsObj.clickOnTicketsInOrdersPage();

    cy.wait(2000);

    WidgetElementsObj.clickBtnEditPersonalInfo();

    cy.wait(1000);

    WidgetElementsObj.findPersonalInfoFields()
      .eq(2)
      .invoke("val")
      .then((text) => {
        const telephoneNumberEdit = text;

        cy.wrap(telephoneNumberEdit).should("eq", globalTelephoneNumber);
        cy.log("Saved number in orders list:", telephoneNumberEdit);
      });
  });

  it("it should be sing out test", () => {
    WidgetElementsObj.clickOnElementInList();

    WidgetElementsObj.beVisibleElementList();

    cy.wait(1000);

    WidgetElementsObj.clickOnLoginSingOut().eq(3).click();

    WidgetElementsObj.clickOnElementInList();

    WidgetElementsObj.beVisibleElementList();

    cy.wait(1000);

    WidgetElementsObj.clickOnLoginSingOut().eq(3).click();

    cy.get(".login-page").should("be.visible");
    // cy.get('.page-auth-form').should('be.visible')
  });
});
