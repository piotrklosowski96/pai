describe("Test headers and labels in Register page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-rejestracja"]').click();
  });

  it("test if lregister page has header", () => {
    const REGISTER_HEADER = "Zarejestruj się";
    cy.get('[data-testid="register-page-header"]').should(
      "have.text",
      REGISTER_HEADER
    );
  });

  it("test if register page has all labels", () => {
    const REGISTER_LABELS = [
      "Login",
      "Adres email",
      "Hasło",
      "Powtórz hasło",
      "Imię",
      "Nazwisko",
    ];
    cy.get('[data-testid="register-page-form-element"]').within(() => {
      cy.get('[data-testid="register-page-login-label"]')
        .should("be.visible")
        .and("have.text", REGISTER_LABELS[0]);
      cy.get('[data-testid="register-page-email-label"]')
        .should("be.visible")
        .and("have.text", REGISTER_LABELS[1]);
      cy.get('[data-testid="register-page-password-label"]')
        .should("be.visible")
        .and("contain", REGISTER_LABELS[2]);
      cy.get('[data-testid="register-page-repeat-password-label"]')
        .should("be.visible")
        .and("contain", REGISTER_LABELS[3]);
      cy.get('[data-testid="register-page-name-label"]')
        .should("be.visible")
        .invoke("text")
        .and("eq", REGISTER_LABELS[4]);
      cy.get('[data-testid="register-page-last-name-label"]')
        .should("be.visible")
        .invoke("text")
        .and("eq", REGISTER_LABELS[5]);
    });
  });
});

describe("Test validation of register form", () => {
  const INPUT_COUNT = 6;
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-rejestracja"]').click();
  });

  it("test if register form has proper input count", () => {
    cy.get('[data-testid="register-page-form-element"] input').should(
      "have.length",
      INPUT_COUNT
    );
  });

  it("test if register form properly validation email input field", () => {
    cy.get('[data-testid="register-page-login-input-element"]').should(
      "be.visible"
    );
    cy.get('[data-testid="register-page-submit-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-testid="register-page-login-input-element"]:invalid').should(
      "exist"
    );
  });

  it("test if register form properly validation email input field", () => {
    cy.get('[data-testid="register-page-login-input-element"]')
      .should("be.visible")
      .type("example");
    cy.get('[data-testid="register-page-email-input-element"]')
      .should("be.visible")
      .type("example");
    cy.get('[data-testid="register-page-submit-button"]')
      .should("be.visible")
      .click();
    cy.get('[data-testid="register-page-email-input-element"]:invalid').should(
      "exist"
    );
  });

  // it("test if form submit to proper request api url", () => {
  //   cy.get('[data-testid="register-page-login-input-element"]')
  //     .should("be.visible")
  //     .type("example");
  //   cy.get('[data-testid="register-page-email-input-element"]')
  //     .should("be.visible")
  //     .type("example@example.com");
  //   cy.get('[data-testid="register-page-password-input-element"]')
  //     .should("be.visible")
  //     .type("example");
  //   cy.get('[data-testid="register-page-repeat-password-input-element"]')
  //     .should("be.visible")
  //     .type("example");
  //   cy.get('[data-testid="register-page-name-input-element"]')
  //     .should("be.visible")
  //     .type("name");
  //   cy.get('[data-testid="register-page-last-name-input-element"]')
  //     .should("be.visible")
  //     .type("lastName");

  //   cy.get('[data-testid="register-page-submit-button"]').click();
  // });
});
