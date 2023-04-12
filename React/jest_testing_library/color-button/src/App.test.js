import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color, and updated when clicked", () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //  expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toHaveTextContent(
    "Change to Medium Violet Red"
  );
});

test("initial conditions", () => {
  render(<App />);
  // check that the button starts out enabled
  const colorButton = screen.getByRole("button");
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disableds button on first click and enables on second click", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background and reverts to MediumVioletRed", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: MediumVioletRed");
});

test("Clicked disabled button has gray background and reverts to MidnightBlue", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disabled button" });

  fireEvent.click(colorButton);

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: MidnightBlue");
});

describe("spaces before camel-case capital letters", () => {
  // 카멜 케이스 대문자 앞에 공백을 삽입
  test("Works for no innter capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one innter capital letters", () => {
    expect(replaceCamelWithSpaces("MidenightBlue")).toBe("Midenight Blue");
  });
  test("Works for multiple innter capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
