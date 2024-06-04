import {faker} from '@faker-js/faker'

export class WidgetElements {


    randomFullName = faker.person.fullName();

    randomPhoneNumber = faker.phone.number("380########")
 

    elements = {

        firstHeaderAction: () => cy.get('.header__action > button'),
        
        listContainerDisabled: () => cy.get("[class='p-overlaypanel p-component p-ripple-disabled list-container']"),

        goToContactMenu: () => cy.xpath('//ul[@class="menu-list"]//li'),

        contactPageSelector: () => cy.get(".contacts-page"),

        userContactsFieldInput: () => cy.get('.user-contacts__fields').find('input[data-pc-name="inputtext"]'),

        btnRegularClass: () => cy.get("[class='btn btn-regular']"),

        btnRegularClassInPersonalInfo: () => cy.get('.p-dialog-footer').find('button[type="button"]'),


        toastNificationError: () => cy.get(".Vue-Toastification__toast.Vue-Toastification__toast--error.top-right"),

        errorBox: () => cy.get(".error-box"),

        toastNificationSuccess: () => cy.get(".Vue-Toastification__toast.Vue-Toastification__toast--success.top-right"),

        cookieConsentBox: () => cy.get("[class='cc-box']"),

        cookieConsentApplyButton: ()  => cy.get(".cc-btn.cc-btn-accept.cc-btn-accept-all"),

        checkGetCookie: ()  => cy.getCookie('cookie_consent'),

        checkDocumentBlockClass: ()  => cy.get("[class='document-block']"),
      
        documentBlockButton: ()  => cy.get('.document-block').find('button[type="button"]'),

        documentDialogModal: ()  => cy.get("[class='p-dialog p-component p-ripple-disabled modal-regular pdf-viewer']"),

        documentDialogModalClose: ()  => cy.get('button[label="Close"]'),
        
        localizationMenu: ()  => cy.get('.header__action').find('[class="btn menu-point"]'),

        localizationChoice: ()  => cy.xpath('//ul[@class="menu-list"]//li'),

        basketTicketsButton: ()  => cy.get('.basket-tickets').find('[class="basket-ticket"]')  ,

        btnInfoIcon: ()  => cy.get('[class="btn info-icon"]'),
       
        showDialogModalClose: ()  => cy.get('div[data-pc-name="dialog"]').find('button[aria-label="Close"]')  ,

        basketActionButtonFind: ()  => cy.get('.basket-action').find('button[type="button"]'),

        checkoutOrderInfo: ()  => cy.get('.checkout-order-info').find('[class="checkout-section checkout-section_view"]'),

        contactFormCheckoutBtn: ()  => cy.get('.contact-form.contact-form--checkout').find("[class='btn btn-secondary']")  ,

        promoCodeInputFind: ()  => cy.get('.p-float-label').find('[class="p-inputtext p-component"]') ,

        promoCodeBlockBtn: ()  =>  cy.get('.promo-code-block__create').find('[class="btn btn-secondary"]') ,

        methodItemNameFind: ()  =>   cy.get('.method-items').find('[class="method-item__name"]') ,

        basketActionButtonRegularFind: ()  =>   cy.get('.basket-action').find('button[class="btn btn-regular"]') ,

        orderCongratulationBookingFind: ()  =>    cy.get('.order-congratulation__booking-buttons').find('button[class="btn btn-secondary"]')  ,

        paymentSystemFind: ()  =>   cy.get('.eticket-payment'),


        basketTicketPersonalInfoFind: ()  =>   cy.get('.basket-ticket__personal-info-icon'),
      
        personalInfoDialogModal: ()  => cy.get("[class='p-dialog p-component p-ripple-disabled personal-data-form']"),

        personalInformationFieldsFind: ()  => cy.get('.p-float-label').find('input[data-pc-name="inputtext"]'),

        ticketsInUserOrdersPage: ()  =>   cy.get("[class='btn btn-plain']"),

        btnEditPersonalInfoOrders: ()  =>   cy.get("[class='btn btn-edit-personal-info']"),

        successMessages: '.Vue-Toastification__toast.Vue-Toastification__toast--success.top-right'


    }




    clickOnTicketsInOrdersPage() {
        this.elements.ticketsInUserOrdersPage().first().click()
    }

    
    clickBtnEditPersonalInfo() {
        this.elements.btnEditPersonalInfoOrders().click()
    }


    personalInfoDialogModalVisible() {
        return this.elements.personalInfoDialogModal()
    }


