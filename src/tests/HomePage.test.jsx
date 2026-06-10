import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext } from "../contexts/cart.context";
import { MemoryRouter } from "react-router";

import { HomePage } from "../components/homePage/HomePage";

describe("Home Page component", () => {
  beforeEach(() => {
    const mockValues = {
      cartNumber: 0,
      setCartNumber: vi.fn(),
      cartItemList: [],
      setCartItemList: vi.fn(),
    };
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockValues}>
          <HomePage />
        </CartContext.Provider>
      </MemoryRouter>,
    );
  });

  it("Has a title", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("Has an image", () => {
    let images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("Has footer text", () => {
    expect(screen.getByText("Enjoy the page")).toBeInTheDocument();
  });
});

//Usar el real
// import { render } from "@testing-library/react";
// import MiComponente from "./MiComponente";
// import { CartContextWrapper } from "../context/CartContext";

// test("renderiza correctamente", () => {
//   render(
//     <CartContextWrapper>
//       <MiComponente />
//     </CartContextWrapper>
//   );
// });

//Mockear
// import { render } from "@testing-library/react";
// import { CartContext } from "../context/CartContext";
// import MiComponente from "./MiComponente";

// const mockContext = {
//   cartNumber: 5,
//   setCartNumber: vi.fn(),
//   cartItemList: [
//     {
//       Name: "Producto Test",
//       Key: 1,
//       Quantity: 3,
//       Img: "test-image",
//     },
//   ],
//   setCartItemList: vi.fn(),
// };

// test("usa datos del contexto", () => {
//   render(
//     <CartContext.Provider value={mockContext}>
//       <MiComponente />
//     </CartContext.Provider>
//   );
// });
