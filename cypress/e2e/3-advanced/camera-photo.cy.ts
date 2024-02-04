/// <reference types="cypress" />

describe("Camera photo", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
    cy.get("[data-testid=button]").click();
  });

  it("renders the photo button", () => {
    cy.get("[data-testid=camera-selector-photo]").should("exist");
  });

  it("When photo button is clicked, it should trigger the camera", () => {
    cy.get("[data-testid=camera-selector-photo]").click();
    cy.get("[data-testid=camera-video]").should("exist");
  });

  it("When a photo is taken, error toast should be displayed", () => {
    cy.get("[data-testid=camera-selector-photo]").click();
    cy.get("[data-testid=camera-video]").should("exist");
    cy.wait(1000);
    cy.get("[data-testid=camera-capture]").click();
    cy.wait(1000);
    cy.get(".Toastify__toast-body")
      .should("exist")
      .contains("Document not detected");
  });
});
