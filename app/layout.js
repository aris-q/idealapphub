import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "IdealAppHub",
  description: "Your hub for ideal apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
