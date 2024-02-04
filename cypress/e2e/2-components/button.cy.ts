/// <reference types="cypress" />

describe("Button", () => {
  it("renders the button component", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("exist");
  });

  it("renders the button with text", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("exist").and("contain.text", "Next");
  });
});
