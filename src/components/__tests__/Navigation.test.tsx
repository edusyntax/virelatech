import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "@/components/Navigation";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

describe("Navigation", () => {
  const renderNav = () =>
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

  it("renders primary navigation links", () => {
    renderNav();

    expect(screen.getByText(/VirelaTechZ/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Testimonials/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Blog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument();
  });

  it("renders theme toggle button in the header", () => {
    renderNav();

    const toggle = screen.getByRole("button", {
      name: /Switch to light mode/i,
    });

    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
  });
});

