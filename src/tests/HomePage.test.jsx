import { describe, it, expect, beforeEach} from "vitest"
import { render, screen } from "@testing-library/react"

import { HomePage } from "../components/homePage/HomePage"

describe("Home Page component", () => {
    beforeEach(() => {
        render(<HomePage />);
    });

    it("Has a title", () => {
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("Has an image", () => {
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("Has footer text", () => {
        expect(screen.getByText("Enjoy the page")).toBeInTheDocument();
    });
});
//Read this https://www.robinwieruch.de/react-testing-library/