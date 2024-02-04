/// <reference types="cypress" />

describe("Switch Theme", () => {
  it("switches the theme", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        // Set prefers-color-scheme to light
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: false,
            addEventListener: () => {},
            removeEventListener: () => {},
          });
      },
    });
    cy.get("[data-testid=theme-switch]").should("exist").click();
    cy.get("body").should("have.attr", "data-theme", "dark");
  });

  it("switches the theme back", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        // Set prefers-color-scheme to dark
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: true,
            addEventListener: () => {},
            removeEventListener: () => {},
          });
      },
    });
    cy.get("[data-testid=theme-switch]").should("exist").click();
    cy.get("body").should("have.attr", "data-theme", "light");
  });

  it("saves theme to localStorage", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("theme", "dark");
      },
    });
    cy.get("[data-testid=theme-switch]").should("exist").click();
    cy.get("body").should("have.attr", "data-theme", "light");
    cy.getAllLocalStorage().then((result) => {
      console.log(result);
      expect(result).to.deep.equal({
        "http://localhost:5173": {
          theme: "light",
        },
      });
    });
  });

  it("loads theme from localStorage", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("theme", "dark");
      },
    });
    cy.get("[data-testid=theme-switch]").should("exist");
    cy.get("body").should("have.attr", "data-theme", "dark");
  });

  it("loads theme from localStorage and switches it", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("theme", "dark");
      },
    });
    cy.get("[data-testid=theme-switch]").should("exist").click();
    cy.get("body").should("have.attr", "data-theme", "light");
  });
});
