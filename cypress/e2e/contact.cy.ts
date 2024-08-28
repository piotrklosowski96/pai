const CINEMA_QUANTITY = 5;

describe("Test if there is cinema map", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-kontakt"]').click();
  });

  it("test if google maps are visible", () => {
    cy.get('[data-testid="contact-map-iframe"]').should("be.visible");
  });

  it("test if google maps are proper quantity", () => {
    cy.get('[data-testid="contact-map-iframe"]').should(
      "have.length",
      CINEMA_QUANTITY
    );
  });

  it("test if google maps are proper attribute", () => {
    cy.get('[data-testid="contact-map-iframe"]')
      .should("have.attr", "src")
      .and("include", "google.com/maps");
  });
});

describe("Test if there is proper address", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-kontakt"]').click();
  });

  it("Test if component display proper values for Katowice cinema", () => {
    cy.get('[data-testid="contact-city-name"]')
      .first()
      .should("have.text", "Katowice");
    cy.get('[data-testid="contact-city-address"]')
      .first()
      .should("contain.text", "ul. Reymonta 34");
    cy.get('[data-testid="contact-city-address-mail"]')
      .first()
      .should("have.text", "katowice@wawel.pl");
  });

  it("Test if component display proper values for third cinema from the list", () => {
    cy.get('[data-testid="contact-city-name"]')
      .eq(2)
      .should("have.text", "Lubań");
    cy.get('[data-testid="contact-city-address"]')
      .eq(2)
      .should("contain.text", "ul. 7 Dywizji 15");
    cy.get('[data-testid="contact-city-address-mail"]')
      .eq(2)
      .should("have.text", "luban@wawel.pl");
  });
});
