import type { Metadata } from "next";
import "@/app/globals.css";
import ClientProvider from "@/app/ClientProvider";
import StyledComponentsRegistry from "@/app/StyledComponentsRegistry";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Chat",
  description: "Simple realtime chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased m-0 p-0 min-w-[375px] h-full"}>
        <AntdRegistry>
          <StyledComponentsRegistry>
            <ClientProvider>
              <div className={"h-full overflow-hidden"}>
                <div className={"h-full relative"}>{children}</div>
              </div>
            </ClientProvider>
          </StyledComponentsRegistry>
        </AntdRegistry>
      </body>
    </html>
  );
}
