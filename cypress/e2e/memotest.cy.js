describe('Memotest Game', () => {

  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('el temporizador y los intentos inician en 0', () => {
    cy.get('#temporizador').should('have.text', '0');
    cy.get('#intentos').should('have.text', '0');
  });

  it('el temporizador comienza a contar después de girar la primera carta', () => {
    cy.get('#tablero .carta').first().click();
    cy.wait(2000);
    cy.get('#temporizador').should('not.have.text', '0');
  });
  

  it('el tablero contiene 16 cartas', () => {
    cy.get('#tablero .carta').should('have.length', 16);
  });

  it('girar dos cartas y verificar intentos', () => {
    cy.get('#tablero .carta').first().click();
    cy.get('#tablero .carta').eq(1).click();

    cy.get('#intentos').should('have.text', '1');
  });

  it('emparejar todas las cartas y verificar mensaje de victoria', () => {
    for (let i = 0; i < 16; i += 2) {
      cy.get('#tablero .carta').eq(i).click();
      cy.get('#tablero .carta').eq(i + 1).click();
    }
    cy.on('window:alert', (text) => {
      expect(text).to.include('Ganaste!');
    });
  });

  it('las cartas se voltean si no coinciden', () => {
    cy.get('#tablero .carta').first().click();
    cy.get('#tablero .carta').eq(1).click();
    
    cy.wait(1100);
    
    cy.get('#tablero .carta').first().should('not.have.class', 'girada');
    cy.get('#tablero .carta').eq(1).should('not.have.class', 'girada');
  });
  
  it('no se puede girar la misma carta dos veces seguidas', () => {
    cy.get('#tablero .carta').first().click();
    cy.get('#tablero .carta').first().click();
    cy.get('#intentos').should('have.text', '0');
  });  

  it('el orden de las cartas es aleatorio en cada partida', () => {
    let ordenPrimerPartida = [];
    cy.get('#tablero .carta').each(($el, index) => {
      ordenPrimerPartida[index] = $el.attr('data-value');
    }).then(() => {
      cy.reload();
      let ordenSegundaPartida = [];
      cy.get('#tablero .carta').each(($el, index) => {
        ordenSegundaPartida[index] = $el.attr('data-value');
      }).then(() => {
        expect(ordenPrimerPartida).to.not.deep.equal(ordenSegundaPartida);
      });
    });
  });
  
});
