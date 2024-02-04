import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Switch from "./Switch";

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

describe("Switch", () => {
  it("renders Switch component", () => {
    render(<Switch />);
    expect(screen.getByTestId("theme-switch")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Switch />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should switch theme", () => {
    render(<Switch />);
    const switchButton = screen.getByTestId("theme-switch");
    expect(switchButton).toHaveAttribute("aria-checked", "false");
  });
});
