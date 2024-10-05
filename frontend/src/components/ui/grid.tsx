import React, { ReactNode } from 'react';

interface GridBackgroundProps {
  children: ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Grid background */}
      <div className="fixed inset-0 h-full w-full dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.5]" />
      
      {/* Radial gradient overlay */}
        <div className="fixed pointer-events-none inset-0 dark:bg-black/100 bg-white/100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Vignette effect for white mode */}
        <div className="fixed pointer-events-none inset-0 bg-black/30 dark:bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Content */}
      <div className="relative z-20 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default GridBackground;