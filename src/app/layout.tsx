import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Models AI — AI Platform for the Modelling Industry",
  description:
    "AI-powered platform for models, photographers, agencies and scouts. Typology analysis, agency verification, talent search — all in one place.",
  keywords: [
    "modeling agency",
    "model AI",
    "fashion platform",
    "photographer search",
    "model typology",
    "agency verification",
  ],
  openGraph: {
    title: "Models AI",
    description: "The AI platform built for fashion professionals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
