import { LoginPage } from "../pages/LoginPage"
import { ProductPage } from "../pages/ProductPage"

const pageContent = require('../../fixtures/pageContent/content.json')
const loginPage = new LoginPage()
const prodPage = new ProductPage()


describe('Product PRL Test', () => {
    beforeEach(() => {
        cy.visit(pageContent.urls.loginUrl)

        loginPage.login()

        cy.fixture("pageContent/content.json").then(content => {
            cy.wrap(content).as("pageContent")
        })
    })
    

    it('Verifies if product exists on the sidebar and leads to product page', () => {
        // Check if product exists in the sidebar, clicks on the menu item, and checks if the page redirects to product page
        prodPage.checkProductExistsInSidebar()
        prodPage.clickOnProductMenuItem()
        prodPage.checkRedirectionToProductPage()
    })

    it('Verfies if create product exists on product page and clicks to open form', () => {
        // Click on the produc item in the menu
        prodPage.clickOnProductMenuItem()

        // Check if the create product button exists on the product page, click on it and verify redirection
        prodPage.checkCreateProductExists()
        prodPage.clickOnCreateProduct()
        prodPage.checkRedirectionToCreateProduct()

    })

    it('Verifies that an empty form cannot be sent', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        // checks if the save button is disabled when form is empty
        prodPage.checkSavebuttonisDisabled()
    })

    it('Verifies that form cannot be sent without product name', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        // enter all fields into the form except product name
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })
        prodPage.clickOnSaveProduct()
        prodPage.verifyNameError()
    })

    it('Verifies that form cannot be sent without price', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })
        prodPage.clickOnSaveProduct()
        prodPage.verifyPriceError()
    })

    it('Verifies that form cannot be sent without reference', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        // enter all fields except reference
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterDescription(pageContent.products.description)
        })
        prodPage.clickOnSaveProduct()
        prodPage.verifyRefError()
    })

    it('Verifies that form cannot be sent without description', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
         // enter all fields except description
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
        })
        prodPage.clickOnSaveProduct()
        prodPage.verifyDescError()
    })

    it('Verifies that the price field can only accept numbers', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        // Attempt to enter letters in the price field
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductPrice(pageContent.products.name)
        })
        // check if the price field is empty
        prodPage.checkIfPriceInputHasValue('')

    })

    it('Verifies that the quantity field can only accept numbers', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()

        // check that the customization button and click
        prodPage.checkCustomizationDropDownExists()
        prodPage.clickCustomizationDropDown()

        // Attempt to enter letters in the price field
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterQuantity(pageContent.products.name)
        })

        // check if the price field is empty
        prodPage.checkIfQuantityInputHasValue('')

    })

    it('Verifies that the user cannot input a price less than 100', () => {
         // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()

         // Enter all fields and a price less than 100 in the price field
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductPrice(pageContent.products.belowMinPrice)
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })

        // submit the form and check for error on the field
        prodPage.clickOnSaveProduct()
        prodPage.verifyPriceBelowMinError

    })

    it('Fills in the form and checks if success popup opens on save and goes to payment page', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()

        // fills in all fields correctly
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })
        
        prodPage.clickOnSaveProduct()
        // now check for modal, link, copy icon, etc
        prodPage.checkSuccessPopupExists()
        prodPage.checkQrCodeExists()
        prodPage.checkFileCopyExists()
        prodPage.checkPRLExists()
        prodPage.clickPRL()
    })

    it('Uploads a single file', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        
        // fill the required parts of the form
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })

        // check that the customization button and click
        prodPage.checkCustomizationDropDownExists()
        prodPage.clickCustomizationDropDown()

        // check for the attachment input
        prodPage.checkAttachmentInputExists()
        prodPage.clickAttachmentInput()

        // upload a single attachment
        prodPage.uploadAttachment()
        prodPage.clickOnSaveProduct()
        prodPage.checkSuccessPopupExists()
    })

    it('Uploads five files', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })
        prodPage.checkCustomizationDropDownExists()
        prodPage.clickCustomizationDropDown()
        prodPage.checkAttachmentInputExists()
        prodPage.clickAttachmentInput()

        // upload five attachments as expected
        prodPage.uploadFiveAttachments()
        prodPage.clickOnSaveProduct()
        prodPage.checkSuccessPopupExists()
    })

     it.skip('Does not upload more than five files', () => {
        // navigate to product page after login and click to create product
        prodPage.clickOnProductMenuItem()
        prodPage.clickOnCreateProduct()
        cy.get('@pageContent').then(pageContent => {
            prodPage.enterProductName(pageContent.products.name)
            prodPage.enterProductPrice(pageContent.products.price)
            prodPage.enterReference(pageContent.products.reference)
            prodPage.enterDescription(pageContent.products.description)
        })
        prodPage.checkCustomizationDropDownExists()
        prodPage.clickCustomizationDropDown()
        prodPage.checkAttachmentInputExists()
        prodPage.clickAttachmentInput()

        // upload six attachments and expect error message
        prodPage.uploadSixAttachments()
        prodPage.clickOnSaveProduct()
        prodPage.verifyUploadError()
    })



    
})