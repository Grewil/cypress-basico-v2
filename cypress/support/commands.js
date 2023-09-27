
Cypress.Commands.add('Comandocustomizado', function(){
 cy.get('#firstName').type('Gregory')
 cy.get('#lastName').type('Silva')
 cy.get('#email') .type('gregorywillian@yahoo.com.br')
 cy.get('#phone') .type('11997606332')
 cy.get('#email-checkbox') .click()
 cy.get('#open-text-area') .type('teste')
 cy.contains ('button', 'Enviar' ) .click() 
})
