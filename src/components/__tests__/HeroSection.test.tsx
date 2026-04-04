import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("renders hero headline, subcopy, and CTAs", () => {
    render(<HeroSection />);

    expect(
      screen.getByText(/Digital Growth Partner/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We help startups and brands grow/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Get Free Strategy/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /View Case Studies/i })
    ).toBeInTheDocument();
  });
});


