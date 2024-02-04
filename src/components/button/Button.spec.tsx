import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders Button component", () => {
    render(<Button text="Button" onClick={() => null} />);
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });

  it("renders text", () => {
    render(<Button text="Button" onClick={() => null} />);
    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with disabled", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} disabled />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with iconButton", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} iconButton />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with width", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} width="100px" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with height", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} height="100px" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with selected", () => {
    const { asFragment } = render(
      <Button text="Button" onClick={() => null} selected />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
