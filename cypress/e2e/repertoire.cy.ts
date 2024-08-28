describe("Test repertoire headers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-repertuar"]').click();
  });

  it("test if repertoire page has header", () => {
    cy.get('[data-testid="repertoire-page-header"]').should(
      "have.text",
      "Wybierz swoje kino"
    );
  });

  it("test if repertoire page has header", () => {
    cy.get('[data-testid="repertoire-city-header"]').should(
      "have.text",
      "Miasto:"
    );
  });
});

describe("Test repertoire select html element", () => {
  const CITIES = ["", "Kraków", "Katowice", "Opole", "Wrocław", "Lubań"];
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-repertuar"]').click();
  });

  it("test if select html element has proper default value", () => {
    cy.get('[data-testid="repertoire-select-city"]').should("have.value", "");
  });

  it("test if select html element has proper values", () => {
    CITIES.forEach((item, index) => {
      cy.get('[data-testid="repertoire-select-city"]')
        .select(index)
        .should("have.value", item);
    });
  });

  it("test if select HTML element loads proper page", () => {
    for (let i = 1; i < CITIES.length; i++) {
      cy.get('[data-testid="repertoire-select-city"]').select(CITIES[i]);
      cy.get('[data-testid="repertoire-select-city-cinema-name"]')
        .should("be.visible")
        .invoke("text")
        .then((text) => {
          const splittedText = text.split("-");
          const cinemaName = splittedText[1]?.trim();
          expect(cinemaName).to.eq(CITIES[i]);
        });
    }
  });
});
