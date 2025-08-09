"use client"

import { useEffect, useState } from "react";

interface ColourPaletteSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  colours: string[]
}

export function ColourPaletteSection({ colours }: ColourPaletteSectionProps) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const newColors = colours.map((cls) => {
      const el = document.createElement("div");
      el.className = cls;
      document.body.appendChild(el);
      const color = getComputedStyle(el).backgroundColor;
      document.body.removeChild(el);
      return color;
    });
    setColors(newColors);
  }, []);

  return (
    <div className="flex gap-2">
      {colours.map((cls, i) => (
        <div key={i} className={`size-32 ${cls} rounded-lg`}>
          <div className="text-xs text-center">{colors[i]}</div>
        </div>
      ))}
    </div>
  );
}
