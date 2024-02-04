/// <reference types="cypress" />

describe("Camera video", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
    cy.get("[data-testid=button]").click();
  });

  it("renders the video button", () => {
    cy.get("[data-testid=camera-selector-video]").should("exist");
  });

  it("When video button is clicked, it should trigger the camera", () => {
    cy.get("[data-testid=camera-selector-video]").click();
    cy.get("[data-testid=camera-video]").should("exist");
  });

  it("When a video is taken, error toast should be displayed", () => {
    cy.get("[data-testid=camera-selector-video]").click();
    cy.get("[data-testid=camera-video]").should("exist");
    cy.wait(1000);
    cy.get("[data-testid=camera-capture]").click();
    cy.get(".Toastify__toast-body")
      .should("exist")
      .contains("Detecting document");
    cy.wait(20000);
    cy.get(".Toastify__toast-body")
      .should("exist")
      .contains("Document not detected");
  });
});
