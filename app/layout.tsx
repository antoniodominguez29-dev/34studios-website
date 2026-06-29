import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "34Studios | Image as Language",
  description:
    "34Studios is a visual studio for editorial commissions, quiet portraiture and visual narratives shaped by identity, presence and human observation."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
