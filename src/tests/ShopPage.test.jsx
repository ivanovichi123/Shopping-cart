//Checar que el cicrulo del navbar cambie en base a los cambios que se hagan
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext, CartContextWrapper } from "../contexts/cart.context";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { ShopPage } from "../components/shopPage/ShopPage";

describe("Check if some components render correctly", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("Has a heading", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("Heading has a shop title", () => {
    let theHeading = screen.getByRole("heading");
    console.log(theHeading);
    expect(theHeading.textContent).toBe("Shop");
  });

  it("Nav Bar is present", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("Footer is present", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

describe("The API works", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("The API returns a json", async () => {
    const response = await fetch("https://fakestoreapi.com/products/1");
    const contentType = response.headers.get("content-type");
    expect(contentType).toContain("application/json");
    const theAnotherResponse = await response.json();
    expect(theAnotherResponse.title).toBe(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    );
  });
});

describe("The text an image change after the API resolves", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("The text changes", async () => {
    expect(
      screen.queryByText("Mens Casual Premium Slim Fit T-Shirts"),
    ).toBeNull();
    expect(
      screen.queryByText("DANVOUY Womens T Shirt Casual Cotton Short"),
    ).toBeNull();
    expect(
      await screen.findByText("Mens Casual Premium Slim Fit T-Shirts"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("DANVOUY Womens T Shirt Casual Cotton Short"),
    ).toBeInTheDocument();
  });

  it("The image changes", async () => {
    expect(screen.queryByAltText("I am Mens Cotton Jacket")).toBeNull();
    expect(screen.queryByAltText("I am Mens Casual Slim Fit")).toBeNull();
    expect(
      await screen.findByAltText("I am Mens Cotton Jacket"),
    ).toBeInTheDocument();
    expect(
      await screen.findByAltText("I am Mens Casual Slim Fit"),
    ).toBeInTheDocument();
  });
});

describe("The greater and lesser buttons work", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("The great and lesser buttons are being pressed", async () => {
    const user = userEvent.setup();
    const theInputs = screen.getAllByRole("textbox");
    const plusButtons = screen.getAllByRole("button", { name: "+" });
    const minusButtons = screen.getAllByRole("button", { name: "-" });

    //Check the first input (0)
    const inputOne = theInputs[0];
    const plusButtonOne = plusButtons[0];
    const minusButtonOne = minusButtons[0];
    await userEvent.click(plusButtonOne);
    expect(inputOne).toHaveValue("1");
    await userEvent.click(minusButtonOne);
    expect(inputOne).toHaveValue("0");

    //Check the middle input (5)
    const inputMiddle = theInputs[5];
    const plusButtonMiddle = plusButtons[5];
    const minusButtonMiddle = minusButtons[5];
    for (let i = 0; i < 6; i++) {
      await userEvent.click(plusButtonMiddle);
    }
    expect(inputMiddle).toHaveValue("6");
    await userEvent.click(minusButtonMiddle);
    expect(inputMiddle).toHaveValue("5");

    //Check the last input (11)
    const inputEnd = theInputs[11];
    const plusButtonEnd = plusButtons[11];
    const minusButtonEnd = minusButtons[11];
    for (let i = 0; i < 3; i++) {
      await userEvent.click(plusButtonEnd);
    }
    expect(inputEnd).toHaveValue("3");
    for (let i = 0; i < 2; i++) {
      await userEvent.click(minusButtonEnd);
    }
    expect(inputEnd).toHaveValue("1");
  });
});

describe("The input field works", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("The input receives different values", async () => {
    const user = userEvent.setup();
    const theInputs = screen.getAllByRole("textbox");

    //Check the first input (0)
    const theInputOne = theInputs[0];
    await userEvent.type(theInputOne, "125");
    expect(theInputOne).toHaveValue("125");

    //Check the middle input (5)
    const theInputMiddle = theInputs[5];
    await userEvent.type(theInputMiddle, "34");
    expect(theInputMiddle).toHaveValue("34");

    //Check the last input (11)
    const theInputEnd = theInputs[11];
    await userEvent.type(theInputEnd, "189");
    expect(theInputEnd).toHaveValue("189");
  });

  it("The input receives not acceptable values", async () => {
    const user = userEvent.setup();
    const theInputs = screen.getAllByRole("textbox");

    //Check the first input (0)
    const theInputOne = theInputs[0];
    await userEvent.type(theInputOne, "300");
    expect(theInputOne).toHaveValue("200");

    //Check the middle input (5)
    const theInputMiddle = theInputs[5];
    await userEvent.type(theInputMiddle, "-25");
    expect(theInputMiddle).toHaveValue("25");

    //Check the last input (11)
    const theInputEnd = theInputs[11];
    await userEvent.type(theInputEnd, "A");
    expect(theInputEnd).toHaveValue("0");
  });
});

describe("The cart image gets a circle with the number of items", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapper>
          <ShopPage />
        </CartContextWrapper>
      </MemoryRouter>,
    );
  });

  it("Add items to the cart", async () => {
    const user = userEvent.setup();
    const theInputs = screen.getAllByRole("textbox");
    const theButtons = screen.getAllByRole("button", { name: "Add to cart" });

    expect(screen.getByRole("img", { name: "A cart" })).toBeInTheDocument();
    const theInputOne = theInputs[0];
    const theInputTwo = theInputs[5];
    await userEvent.type(theInputOne, "43");
    await userEvent.type(theInputTwo, "17");

    const theButtonOne = theButtons[0];
    const theButtonTwo = theButtons[5];
    const theButtonThree = theButtons[2];
    await userEvent.click(theButtonOne);
    await userEvent.click(theButtonTwo);
    await userEvent.click(theButtonThree);

    expect(await screen.findByText("60")).toBeInTheDocument();
  });

  it("The Cart stays at 200 and disappears at 0", async () => {
    const user = userEvent.setup();
    const theInputs = screen.getAllByRole("textbox");
    const theButtons = screen.getAllByRole("button", { name: "Add to cart" });

    expect(screen.getByTestId("cartCircle")).toHaveStyle("display: none");
    const theInputOne = theInputs[3];
    const theInputTwo = theInputs[4];
    await userEvent.type(theInputOne, "100");
    await userEvent.type(theInputTwo, "100");
    const theButtonOne = theButtons[3];
    const theButtonTwo = theButtons[4];
    await userEvent.click(theButtonOne);
    await userEvent.click(theButtonTwo);
    expect(await screen.findByText("200")).toBeInTheDocument();

    const theInputThree = theInputs[5];
    await userEvent.type(theInputThree, "100");
    const theButtonThree = theButtons[5];
    await userEvent.click(theButtonThree);
    expect(await screen.findByText("200")).toBeInTheDocument();
  });
});
