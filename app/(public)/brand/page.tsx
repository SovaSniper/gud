import { ColourPaletteSection } from "@/components/public/brand/grayscale";

const grayscaleClasses = [
  "bg-grayscale-000",
  "bg-grayscale-025",
  "bg-grayscale-050",
  "bg-grayscale-100",
  "bg-grayscale-200",
  "bg-grayscale-250",
  "bg-grayscale-300",
  "bg-grayscale-325",
  "bg-grayscale-350",
];

const brandColours = [
  "bg-primary",
  "bg-secondary",
  "bg-accent"
];

export default async function Page() {
  return (
    <div>
      <div>BRAND KIT</div>

      <ColourPaletteSection colours={brandColours} />

      <ColourPaletteSection colours={grayscaleClasses} />

    </div>
  )
}