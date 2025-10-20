import { CommonActions } from "../actions/CommonActions";
const pageContent = require('../../fixtures/pageContent/content.json')

const ca = new CommonActions()

export class ProductPage {
    // web element identifiers and their methods separated into sections 

    // product page
    product_sidebaritem_identifier = '[data-testid="product-menu-item"]'
    product_page_url = pageContent.urls.productPageUrl
    create_product_identifier = '[data-testid="create-button"]'
    create_product_form_url = pageContent.urls.createProductUrl

    checkProductExistsInSidebar() {
        ca.verifyWebElementExists(this.product_sidebaritem_identifier)
    }

    clickOnProductMenuItem() {
        ca.clickonWebElement(this.product_sidebaritem_identifier)
    }

    checkRedirectionToProductPage() {
        ca.verifyLinkRedirection('pathname', this.product_page_url)
    }

    checkCreateProductExists() {
        ca.verifyWebElementExists(this.create_product_identifier)
    }

    // create product form
    save_button_identifier = '[datatestid="edit-button"]'
    productname_input_identifier = '[name="name"]'
    helper_identifier = '.css-15oklmi'
    productprice_input_identifier = '[name="price"]'
    productreference_input_identifier = '[name="productExtId"]'
    productdescription_input_identifier = '[name="description"]'
    quanity_input_identifier = '[name="quantity"]'
    attachments_identifier = '[data-testid="dropzone"]'
    attachments_input_identifier = '[data-testid="dropzone-input"]'
    singleAttachment = pageContent.imagePaths.singleImage
    fiveAttachments = pageContent.imagePaths.fiveImages
    sixAttachments = pageContent.imagePaths.sixImages
    customization_dropdown_identifier = '#panel1d-header p.css-17rgji7'
    name_error = pageContent.products.nameError
    price_error = pageContent.products.priceError
    price_below_min_error = pageContent.products.priceBelowMinError
    reference_error = pageContent.products.refError
    description_error = pageContent.products.descError
    upload_error = pageContent.products.fileUploadError

    clickOnCreateProduct() {
        ca.clickonWebElement(this.create_product_identifier)
    }

    clickOnSaveProduct() {
        ca.clickonWebElement(this.save_button_identifier)
    }

    checkRedirectionToCreateProduct() {
        ca.verifyLinkRedirection('pathname', this.create_product_form_url)
    }

    checkSavebuttonisDisabled() {
        ca.verifyDisabled(this.save_button_identifier)
    }

    enterProductName(value) {
        ca.enterValueInField(this.productname_input_identifier, value)
    }

    verifyNameError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.name_error)
    }

    verifyPriceError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.price_error)
    }

    verifyPriceBelowMinError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.price_below_min_error)
    }

    verifyRefError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.reference_error)
    }

    verifyDescError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.description_error)
    }

    verifyUploadError() {
        ca.verifyTextWithinElement(this.helper_identifier, this.upload_error)
    }

    enterProductPrice(value) {
        ca.enterValueInField(this.productprice_input_identifier, value)
    }

    checkPriceLessthanMinPrice(value){
        ca.verifyValueIsLessThanLimit(this.productprice_input_identifier, value)
    }

    enterReference(value) {
        ca.enterValueInField(this.productreference_input_identifier, value)
    }

    enterDescription(value) {
        ca.enterValueInField(this.productdescription_input_identifier, value)
    }

    enterQuantity(value){
        ca.enterValueInField(this.quanity_input_identifier, value)
    }

    checkIfPriceInputHasValue(value){
        ca.checkIfHasValue(this.productprice_input_identifier, value)
    }

    checkIfQuantityInputHasValue(value){
        ca.checkIfHasValue(this.quanity_input_identifier, value)
    }

    checkAttachmentInputExists() {
        ca.verifyWebElementExists(this.attachments_identifier)
    }

    clickAttachmentInput() {
        ca.clickonWebElement(this.attachments_identifier)
    }

    uploadAttachment() {
        ca.uploadFile(this.attachments_input_identifier, this.singleAttachment)
    }

    uploadFiveAttachments() {
        ca.uploadFile(this.attachments_input_identifier, this.fiveAttachments)
    }

    uploadSixAttachments() {
        ca.uploadFile(this.attachments_input_identifier, this.sixAttachments)
    }

    checkCustomizationDropDownExists() {
        ca.verifyWebElementExists(this.customization_dropdown_identifier)
    }

    clickCustomizationDropDown() {
        ca.clickonWebElement(this.customization_dropdown_identifier)
    }

    // success pop up
    success_popup_identifier = 'div.css-3ombl8'
    qrcode_identifier = '.css-t91eww'
    prl_identifier = '.css-12u3292'
    file_copy_identifier = '[data-testid="FileCopyIcon"]'
    payment_page_url = pageContent.urls.paymentPageUrl

    checkSuccessPopupExists() {
        ca.verifyWebElementExists(this.success_popup_identifier)
    }


    checkQrCodeExists() {
        ca.verifyWebElementExists(this.qrcode_identifier)
    }

    checkPRLExists() {
        ca.verifyWebElementExists(this.prl_identifier)
    }

    clickPRL() {
        ca.clickonWebElement(this.prl_identifier)
    }

    checkFileCopyExists() {
        ca.verifyWebElementExists(this.file_copy_identifier)
    }


}