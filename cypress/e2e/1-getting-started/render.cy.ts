/// <reference types="cypress" />

describe("Mobbeel App renders", () => {
  it("renders learn react link", () => {
    cy.visit("/");
    cy.get("body").should(
      "contain.text",
      "Welcome to the document scanner app",
    );
  });
});
