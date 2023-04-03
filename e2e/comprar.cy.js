/// <reference types="cypress" />
import checkout from '../support/page-objects/checkout'
const dadosEndereco = require('../fixtures/endereco.json')
const { faker } = require('@faker-js/faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Nesse passo eu resolvi criar variaveis do tipo array, contendo objetos
        //para facilitar o tester na hora de escolher um tamanho ou cor
        const size = [
            {
                xs: '.button-variable-item-XS',
                s: '.button-variable-item-S',
                m: '.button-variable-item-M',
                l: '.button-variable-item-L',
                xl: '.button-variable-item-XL'
            }
        ];

        const color = [
            {
                blue: '.button-variable-item-Blue',
                green: '.button-variable-item-Green',
                red: '.button-variable-item-Red',
                black: '.button-variable-item-Black',
                brown: '.button-variable-item-Brown'
            }
        ];

        //Nesse ponto começa o nosso teste para escolher os produtos
        //você escolhe o produto
        cy.get(".product-block").eq(0).click();

        //config produto 1
        cy.get(size[0].m).click();
        cy.get(color[0].blue).click();
        cy.get('.single_add_to_cart_button').click();

        //config produto 2
        cy.get(size[0].xs).click();
        cy.get(color[0].green).click();
        cy.get('.single_add_to_cart_button').click();

        //config produto 3
        cy.get(size[0].s).click();
        cy.get(color[0].red).click();
        cy.get('.single_add_to_cart_button').click();

        //config produto 4
        cy.get(size[0].l).click();
        cy.get(color[0].blue).click();
        cy.get('.single_add_to_cart_button').click();

        //finalizando a compra
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //checkout ()
        //nome e sobrenome resolvi utilizar o faker
        cy.get('#billing_first_name').type(faker.name.firstName())
        cy.get('#billing_last_name').type(faker.name.lastName())

        //no restante do formulário resolvi utilizar fixtures com page-objects
        checkout.infoCheckout(
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        )
        
        //Finalmente finalizamos todo o processo e validamos a compra!
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado')
    });

})