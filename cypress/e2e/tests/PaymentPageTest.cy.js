import { PaymentPage } from "../pages/PaymentPage"
import { CommonActions } from "../actions/CommonActions"

const pageContent = require("../../fixtures/pageContent/content.json")
const paymentPage = new PaymentPage()
const ca = new CommonActions()

describe('Payment Page', () => {
     beforeEach(() => {
        cy.visit(pageContent.urls.paymentPageUrl)

        cy.fixture("pageContent/content.json").then(content => {
            cy.wrap(content).as("pageContent")
        })
    })

    it('Checks if product details match what was on the PRL creation page', () => {
        // get data from fixtures
        cy.get('@pageContent').then(pageContent => {
            paymentPage.checkProductNameMatches(pageContent.prodDetails.product)
            paymentPage.checkQuantityMatches(pageContent.prodDetails.quantity)
            // paymentPage.checkPriceMatches(pageContent.prodDetails.price)
            // paymentPage.checkTotalMatches(pageContent.prodDetails.total)
        })
    })

     it('Checks if quantity is less than or equal to the one specified on PRL creation', () => {
        cy.get('@pageContent').then(pageContent => {
            paymentPage.checkQuantityLessthanLimit(pageContent.prodDetails.quantity)
        })
        
    })

    it('Checks if error message appears when quantity is incremented beyond limit', () => {
        paymentPage.clickIncrement()
        paymentPage.clickIncrement()
        paymentPage.checkAlertAmountAppears() 
    })

    it('Verfies that user cannot enter a 0 quantity', () => {
        paymentPage.clearQuantityInput()
        cy.get('@pageContent').then(pageContent => {
            paymentPage.enterValueInQuantityInput(pageContent.prodDetails.zeroQuantity)
        })
        paymentPage.checkAlertAmountAppears()
    })

    it('Verifies that after valid number is entered, submit button can be clicked', () => {
        // directly calls a page function that picks the MTN PSP, enters a valid number and clicks submit 
        // the next step is Confirm Payment page
       paymentPage.enterVerificationOfPaymentDetails()
    })

    it('Verfies that if valid number is not entered, submit button cannot be clicked', () => {
        // Chooses the MTN PSP, but enters an invalid number and checks if the submit button is invalid
        paymentPage.clickOnMTNPSP()
        paymentPage.enterPhoneNumber(ca.generatePhoneNumber())
        paymentPage.checkSubmitButtonIsDisabled()
    })

    it('Verifies that the confirm payment button cannot be submitted with empty name field', () => {
        // Fills in the details for verification of payment in order to go to next step
        paymentPage.enterVerificationOfPaymentDetails()
        // checks if the submit button is disabled because field is empty
        paymentPage.checkSubmitButtonIsDisabled()
    })

    it('Verfies that confirm button can be clicked when name is entered and the pay dialog appears', () => {
        // Fills in details for verification of payment
        paymentPage.enterVerificationOfPaymentDetails()
        cy.get('@pageContent').then(pageContent => {
            paymentPage.enterCustomerNameConfirmPayment(pageContent.prodDetails.customerName)
        })
        paymentPage.clickSubmit()
        paymentPage.verifyPayDialogExists()

    })
})