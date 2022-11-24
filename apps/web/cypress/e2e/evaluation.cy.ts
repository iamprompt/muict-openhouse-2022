describe('Evaluation', () => {
  beforeEach(() => {
    cy.viewport(430, 932)
  })

  it('should successfully evaluated', () => {
    cy.intercept('GET', '/api/evaluations/isEvaluated', {
      statusCode: 200,
      body: {
        success: true,
        payload: {
          isEvaluated: false,
        },
      },
    })

    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: {
        success: true,
        payload: {
          language: 'th',
        },
      },
    })

    cy.visit('/evaluation', {
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

    // Start Evaluation
    cy.get('[data-test=start-eval-button]').click()

    // Basic Information
    cy.get('[data-test=input-label-role\\.high-school-student]').click()
    cy.get('[data-test=input-label-gender\\.male]').click()
    cy.get('[data-test=input-label-channels\\.muict-op-facebook]').click()
    cy.get('[data-test=input-label-participated-activities\\.guidance]').click()
    cy.get('[data-test=next-button]').click()

    // Satisfaction
    cy.get('[data-test=input-label-date-and-time-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-location-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-service-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-understanding-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-stage-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-booths-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-project-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-guidance-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-intl-exp-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-benefit-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-overall-rating\\.strongly-agree]').click()
    cy.get('[data-test=input-label-interest-rating\\.strongly-agree]').click()
    cy.get('[data-test=next-button]').click()

    // Others
    cy.get('[data-test=input-interested-programs\\.0]').type('ICT, mahidol')
    cy.get('[data-test=input-interested-programs\\.1]').type('EG, mahidol')
    cy.get('[data-test=input-interested-programs\\.2]').type('SC, mahidol')

    cy.get('[data-test=input-factors\\.0]').type('ใกล้บ้าน')
    cy.get('[data-test=input-factors\\.1]').type('ความสนใจ')
    cy.get('[data-test=input-factors\\.2]').type('เพื่อน')

    cy.get('[data-test=input-impressed]').type('การจัดการ กิจกรรม ของรางวัล')
    cy.get('[data-test=input-unimpressed]').type('คนเยอะไปครับ')
    cy.get('[data-test=input-other-suggestions]').type('ไม่มี')

    // Submit Form
    cy.intercept('POST', '/api/evaluations', {
      success: true,
      payload: {
        message: 'Evaluation submitted successfully',
      },
    })
    cy.get('[data-test=next-button]').click()

    // Expect to be redirected to success page
    cy.url().should('include', '/evaluation/success')
  })
})
