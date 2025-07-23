import { memo } from "react";

const Layout = memo(function Layout({
  headerChildren,
  children,
}: Readonly<{
  headerChildren: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow absolute w-full z-10 h-20 text-gray-900 dark:text-gray-100">
        {headerChildren}
      </header>
      <main className="bg-gray-100 dark:bg-gray-900 pt-20 h-full text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </>
  );
});

export default Layout;
