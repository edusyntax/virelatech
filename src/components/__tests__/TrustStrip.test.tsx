import { render, screen } from "@testing-library/react";
import TrustStrip from "@/components/TrustStrip";

describe("TrustStrip", () => {
  it("renders trust heading and logos", () => {
    render(<TrustStrip />);

    expect(
      screen.getByText(/Trusted by industry leaders/i)
    ).toBeInTheDocument();

    // spot check a few logo labels (duplicated for marquee, so use getAllBy*)
    const nvidia = screen.getAllByText(/NVIDIA/i);
    expect(nvidia.length).toBeGreaterThan(0);
  });
});

