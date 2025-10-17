import { LoginPage } from "../pages/LoginPage";

const pageContent = require('../../fixtures/pageContent/content.json')
const loginPage = new LoginPage()

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(pageContent.urls.loginUrl)

    cy.fixture("user/userData.json").then(user => {
      cy.wrap(user).as("userData")
    })
  })

  it('Verifies that the form cannot be sent with empty fields', () => {
    loginPage.checkIfLoginDisabled()
    
  })

  it('Verfies that the form cannot be sent with empty username', () => {
    loginPage.verifyUsernameInputExists()
    loginPage.verifyPasswordInputExists()
    // get the password from the fixture
    cy.get('@userData').then(userData => {
      loginPage.enterUsername(userData.password)
    })
    loginPage.clickOnLoginButton()
    loginPage.checkUserErrorExists()
  })

  it('Verfies that the form cannot be sent with empty password', () => {
    loginPage.verifyUsernameInputExists()
    loginPage.verifyPasswordInputExists()
    // get the username from the fixture
    cy.get('@userData').then(userData => {
      loginPage.enterUsername(userData.username)
    })
    loginPage.clickOnLoginButton()
    loginPage.checkPasswordErrorExists()
  })

  it('Verifies that form cannot be sent with wrong username', () => {
    loginPage.verifyUsernameInputExists()
    loginPage.verifyPasswordInputExists()
    cy.get('@userData').then(userData => {
      loginPage.enterUsername(userData.wrongUser)
      loginPage.enterPassword(userData.password)
    })
    loginPage.clickOnLoginButton()
    loginPage.checkNoRedirection()
  })

  it('Verifies that form cannot be sent with wrong password', () => {
    loginPage.verifyUsernameInputExists()
    loginPage.verifyPasswordInputExists()
    cy.get('@userData').then(userData => {
      loginPage.enterUsername(userData.username)
      loginPage.enterPassword(userData.wrongPassword)
    })
    loginPage.clickOnLoginButton()
    loginPage.checkNoRedirection()
  })

  it('Verifies that form should be sent with correct data', () => {
    loginPage.verifyUsernameInputExists()
    loginPage.verifyPasswordInputExists()
    loginPage.login()
    loginPage.checkNoRedirection()
  })

  it('Verifies that the eye icon shows password if it is hidden', () => {
    loginPage.verifyPasswordInputExists()
    cy.get('@userData').then(userData => {
      loginPage.enterPassword(userData.password)
    })
    loginPage.clickOnOffeyeIcon()
    loginPage.verifyIfPasswordShown()
  })

  it('Verifies that the close eye icon hides password if it is shown', () => {
    loginPage.verifyPasswordInputExists()
    cy.get('@userData').then(userData => {
      loginPage.enterPassword(userData.password)
    })
    loginPage.verifyIfPasswordHidden()
  })

  
})