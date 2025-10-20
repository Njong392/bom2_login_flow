export class CommonActions {
    // Click on a web element
    clickonWebElement(webelement_identifier) {
        cy.get(webelement_identifier).click()
    }

    // enter a value into a field
    enterValueInField(webelement_identifier, value) {
        cy.get(webelement_identifier).type(value)
    }

    // assert that a web element exists in the DOM
    verifyWebElementExists(webelement_identifier) {
        cy.get(webelement_identifier).should('exist')
    }

    // assert a web element does not exist
    verifyWebElementDoesNotExist(webelement_identifier) {
        cy.get(webelement_identifier).should('not.exist')
    }

    // asserting text within an identifier
    verifyTextWithinElement(webelement_identifier, value) {
        cy.get(webelement_identifier).contains(value)
    }


    // select a value from the dropdown
    selectDropDownValueByIndex(webelement_identifier, index) {
        cy.get(webelement_identifier).select(index)
    }

    // verify the value of an input
    verifyInputValue(webelement_identifier, expectedValue) {
        cy.get(webelement_identifier).should('have.value', expectedValue)
    }

    // checks that a link redirects to another page
    verifyLinkRedirection(path, expectedNewPage) {
        cy.location(path).should('equal', expectedNewPage)
    }

    // checks that a link does not redirect to another page
    verifyLinkDoesNotRedirect(path, expectedNewPage) {
        cy.location(path).should('not.equal', expectedNewPage)
    }

    // check that an expected value is less than another value
    verifyValueIsLessThanLimit(webelement_identifier, limitValue) {
        cy.get(webelement_identifier)
            .invoke('val')
            .then(textValue => parseFloat(textValue.trim()))
            .should('be.lte', limitValue);
    }

    // checks the type on an input field
    verifyType(webelement_identifier, type, expectedType) {
        cy.get(webelement_identifier).invoke('attr', type).should('eq', expectedType)
    }

    // check that a button is disabled
    verifyDisabled(webelement_identifier) {
        cy.get(webelement_identifier).invoke('attr', 'tabindex').should('eq', '-1')
    }

    // check that a button is enabled
    verifyEnabled(webelement_identifier) {
        cy.get(webelement_identifier).invoke('attr', 'tabindex').should('eq', '0')
    }

    // clear a value in a field
    clearValueInAField(webelement_identifier) {
        cy.get(webelement_identifier).clear()
    }

    // upload files
    uploadFile(webelement_identifier, path) {
        cy.get(webelement_identifier).selectFile(path, { force: true })
    }

    // generate 6 figures between 0-9
    generatePhoneNumber() {
        let contactNumber = '';
        for (let i = 0; i <= 5; i++) {
            contactNumber += Math.floor(Math.random() * 10);
        }

        return contactNumber
    }

    // add MTN prefixes to the generated number
    generateRandomPhoneNumberWithPrefix() {
        const prefix = "679";
        const randomNumber = this.generatePhoneNumber();
        return `${prefix}${randomNumber}`;
    }

    // add Orange prefixes to the generated number
    generateRandomOrangePhoneNumberWithPrefix() {
        const prefix = "699";
        const randomNumber = this.generatePhoneNumber();
        return `${prefix}${randomNumber}`;
    }

    // click on first element in an array
    clickOnFirstElement(webelement_identifier) {
        cy.get(webelement_identifier).eq(0).click()
    }

    // click on second element in the array
    clickOnSecondElement(webelement_identifier){
        cy.get(webelement_identifier).eq(1).click()
    }

    // checking if element is disabled
    checkIfDisabled(webelement_identifier) {
        cy.get(webelement_identifier).should('be.disabled')
    }

    // check if input has value
    checkIfHasValue(webelement_identifier, expectedValue){
        cy.get(webelement_identifier).should('have.value', expectedValue)
    }

    // Increments a counter
    IncrementCounter(counter_identifier, incrementbutton_identifier){
        cy.get(counter_identifier).invoke('val').then(counterValue => {
            const initialValue = parseInt(counterValue, 10)

            cy.get(incrementbutton_identifier).click()

            cy.get(counter_identifier).invoke('val').then(counterValue => {
                const newCount = parseInt(counterValue, 10)
                expect(newCount).to.eq(initialValue + 1)
            })
        })
    }

    // Decrements a counter
    DecrementCounter(counter_identifier, decrementbutton_identifier, increment_identifier){
        this.IncrementCounter(counter_identifier, increment_identifier)
        cy.get(counter_identifier).invoke('val').then(counterValue => {
            const initialValue = parseInt(counterValue, 10)

            cy.get(decrementbutton_identifier).click()

            cy.get(counter_identifier).invoke('val').then(counterValue => {
                const newCount = parseInt(counterValue, 10)
                expect(newCount).to.eq(initialValue - 1)
            })
        })
    }

}