/// <reference types="cypress" />

describe("Header", () => {
  it("renders the header", () => {
    cy.visit("/");
    cy.get("[data-testid=header]").should("exist");
  });

  it("renders the logo", () => {
    cy.visit("/");
    cy.get("[data-testid=logo]")
      .should("exist")
      .and("have.attr", "src")
      .and("contain", "mobbeel-logo.png");
  });

  it("renders the title", () => {
    cy.visit("/");
    cy.get("[data-testid=title]")
      .should("exist")
      .and("contain.text", "Technical Challenge");
  });

  it("renders the theme switch", () => {
    cy.visit("/");
    cy.get("[data-testid=theme-switch]").should("exist");
  });
});
