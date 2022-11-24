describe('Register', () => {
  beforeEach(() => {
    cy.viewport(430, 932)
  })

  it('should successfully register via liff app', () => {
    cy.intercept('GET', '/api/users/isRegistered', {
      success: true,
      payload: {
        isRegistered: false,
      },
    })

    cy.visit('/register', {
      onBeforeLoad: (window: any) => {
        const profile = {
          displayName: 'mockDisplayName',
          userId: '[mock]U1234567890',
          pictureUrl: 'https://ourfunnylittlesite.com/wp-content/uploads/2018/07/1-4-696x696.jpg',
          statusMessage: 'liff is controlled by Cypress',
        }

        window.Cypress.liffMock = {
          init: cy.stub().as('init').resolves(),
          isLoggedIn: cy.stub().as('isLoggedIn').returns(true),
          getProfile: cy.stub().as('getProfile').resolves(profile),
          isInClient: cy.stub().as('isInClient').returns(true),
          getAccessToken: cy.stub().as('getAccessToken').returns('myAccessToken'),
          getIDToken: cy.stub().as('getIDToken').returns('TestingIdToken'),
          closeWindow: cy.stub().as('closeWindow').resolves(),
        }
      },
    })

    // Select Language
    cy.get('[data-test=nationality-th]').click()

    // Participant Type Selection
    cy.get('[data-test=registrant-type-student]').click()

    // Privacy Policy
    cy.get('[data-test=policy-agreement]').check()
    cy.get('[data-test=policy-form]').submit()

    // Basic Information
    cy.get('[data-test=first-name-input]').type('นพรัตน์')
    cy.get('[data-test=last-name-input]').type('เพ็งสุข')
    cy.get('[data-test=email-input]').type('nopparat.pen@gmail.com')
    cy.get('[data-test=phone-input]').type('0979244717')
    cy.get('[data-test=basic-info-form]').submit()

    // Additional Information
    cy.get('[data-test=province-select]').select('กรุงเทพมหานคร')
    cy.get('[data-test=school-input]').type('โรงเรียนอัสสัมชัญธนบุรี')
    cy.get('[data-test=level-select]').select('มัธยมศึกษาปีที่ 6')

    // Submit Form
    cy.intercept('POST', '/api/users/register', {
      success: true,
      payload: {
        message: 'Participant registered',
      },
    })
    cy.get('[data-test=additional-info-form]').submit()

    // Expect to be redirected to success page
    cy.url().should('include', '/register/success')
  })

  it('should be not able to register via liff app, because already registered', () => {
    cy.intercept('GET', '/api/users/isRegistered', {
      success: true,
      payload: {
        isRegistered: true,
      },
    })

    cy.visit('/register', {
      onBeforeLoad: (window: any) => {
        const profile = {
          displayName: 'mockDisplayName',
          userId: '[mock]U1234567890',
          pictureUrl: 'https://ourfunnylittlesite.com/wp-content/uploads/2018/07/1-4-696x696.jpg',
          statusMessage: 'liff is controlled by Cypress',
        }

        window.Cypress.liffMock = {
          init: cy.stub().as('init').resolves(),
          isLoggedIn: cy.stub().as('isLoggedIn').returns(true),
          getProfile: cy.stub().as('getProfile').resolves(profile),
          isInClient: cy.stub().as('isInClient').returns(true),
          getAccessToken: cy.stub().as('getAccessToken').returns('myAccessToken'),
          getIDToken: cy.stub().as('getIDToken').returns('TestingIdToken'),
          closeWindow: cy.stub().as('closeWindow').resolves(),
        }
      },
    })

    // Expect to be redirected to success page
    cy.url().should('include', '/register/registered')
  })
})
