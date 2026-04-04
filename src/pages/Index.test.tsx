import { render, screen } from "@testing-library/react";
import App from "@/App";

const setViewport = (width: number) => {
  // jsdom doesn't fully implement layout, but we can at least change
  // the reported viewport width to ensure components mount safely.
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("Homepage (Index route)", () => {
  it("renders all primary homepage sections together", () => {
    render(<App />);

    // Navigation / brand
    expect(screen.getAllByText(/VirelaTech/i).length).toBeGreaterThan(0);

    // Hero content
    expect(
      screen.getByText(/Digital Growth Partner/i)
    ).toBeInTheDocument();

    // Trust strip heading
    expect(
      screen.getByText(/Trusted by industry leaders/i)
    ).toBeInTheDocument();

    // Capabilities section heading
    expect(
      screen.getByText(/What We Do/i)
    ).toBeInTheDocument();

    // About section heading fragment
    expect(
      screen.getByText(/We don’t build campaigns\./i)
    ).toBeInTheDocument();

    // Metrics labels (spot-check one)
    expect(
      screen.getByText(/Projects Delivered/i)
    ).toBeInTheDocument();

    // How it works / framework heading fragment
    expect(
      screen.getByText(/The system behind/i)
    ).toBeInTheDocument();

    // FAQ heading fragment
    expect(
      screen.getByText(/Clear answers\./i)
    ).toBeInTheDocument();

    // Footer brand + nav (brand appears multiple times, so use getAllBy*)
    expect(screen.getAllByText(/VirelaTech/i).length).toBeGreaterThan(0);
    // At least one primary nav link (Home) is present
    expect(
      screen.getAllByRole("link", { name: /Home/i }).length
    ).toBeGreaterThan(0);
  });

  it("renders correctly on mobile, tablet, and desktop widths", () => {
    // mobile ~375px
    setViewport(375);
    render(<App />);
    expect(
      screen.getByText(/Digital Growth Partner/i)
    ).toBeInTheDocument();

    // tablet ~768px
    setViewport(768);
    expect(
      screen.getByText(/Trusted by industry leaders/i)
    ).toBeInTheDocument();

    // desktop ~1440px
    setViewport(1440);
    expect(
      screen.getByText(/Services built for/i)
    ).toBeInTheDocument();
  });

  it("shows theme toggle and allows toggling without crashing", () => {
    render(<App />);

    const toggle = screen.getByRole("button", {
      name: /Switch to/i,
    });

    // initial presence
    expect(toggle).toBeInTheDocument();

    // click a couple of times to ensure it stays stable
    toggle.click();
    toggle.click();

    // hero and nav still present afterwards
    expect(
      screen.getByText(/Digital Growth Partner/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/VirelaTech/i).length).toBeGreaterThan(0);
  });
});

