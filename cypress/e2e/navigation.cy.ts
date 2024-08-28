describe("Top navigation tests", () => {
  it("test if navigation exist", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="top-navigation"]').should("exist");
  });

  it("test if title has proper name", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="title-name"]')
      .should("exist")
      .should("have.text", "Kino WAWEL");
  });
});

describe("Top navigation for log out user", () => {
  const EXPECTED_MENU_ITEMS = [
    "Strona główna",
    "Repertuar",
    "Kontakt",
    "Logowanie",
    "Rejestracja",
  ];
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.clearLocalStorage("token");
  });

  it("test if navigation have proper amount of items", () => {
    cy.get('[data-testid="navigation-buttons-container"] a').should(
      "have.length",
      5
    );
  });

  it("test if navigation have proper names", () => {
    cy.get('[data-testid="navigation-buttons-container"] a').each(
      (item, index) => {
        cy.wrap(item).should("contain.text", EXPECTED_MENU_ITEMS[index]);
      }
    );
  });
});

describe("Top navigation for log in user", () => {
  const EXPECTED_MENU_ITEMS = [
    "Strona główna",
    "Administracja",
    "Repertuar",
    "Kontakt",
  ];
  //pasuje stworzyc konto do testow zeby nie uzywac tokena admina :)
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvIiwiZXhwIjo0NjA5NTIxNDM2LCJqdGkiOiI2ZGE3MzhmMC00NDQ3LTRkMjUtYmVlMy00ZmFmYzBjMTgxOTkiLCJpYXQiOjE3MjQ2MTU4MDksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8iLCJuYmYiOjE3MjQ2MTU4MDksInN1YiI6IjNjYzBkYTJiLWI3ZWUtNGEzNC1iNjcxLWYyNjQzZDdkOGU2NiIsImh0dHBzOi8vd2F3ZWwucGwiOnsidXNlcklEIjoiM2NjMGRhMmItYjdlZS00YTM0LWI2NzEtZjI2NDNkN2Q4ZTY2IiwiZmlyc3ROYW1lIjoiUGlvdHIiLCJsYXN0TmFtZSI6IkvFgm9zb3dza2kiLCJlbWFpbCI6ImFkbWluaXN0cmF0b3JAd2F3ZWwucGwiLCJyb2xlcyI6WyJBRE1JTiJdfX0.UEgby4OyASVVYbPQpwJOcYW4ULRD3nES1OxKMQEJXMkY5jhjSCdiE9mk-T_gZ0Ph6NBQKv_EBxoPG1Qb2bb6AA"
    );
  });

  it("test if navigation have proper amount of items", () => {
    cy.get('[data-testid="navigation-buttons-container"] a').should(
      "have.length",
      4
    );
  });

  it("test if navigation have proper names", () => {
    cy.get('[data-testid="navigation-buttons-container"] a').each(
      (item, index) => {
        cy.wrap(item).should("contain.text", EXPECTED_MENU_ITEMS[index]);
      }
    );
  });

  it("test if logged in user has render avatar", () => {
    cy.get('[data-testid="logged-in-user-avatar"]').should("exist");
  });
});
