describe('Note App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show loginn').click()
  })

  it('user can login', () => {
    cy.contains('Show loginn').click()
    // cy.get('input:first').type('anaroot')
    // cy.get('input:last').type('12345')

    // otras formas
    // cy.get('input').first().type('anaroot')
    // cy.get('input').last().type('12345')

    // cy.get('[placeholder="Username"]').type('anaroot')
    // cy.get('[placeholder="Password"]').type('12345')

    cy.get('[name="Username"]').type('anaroot')
    cy.get('[name="Password"]').type('12345')
    cy.contains('Login').click()
    cy.contains('New note')
  })


  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('Show loginn').click()
      cy.get('[name="Username"]').type('anaroot')
      cy.get('[name="Password"]').type('12345')
      cy.contains('Login').click()
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New note').click()
      cy.get('[name="noteContent"]').type(noteContent)
      cy.contains('Crear nota').click()
      cy.contains(noteContent)
    })
  })

})