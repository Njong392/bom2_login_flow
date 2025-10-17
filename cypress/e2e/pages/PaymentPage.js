import { CommonActions } from "../actions/CommonActions";
const pageContent = require('../../fixtures/pageContent/content.json')

const ca = new CommonActions()

export class PaymentPage{
    // web element identifiers for different steps of payment and their methods
    product_name_identifier = 'div[data-testid="table-order-content-row"]:nth-of-type(1) span'
    quantity_identifier = 'div[data-testid="table-order-content-row"]:nth-of-type(2) input'
    price_identifier = 'div[data-testid="table-order-content-row"]:nth-of-type(3) span'
    total_identifier = 'div[data-testid="table-order-content-row"]:nth-of-type(4) span'
    alert_amount_identifier = '[role="alert"]'
    increment_identifier = '.plus'
    phonenumber_input = '[data-testid="text-input"]'
    submit_identifier = '[data-testid="submit-button"]'
    mtn_psp_identifier = '[data-testid="payment-method-picker-item"]'
    customer_name_identifier = '[data-cy="input-mandatory"]'
    pay_dialog_identifier = '[data-testid="dialog"]'

    // action methods
    check(value){
        ca.verifyTextWithinElement(this.product_name_identifier,value)
    }
    checkProductNameMatches(value){
        ca.verifyTextWithinElement(this.product_name_identifier, value)
    }

    checkQuantityMatches(value){
        ca.verifyInputValue(this.quantity_identifier, value)
    }

    checkPriceMatches(value){
        ca.verifyTextWithinElement(this.price_identifier, value)
    }

    checkTotalMatches(value){
        ca.verifyTextWithinElement(this.total_identifier, value)
    }

    checkQuantityLessthanLimit(value){
        ca.verifyValueIsLessThanLimit(this.quantity_identifier, value)
    }

    checkAlertAmountAppears(){
        ca.verifyWebElementExists(this.alert_amount_identifier)
    }

    clickIncrement(){
        ca.clickonWebElement(this.increment_identifier)
    }

    clearQuantityInput(){
        ca.clearValueInAField(this.quantity_identifier)
    }

    enterValueInQuantityInput(value){
        ca.enterValueInField(this.quantity_identifier, value)
    }

    enterPhoneNumber(value){
         ca.enterValueInField(this.phonenumber_input, value)
    }

    clickSubmit(){
        ca.clickonWebElement(this.submit_identifier)
    }

    clickOnMTNPSP(){
        ca.clickOnFirstElement(this.mtn_psp_identifier)
    }

    checkSubmitButtonIsDisabled(){
        ca.checkIfDisabled(this.submit_identifier)
    }

    enterVerificationOfPaymentDetails(){
        this.clickOnMTNPSP()
        this.enterPhoneNumber(ca.generateRandomPhoneNumberWithPrefix())
        this.clickSubmit()
    }

    enterCustomerNameConfirmPayment(value){
        ca.enterValueInField(this.customer_name_identifier, value)
    }

    verifyPayDialogExists(){
        ca.verifyWebElementExists(this.pay_dialog_identifier)
    }
}