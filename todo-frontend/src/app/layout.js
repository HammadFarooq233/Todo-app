"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      {
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      }
    </Provider>
  );
}