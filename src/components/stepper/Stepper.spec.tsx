import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Stepper from "./Stepper";

describe("Stepper", () => {
  it("renders Stepper component", () => {
    render(
      <Stepper>
        <div>Step 1</div>
        <div>Step 2</div>
      </Stepper>,
    );
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Stepper>
        <div>Step 1</div>
        <div>Step 2</div>
      </Stepper>,
    );
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Stepper>
        <div>Step 1</div>
        <div>Step 2</div>
      </Stepper>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
