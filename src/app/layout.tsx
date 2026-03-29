import type { Metadata } from "next";

import "./globals.css";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
