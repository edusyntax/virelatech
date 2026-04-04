import React from "react";

const BackgroundLayers = () => {
  return (
    <div className="fixed inset-0 -z-[100] pointer-events-none overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-[hsl(var(--background-secondary))]" />

      {/* subtle radial accent glow */}
      <div className="absolute inset-0 radial-accent" />

      {/* noise / grain overlay */}
      <div className="grain" />

      {/* subtle edge vignette for depth */}
      <div className="vignette" />
    </div>
  );
};

export default BackgroundLayers;
