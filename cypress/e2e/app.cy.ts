describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('displays loading text while fetching data', () => {
    cy.get('main').contains('Loading...').should('be.visible');
    cy.get('main').contains('Loading...').should('not.exist');
    cy.get('main').contains('City Name').should('not.exist');
  });

  it('displays weather information', () => {
    cy.get('[id="weather-card"]').should('have.length', 1);
  });

  it('marks as favorite', () => {
    cy.get('[data-testid="favorite-button"]').click();

    cy.get('[id="favorite-weather-card"]').should('have.length', 1);

  });

  it('search a city', () => {
    cy.get('[data-testid="form"]').click().type("ipatinga");
    cy.get('[type="submit"]').click();


    cy.get('[id="weather-card"]').should('have.length', 1);


  });

});
