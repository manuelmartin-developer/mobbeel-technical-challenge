/// <reference types="cypress" />

describe("Stepper", () => {
  it("renders the stepper component", () => {
    cy.visit("/");
    cy.get("[data-testid=stepper]").should("exist");
  });

  it("renders the first step", () => {
    cy.visit("/");
    cy.get("[data-testid=step-1]").should("exist");
  });

  it("renders the next step button", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("exist").and("contain.text", "Next");
  });

  it("renders the next step and changes the active step", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").click();
    cy.get("[data-testid=step-1]")
      .invoke("attr", "class")
      .should("contain", "stepper__step_done");
    cy.get("[data-testid=step-2]")
      .invoke("attr", "class")
      .should("contain", "stepper__step_active");
  });
});