    clickBasketTicketPersonalInfo() {
        this.elements.basketTicketPersonalInfoFind().click()
    }

  
    findPersonalInfoFields() {
        return this.elements.personalInformationFieldsFind()
    }


    findpaymentSystemCheckout() {
        return this.elements.paymentSystemFind()
    }


    orderCongratulationBookingClick() {
        return this.elements.orderCongratulationBookingFind()
    }

 
    basketActionButtonRegularClick() {
        return this.elements.basketActionButtonRegularFind()
    }



    methodItemNameBookFind() {
        return this.elements.methodItemNameFind()
    }


    promoCodeBlockBtnClick() {
        return this.elements.promoCodeBlockBtn()
    }

    promoCodeInputType() {
        return this.elements.promoCodeInputFind()
    }


    toastNificationSuccessFind() {
        return this.elements.toastNificationSuccess()
    }

    contactFormCheckoutBtnClick() {
        return this.elements.contactFormCheckoutBtn()
    }


    userContactsFieldInputFind() {
        return this.elements.userContactsFieldInput()
    }


    clickOnElementInList() {
        this.elements.firstHeaderAction().eq(0).click()
    }

    clickOnMenuInList() {
        this.elements.goToContactMenu().eq(1).click()

    }

    clickOnLoginSingOut() {
        return this.elements.goToContactMenu()
        // .eq(4).click()

    }


    checkBeVisibleContactPage() {
        this.elements.contactPageSelector().should('be.visible')
    }



    beVisibleElementList() {
        this.elements.listContainerDisabled().should('be.visible')
    }

    firstInputTypeTestNegative() {
        this.elements.userContactsFieldInput().first().type("te")
    }


    btnRegularClick() {
        this.elements.btnRegularClass().click()
    }

    checkErrorNotificationOnContactPage() {
        this.elements.toastNificationError().should("be.visible").and("contain", "The name must be at least 3 characters.")
    }

    checkClearAndEditFullName() {
        this.elements.userContactsFieldInput().first().clear().type(this.randomFullName)
    }

    telephoneNumberTestNegative() {
        this.elements.userContactsFieldInput().eq(2).type("380986")
    }


    checkErroBoxTextVisible() {
        this.elements.errorBox().should("be.visible").and("contain", "Phone format is invalid.")
    }

    checkErroBoxOnPersonalInfo() {
        return this.elements.errorBox()
    }

    clickBtnRegularPersonalInfo() {
        this.elements.btnRegularClassInPersonalInfo().click()
    }

    checkClearAndAddPhoneNumber() {
        this.elements.userContactsFieldInput().eq(2).clear().type(this.randomPhoneNumber)
    }


    checkSuccessNotificationOnContactPage() {
        return this.elements.toastNificationSuccess()
    }


    checkCookieConsentBoxVisible() {
        this.elements.cookieConsentBox().should("be.visible")
    }

    cookieConsentClick() {
        this.elements.cookieConsentApplyButton().click()
    }

    checkCookieConsentBoxNotVisible() {
        this.elements.cookieConsentBox().should('not.be.visible')
    }

    checkGetCookieVisible() {
        this.elements.checkGetCookie().should('have.property', 'value', '{"status":"accepted","acceptedCategories":["adConsentGranted","analyticsConsentGranted","functionalityConsentGranted","personalizationConsentGranted","securityConsentGranted","adUserDataGranted","adPersonalizationGranted"]}')
    }


    visibleDocumentBlock() {
        this.elements.checkDocumentBlockClass().should("be.visible")
    }

    documentBlockButtonClick() {
        return this.elements.documentBlockButton()
    }


    chechDocumentDialogModal() {
        this.elements.documentDialogModal().should("be.visible")
    }


    clickDialogModalClose() {
        this.elements.documentDialogModalClose().click()
    }


    localizationMenuClick() {
        this.elements.localizationMenu().eq(1).click()
    }


    localizationChoiceClick() {
        return this.elements.localizationChoice()
    }

    basketTicketsButtonClick() {
        return this.elements.basketTicketsButton()
    }


    btnInfoIconClick() {
        return this.elements.btnInfoIcon()
    }


    showDialogModalCloseClick() {
        return this.elements.showDialogModalClose()
    }


    basketActionButtonClick() {
        return this.elements.basketActionButtonFind()
    }


    checkoutOrderInfoClick() {
        return this.elements.checkoutOrderInfo()
    }



}

// export default Login