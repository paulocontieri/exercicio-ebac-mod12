/// <reference types="cypress" />

describe('Funcionalidade Página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });
    
    it("Deve selecionar um produto da lista", () => {

        const produtos = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
        produtos.forEach(function (produto) {
  
          cy.visit("http://lojaebac.ebaconline.art.br/produtos/");
          cy.get(".product-block").eq(produto).click();
  
        });
        cy.visit("http://lojaebac.ebaconline.art.br/produtos/");
  
      });

});