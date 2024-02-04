/// <reference types="cypress" />

describe("Camera renders", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=button]").click();
  });
  it("renders the camera component", () => {
    cy.get("[data-testid=step-2]").should("exist");
    cy.get("[data-testid=camera]").should("exist");
  });
  it("renders the selector", () => {
    cy.get("[data-testid=camera-selector]").should("exist");
  });
  it("renders the selector buttons", () => {
    cy.get("[data-testid=camera-selector]")
      .find("button")
      .should("have.length", 3);
  });
});
