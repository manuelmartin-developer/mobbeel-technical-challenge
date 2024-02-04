/// <reference types="cypress" />

describe("Layout", () => {
  it("renders the layout component", () => {
    cy.visit("/");
    cy.get("main").should("exist");
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
