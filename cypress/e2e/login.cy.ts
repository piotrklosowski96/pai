describe("Test headers and labels in Login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if login page has header", () => {
    cy.get('[data-testid="login-page-header"]').should(
      "have.text",
      "Logowanie"
    );
  });

  it("test if login page has email label", () => {
    cy.get('[data-testid="login-page-email-label"]').should(
      "have.text",
      "Adres email"
    );
  });

  it("test if login page has password label", () => {
    cy.get('[data-testid="login-page-password-label"]').should(
      "have.text",
      "Hasło"
    );
  });
});

describe("Test if link forgot password works properly", () => {
  const CLASSES = {
    font: "font-semibold",
    text: "text-indigo-600",
    hover: "hover:text-indigo-500",
  };
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if login page has password label and it is link", () => {
    cy.get('[data-testid="login-page-forgot-password-link"]')
      .should("be.visible")
      .and("have.attr", "href");
  });

  it("test if login page has password label and has proper text", () => {
    cy.get('[data-testid="login-page-forgot-password-link"]')
      .should("be.visible")
      .and("have.text", "Zapomniałeś swojego hasła?");
  });

  it("test if password label  has proper classes", () => {
    cy.get('[data-testid="login-page-forgot-password-link"]')
      .should("have.class", CLASSES.font)
      .and("have.class", CLASSES.hover)
      .and("have.class", CLASSES.text);
  });
});

describe("Test login buttons in Login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if login page displays proper amount of buttons", () => {
    cy.get('[data-testid="login-page-main-container"]')
      .find("button")
      .should("have.length", 3);
  });
});

describe("Test google login button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if button displays proper name", () => {
    const GOOGLE_BUTTON_LABEL = "Zaloguj przez Google";
    cy.get('[data-testid="login-page-google-login-button"]')
      .should("be.visible")
      .and("have.text", GOOGLE_BUTTON_LABEL);
  });

  it("test if google button redirect to proper link", () => {
    cy.intercept("GET", "**/google*").as("googleAuth");
    cy.get('[data-testid="login-page-google-login-button"]').click();
    cy.wait("@googleAuth").its("request.url").should("include", "google");
    cy.visit("http://localhost:5173/");
  });
});

describe("Test login form in Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if form renders properly", () => {
    cy.get('[data-testid="login-page-form-element"]')
      .should("be.visible")
      .within(() => {
        cy.get('[data-testid="login-page-email-label"]').should("be.visible");
        cy.get('[data-testid="login-page-email-input-element"]').should(
          "be.visible"
        );
        cy.get('[data-testid="login-page-password-label"]').should(
          "be.visible"
        );
        cy.get('[data-testid="login-page-forgot-password-link"]').should(
          "be.visible"
        );
        cy.get('[data-testid="login-page-password-input-element"]').should(
          "be.visible"
        );
        cy.get('[data-testid="login-page-login-button"]').should("be.visible");
      });
  });

  it("test if email input element has proper value after type email", () => {
    cy.get('[data-testid="login-page-email-input-element"]')
      .type("exampleEmail@example.com")
      .should("have.value", "exampleEmail@example.com");
  });

  it("test if email input element has proper value after type email", () => {
    cy.get('[data-testid="login-page-password-input-element"]')
      .type("password")
      .should("have.value", "password");
  });

  it("test if form validation works without login input", () => {
    cy.get('[data-testid="login-page-password-input-element"]').type(
      "password"
    );
    cy.get('[data-testid="login-page-login-button"]').click();
    cy.get('[data-testid="login-page-email-input-element"]:invalid').should(
      "exist"
    );
  });

  it("test if form validation works without login input", () => {
    cy.get('[data-testid="login-page-email-input-element"]').type(
      "exampleEmail@example.com"
    );
    cy.get('[data-testid="login-page-login-button"]').click();
    cy.get('[data-testid="login-page-password-input-element"]:invalid').should(
      "exist"
    );
  });

  it("test if is proper callback page after login", () => {
    cy.get('[data-testid="login-page-email-input-element"]').type(
      "administrator@wawel.pl"
    );
    cy.get('[data-testid="login-page-password-input-element"]').type(
      "administrator"
    );
    cy.get('[data-testid="login-page-login-button"]').click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("test if form submit to proper request api url", () => {
    cy.intercept("POST", "**/login").as("loginRequest");
    cy.get('[data-testid="login-page-email-input-element"]').type(
      "administrator@wawel.pl"
    );
    cy.get('[data-testid="login-page-password-input-element"]').type(
      "administrator"
    );
    cy.get('[data-testid="login-page-login-button"]').click();
    cy.wait("@loginRequest")
      .its("request.url")
      .should("eq", "http://localhost:8080/api/v1/auth/login");
  });
});

describe("Test facebook login button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="navigation-button-logowanie"]').click();
  });

  it("test if button displays proper name", () => {
    const FACEBOOK_BUTTON_LABEL = "Zaloguj przez Facebook";

    cy.get('[data-testid="login-page-facebook-login-button"]')
      .should("be.visible")
      .and("have.text", FACEBOOK_BUTTON_LABEL);
  });

  it("test if facebook button redirect to proper link", () => {
    cy.intercept("GET", "**/dialog/oauth*", (req) => {
      expect(req.url).contain("facebook");
    });
    cy.get('[data-testid="login-page-facebook-login-button"]').click();
    // cy.visit("http://localhost:5173/");
  });
});
