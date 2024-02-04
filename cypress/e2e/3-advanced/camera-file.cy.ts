/// <reference types="cypress" />
import "cypress-file-upload";

describe("Camera file", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
    cy.get("[data-testid=button]").click();
  });
  it("renders the file button", () => {
    cy.get("[data-testid=camera-selector-file]").should("exist");
  });

  it("triggers the input", () => {
    cy.get("[data-testid=camera-selector-file]").click();
    cy.get("[data-testid=camera-input]").should("exist");
  });

  it.skip("When a correct file is selected, it should be uploaded and displayed", () => {
    cy.get("[data-testid=camera-input]").should("exist");
    cy.get("[data-testid=camera-input]").attachFile("DNI-V3-front.jpg");
    cy.wait(1000);
    cy.get("[data-testid=detected-front-document]").should("exist");
    cy.get("[data-testid=camera-refresh]").should("exist");
  });

  it.skip("When a correct file is selected, it should be uploaded and displayed. If refresh button is clicked, the image should be removed and the video should be playing again", () => {
    cy.get("[data-testid=camera-input]").should("exist");
    cy.get("[data-testid=camera-input]").attachFile("DNI-V3-front.jpg");
    cy.wait(1000);
    cy.get("[data-testid=detected-front-document]").should("exist");
    cy.get("[data-testid=camera-refresh]").should("exist").click();
    cy.get("[data-testid=detected-front-document]").should("not.exist");
    cy.get("[data-testid=camera-refresh]").should("not.exist");
  });

  it("When an incorrect file is selected, it should not be uploaded and displayed", () => {
    cy.get("[data-testid=camera-input]").should("exist");
    cy.get("[data-testid=camera-input]").attachFile("DNI-INVALID");
    cy.wait(1000);
    cy.get("[data-testid=detected-front-document]").should("not.exist");
  });
});
