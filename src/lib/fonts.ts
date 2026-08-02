import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";

/**
 * Cool, contemporary type stack:
 * Bricolage Grotesque — distinctive display (craft signal)
 * Onest — clean modern body
 * JetBrains Mono — technical captions/code
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const fontVariables = [
  bricolage.variable,
  onest.variable,
  jetbrainsMono.variable,
].join(" ");
