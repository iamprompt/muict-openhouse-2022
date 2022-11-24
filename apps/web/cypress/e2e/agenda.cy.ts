describe('Agenda', () => {
  beforeEach(() => {
    cy.viewport(430, 932)
  })

  it('should display properly', () => {
    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: {
        success: true,
        payload: {
          language: 'th',
        },
      },
    })

    cy.visit('/agenda', {
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

    cy.get('[data-test=agenda-date-2022-10-28]').click()
    cy.get('[data-test="agenda-2022-10-28-0-time"]').should('have.text', '08:30 - 09:00')
    cy.get('[data-test="agenda-2022-10-28-0-title"]').should('have.text', 'พิธีเปิดกิจกรรม')
    cy.get('[data-test="agenda-2022-10-28-0-speaker-name"]').should('have.text', 'ดร.พัฒนศักดิ์ มงคลวัฒน์')
    cy.get('[data-test="agenda-2022-10-28-0-speaker-position"]').should('have.text', 'คณบดีคณะเทคโนโลยีสารสนเทศและการสื่อสาร')
    cy.get('[data-test="agenda-2022-10-28-0-location"]').should('have.text', 'เวที ชั้น 1')
    cy.get('[data-test="agenda-2022-10-28-0-live"]').should('exist')

    cy.get('[data-test=agenda-date-2022-10-29]').click()
    cy.get('[data-test="agenda-2022-10-29-0-time"]').should('have.text', '08:30 - 09:00')
    cy.get('[data-test="agenda-2022-10-29-0-title"]').should('have.text', 'พิธีเปิดกิจกรรม')
    cy.get('[data-test="agenda-2022-10-29-0-speaker-name"]').should('not.exist')
    cy.get('[data-test="agenda-2022-10-29-0-speaker-position"]').should('not.exist')
    cy.get('[data-test="agenda-2022-10-29-0-location"]').should('have.text', 'เวที ชั้น 1')
    cy.get('[data-test="agenda-2022-10-29-0-live"]').should('exist')
  })
})
