import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("renders Header component", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<Header />);
    expect(screen.getByAltText("MobbScan")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Header />);
    expect(screen.getByText("Technical Challenge")).toBeInTheDocument();
  });

  it("renders ThemeSwitch", () => {
    render(<Header />);
    expect(screen.getByTestId("theme-switch")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with dark theme", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with light theme", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
