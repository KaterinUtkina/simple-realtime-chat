"use client";
import { Provider } from "react-redux";
import { store } from "@/app/shared/store";
import { ThemeProvider } from "@/app/ThemeContext";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
