describe("Home page next previous slide buttons tests", () => {
  it("test if next change images", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="slide-image-title"]')
      .invoke("text")
      .then((firstTitle) => {
        cy.get('[data-testid="next-slide-button"]').click();
        cy.get('[data-testid="slide-image-title"]')
          .invoke("text")
          .then((secondTitle) => {
            expect(secondTitle).not.to.eq(firstTitle);
          });
      });
  });

  it("test if prev change images", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="slide-image-title"]')
      .invoke("text")
      .then((firstTitle) => {
        cy.get('[data-testid="previous-slide-button"]').click();
        cy.get('[data-testid="slide-image-title"]')
          .invoke("text")
          .then((secondTitle) => {
            expect(secondTitle).not.to.eq(firstTitle);
          });
      });
  });
});

describe("On slide buttons test", () => {
  const BUY_TICKET_LABEL = "Kup bilet";
  const WATCH_TRAILER = "Obejrzyj zwiastun";
  it("test if buy ticket button exists", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="buy-ticket-slide-button"]').should(
      "have.text",
      BUY_TICKET_LABEL
    );
  });

  it("test if watch trailer button exists", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="watch-trailer-slide-button"]').should(
      "have.text",
      WATCH_TRAILER
    );
  });
});
