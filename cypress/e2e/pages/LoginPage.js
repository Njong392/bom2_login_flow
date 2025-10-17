import { CommonActions } from "../actions/CommonActions";

const pageContent = require('../../fixtures/pageContent/content.json')
const userData = require('../../fixtures/user/userData.json')
const ca = new CommonActions()

export class LoginPage{
    // web element identifiers for regsiter page
    username_input_identifier = '[data-testid="username"]'
    password_input_identifier = '[data-testid="password"]'
    login_button_identifier = '[data-testid="Sign-In"]'
    offEye_icon_identifier = '[data-testid="VisibilityOffIcon"]'
    eye_icon_identifier = '[data-testid="VisibilityIcon"]'
    username_error_identifier = '#\\:r3\\:-helper-text'
    password_error_identifier = '#\\:r5\\:-helper-text'
    homepage_url = pageContent.urls.homeUrl
    

    // action methods
    verifyUsernameInputExists(){
        ca.verifyWebElementExists(this.username_input_identifier)
    }

    enterUsername(value){
        ca.enterValueInField(this.username_input_identifier, value)
    }

    verifyPasswordInputExists(){
        ca.verifyWebElementExists(this.password_input_identifier)
    }

    enterPassword(value){
        ca.enterValueInField(this.password_input_identifier, value)
    }

    login(){
        this.enterUsername(userData.username)
        this.enterPassword(userData.password)
        ca.clickonWebElement(this.login_button_identifier)
    }

    clickOnLoginButton(){
        ca.clickonWebElement(this.login_button_identifier)
    }

    clickOnOffeyeIcon(){
        ca.clickonWebElement(this.offEye_icon_identifier)
    }

    clickOneyeIcon(){
        ca.clickonWebElement(this.eye_icon_identifier)
    }

    verifyIfPasswordHidden(){
       ca.verifyWebElementExists(this.offEye_icon_identifier)
    }

    verifyIfPasswordShown(){
        ca.verifyWebElementExists(this.eye_icon_identifier)
    }

    checkNoRedirection(){
        ca.verifyLinkDoesNotRedirect('pathname', this.homepage_url)
    }

    checkRedirection(){
        ca.verifyLinkRedirection('pathname', this.homepage_url)
    }

    checkIfLoginDisabled(){
        ca.verifyDisabled(this.login_button_identifier)
    }

    checkUserErrorExists(){
        ca.verifyWebElementExists(this.username_error_identifier)
    }
    
    checkPasswordErrorExists(){
        ca.verifyWebElementExists(this.password_error_identifier)
    }
}