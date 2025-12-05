import { PropsWithChildren } from "react";
import { outfit } from "@/lib/font.utils";
import TanstackProvider from "@/providers/TanstackProvider";

import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={` ${outfit.className} antialiased`}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
