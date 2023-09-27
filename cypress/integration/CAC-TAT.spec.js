//// <reference types="Cypress" />

/// Descrição do projeto, com o caminho para vistar o site
describe('Central de Atendimento ao Cliente TAT', function() {
beforeEach(function() {
  cy.visit('./src/index.html')
})

//// Validar o titulo da aplicação
  it('verifica o título da aplicação', function() {
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })
//// Preencher os campos com os dados validos.
  it('preenche os campos obrigatórios e envia o formulário', function(){
    const textolongo = 'TESTE, TESTE, TESTE,ESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTEESTE, TESTE, TESTE'
    cy.get('#firstName').type('Gregory')
    cy.get('#lastName').type('Silva')
    cy.get('#email') .type('gregorywillian@yahoo.com.br')
    cy.get('#phone') .type('11997606332')
    cy.get('#open-text-area') .type(textolongo, {delay:0})
    cy.contains ('button', 'Enviar' ) .click()

    cy.get('.success').should('be.visible')
  })
  ///Preencher o campo com email invalido exibindo erro
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#firstName').type('Gregory')
    cy.get('#lastName').type('Silva')
    cy.get('#email') .type('gregorywillian.yahoo.com.br')
    cy.get('#phone') .type('11997606332')
    cy.get('#open-text-area') .type('teste')
    cy.contains ('button', 'Enviar' ) .click()

    cy.get('.error').should('be.visible')
   })
  it('Campo de telefone continua vazio quando os valores não for númerico', function() {
    cy.get('#phone')
      .type('abcdefghijklmnopqrstuv')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Gregory')
    cy.get('#lastName').type('Silva')
    cy.get('#email') .type('gregorywillian@yahoo.com.br')
    cy.get('#phone-checkbox') .check()
    cy.get('#open-text-area') .type('teste')
    cy.contains ('button', 'Enviar' ) .click()

    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro quando o e-mail se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Gregory')
    cy.get('#lastName').type('Silva')
    cy.get('#phone') .type('11997606332')
    cy.get('#email-checkbox') .click()
    cy.get('#open-text-area') .type('teste')
    cy.contains ('button', 'Enviar' ) .click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
   cy.get('#firstName')
     .type('Gregory')
    .should('have.value', 'Gregory')
    .clear()
    .should('have.value','')
   cy.get('#lastName')
    .type('Silva')
    .should('have.value', 'Silva')
    .clear()
    .should('have.value','')

  cy.get('#email') 
    .type('gregorywillian.yahoo.com.br')
    .should('have.value', 'gregorywillian.yahoo.com.br')
    .clear()
    .should('have.value','')
  cy.get('#phone') 
    .type('11997606332')
    .should('have.value', '11997606332')
    .clear()
    .should('have.value','')
  cy.get('#open-text-area') 
    .type('teste')
    .should('have.value', 'teste')
    .clear()
    .should('have.value','')
  })  

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
    cy.contains ('button', 'Enviar' ) .click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
   cy.Comandocustomizado()

   cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should ('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

it('marca o tipo de atendimento "Feedback"', function(){
  cy.get('input[type="radio"][value="feedback"]')
    . check()
    .should('have.value','feedback')
})

it('marca cada tipo de atendimento', function(){
  cy.get('input[type="radio"]')
    .should('have.length',3)
    .each(function($radio) {
       cy.wrap($radio).check()
       cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', function(){
  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]') // pegar um input do tipo file
      .should('not.have.value') // Verificar que não há nenhum valor
      .selectFile('./cypress/fixtures/example.json') // efetuar o upload com o caminho do arquivo
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
it('seleciona um arquivo simulando um drag-and-drop', function(){
cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
  .should(function($input){
       expect($input[0].files[0].name).to.equal('example.json')  
  })
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
 cy.fixture('example.json').as('sampleFile')
 cy.get('input[type="file"]')
   .selectFile('@sampleFile')
   .should(function($input){
     expect($input[0].files[0].name).to.equal('example.json')
   })
})

 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
   cy.get('#privacy a') 
     .should('have.attr', 'target', '_blank')
 })

 it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
  cy.contains('Talking About Testing')
    .should('be.visible')  
 })

})




  
  