import "./globals.css";

export const metadata = {
  title: "IdealAppHub",
  description: "Your hub for ideal apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}