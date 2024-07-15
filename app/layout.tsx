import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Dark Ambient Writer</title>
        <meta
          name="description"
          content="A minimalist writing app with dark ambient aesthetics"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} bg-gray-900 text-gray-300 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
