import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="flex flex-auto items-center justify-center">
          {children}
        </main>
      </Suspense>
    </>
  );
}
