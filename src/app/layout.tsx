// import "./globals.css";

import { Providers } from "./redux/provider";


export const metadata = {
  title: "Weather App",
  description: "An app to check the weather",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
