/// <reference types="cypress" />

describe("Mobbeel App renders", () => {
  it("renders main text", () => {
    cy.visit("/");
    cy.get("body").should(
      "contain.text",
      "Welcome to the document scanner app",
    );
  });

  it("renders the header", () => {
    cy.visit("/");
    cy.get("[data-testid=header]").should("exist");
  });

  it("renders the stepper component", () => {
    cy.visit("/");
    cy.get("[data-testid=stepper]").should("exist");
  });

  it("renders next step button", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("exist").and("contain.text", "Next");
  });
});
