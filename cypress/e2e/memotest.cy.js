describe('Memotest Game', () => {

  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('El temporizador y los intentos inician en 0', () => {
    cy.get('#temporizador').should('have.text', '0');
    cy.get('#intentos').should('have.text', '0');
  });

  it('El tablero contiene 16 cartas', () => {
    cy.get('#tablero .carta').should('have.length', 16);
  });

  it('Girar dos cartas y verificar intentos', () => {
    cy.get('#tablero .carta').first().click();
    cy.get('#tablero .carta').eq(1).click();

    cy.get('#intentos').should('have.text', '1');
  });

  it('Emparejar todas las cartas y verificar mensaje de victoria', () => {
    for (let i = 0; i < 16; i += 2) {
      cy.get('#tablero .carta').eq(i).click();
      cy.get('#tablero .carta').eq(i + 1).click();
    }
    cy.on('window:alert', (text) => {
      expect(text).to.include('Ganaste!');
    });
  });
});
