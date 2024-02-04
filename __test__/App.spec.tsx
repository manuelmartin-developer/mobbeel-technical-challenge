import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../src/App";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test if the App component renders
describe("App", () => {
  it("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Technical Challenge")).toBeInTheDocument();
  });

  it("renders Welcome step", () => {
    render(<App />);
    expect(screen.getByText("Welcome​")).toBeInTheDocument();
  });

  it("renders Welcome description", () => {
    render(<App />);
    expect(
      screen.getByText("Welcome to the document scanner app"),
    ).toBeInTheDocument();
  });

  it("renders Stepper component", () => {
    render(<App />);
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
