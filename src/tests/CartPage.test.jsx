import { describe, it, expect, beforeEach, vi } from "vitest";
import { getByTestId, render, screen } from "@testing-library/react";
import { CartContext, CartContextWrapperTest } from "../contexts/test.context";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { CartPage } from "../components/cartPage/CartPage";

describe("Shows the elements in the cart", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapperTest>
          <CartPage />
        </CartContextWrapperTest>
      </MemoryRouter>,
    );
  });

  it("Shows four elements", () => {
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Cereal")).toBeInTheDocument();
    expect(screen.getByText("Cellphone")).toBeInTheDocument();
    expect(screen.getByText("Chair")).toBeInTheDocument();
  });
});

describe("The buttons works", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CartContextWrapperTest>
          <CartPage />
        </CartContextWrapperTest>
      </MemoryRouter>,
    );
  });

  it("The great and lesser buttons are being pressed and cart circle works", async () => {
    const theButtons = screen.getAllByRole("button");
    const user = userEvent.setup();
    const plusButtons = screen.getAllByRole("button", { name: "+" });
    const minusButtons = screen.getAllByRole("button", { name: "-" });

    //Check the first product (1)
    const plusButtonOne = plusButtons[0];
    const minusButtonOne = minusButtons[0];
    await userEvent.click(plusButtonOne);
    expect(theButtons[1].textContent).toBe("11");
    await userEvent.click(minusButtonOne);
    expect(theButtons[1].textContent).toBe("10");

    //Check the second input (4)
    const plusButtonSecond = plusButtons[1];
    const minusButtonSecond = minusButtons[1];
    for (let i = 0; i < 6; i++) {
      await userEvent.click(plusButtonSecond);
    }
    expect(theButtons[4].textContent).toBe("36");
    await userEvent.click(minusButtonSecond);
    expect(theButtons[4].textContent).toBe("35");

    //Check the last input (10)
    const plusButtonEnd = plusButtons[3];
    const minusButtonEnd = minusButtons[3];
    for (let i = 0; i < 3; i++) {
      await userEvent.click(plusButtonEnd);
    }
    expect(theButtons[10].textContent).toBe("23");
    for (let i = 0; i < 2; i++) {
      await userEvent.click(minusButtonEnd);
    }
    expect(theButtons[10].textContent).toBe("21");

    expect(screen.getByTestId("cartCircle").textContent).toBe("106");
  });

  it("The total count does not go higher than 200", async () => {
    const theButtons = screen.getAllByRole("button");
    const user = userEvent.setup();
    const plusButtons = screen.getAllByRole("button", { name: "+" });
    const minusButtons = screen.getAllByRole("button", { name: "-" });

    //Check the first product (1)
    const plusButtonOne = plusButtons[0];
    const minusButtonOne = minusButtons[0];
    for (let i = 0; i < 50; i++) {
      await userEvent.click(plusButtonOne);
    }

    //Check the third input (7)
    const plusButtonThird = plusButtons[2];
    const minusButtonThird = minusButtons[2];
    for (let i = 0; i < 60; i++) {
      await userEvent.click(plusButtonThird);
    }

    //Check the last input (10)
    const plusButtonEnd = plusButtons[3];
    const minusButtonEnd = minusButtons[3];
    for (let i = 0; i < 3; i++) {
      await userEvent.click(plusButtonEnd);
    }

    expect(theButtons[1].textContent).toBe("60");
    expect(theButtons[4].textContent).toBe("30");
    expect(theButtons[7].textContent).toBe("90");
    expect(theButtons[10].textContent).toBe("20");
    expect(screen.getByTestId("cartCircle").textContent).toBe("200");
  });

  it("The element disappear when reaching zero", async () => {
    const theDivs = screen.getAllByTestId("Element");
    const user = userEvent.setup();
    const minusButtons = screen.getAllByRole("button", { name: "-" });

    //Check the first product (1)
    const minusButtonOne = minusButtons[0];
    for (let i = 0; i < 10; i++) {
      await userEvent.click(minusButtonOne);
    }

    //Check the second input (4)
    const minusButtonSecond = minusButtons[1];
    for (let i = 0; i < 30; i++) {
      await userEvent.click(minusButtonSecond);
    }

    //Check the third input (7)
    const minusButtonThird = minusButtons[2];
    for (let i = 0; i < 40; i++) {
      await userEvent.click(minusButtonThird);
    }

    //Check the last input (10)
    const minusButtonEnd = minusButtons[3];
    for (let i = 0; i < 20; i++) {
      await userEvent.click(minusButtonEnd);
    }

    expect(theDivs[0]).toHaveStyle("display: none");
    expect(theDivs[1]).toHaveStyle("display: none");
    expect(theDivs[2]).toHaveStyle("display: none");
    expect(theDivs[3]).toHaveStyle("display: none");
  });

  it("The trash can image works", async () => {
    const theDivs = screen.getAllByTestId("Element");
    const theButtons = screen.getAllByRole("button");
    const trashCans = screen.getAllByAltText("A trash Can");
    const user = userEvent.setup();

    //Check the first product (1)
    const trashCanOne = trashCans[0];
    await userEvent.click(trashCanOne);

    expect(theDivs[0]).toHaveStyle("display: none");
    expect(theButtons[1].textContent).toBe("0");
    expect(screen.getByTestId("cartCircle").textContent).toBe("90");

    //Check the second input (4)
    const trashCanTwo = trashCans[1];
    await userEvent.click(trashCanTwo);

    expect(theDivs[1]).toHaveStyle("display: none");
    expect(theButtons[4].textContent).toBe("0");
    expect(screen.getByTestId("cartCircle").textContent).toBe("60");

    //Check the third input (7)
    const trashCanThree = trashCans[2];
    await userEvent.click(trashCanThree);

    expect(theDivs[2]).toHaveStyle("display: none");
    expect(theButtons[7].textContent).toBe("0");
    expect(screen.getByTestId("cartCircle").textContent).toBe("20");

    //Check the last input (10)
    const trashCanFour = trashCans[3];
    await userEvent.click(trashCanFour);

    expect(theDivs[3]).toHaveStyle("display: none");
    expect(theButtons[10].textContent).toBe("0");
    expect(screen.getByTestId("cartCircle")).toHaveStyle("display: none");
  });
});

// screen.getByRole('');
