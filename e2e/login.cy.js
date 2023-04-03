/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
  });

  it('Deve fazer login com sucesso', () => {
    cy.get('#username').type(perfil.usuario);
    cy.get('#password').type(perfil.senha);
    cy.get('.woocommerce-form > .button').click();
    cy.get('.page-title').should('contain', 'Minha conta');
  });

  it('Deve fazer login com sucesso - usando fixture', () => {
    cy.fixture('perfil').then(dados=> {
      cy.get('#username').type(dados.usuario);
      cy.get('#password').type(dados.senha, {log: false});
      cy.get('.woocommerce-form > .button').click();
      cy.get('.page-title').should('contain', 'Minha conta');
    })
  });

  it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
    cy.get('#username').type('erro@erro.com');
    cy.get('#password').type(perfil.senha);
    cy.get('.woocommerce-form > .button').click();
    cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido.')
  });

  it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
    cy.get('#username').type(perfil.usuario);
    cy.get('#password').type('teste@erro.com');
    cy.get('.woocommerce-form > .button').click();
    cy.get('.woocommerce-error > li').should('contain', 'Erro: a senha fornecida para')
  });
})