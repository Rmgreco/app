describe('Weather App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('displays weather information', () => {
      cy.get('[id="weather-card"]').should('have.length', 1);
    });
  
  });
  