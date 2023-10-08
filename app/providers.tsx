// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <NextUIProvider>
        <SaasProvider>{children}</SaasProvider>
      </NextUIProvider>
    </CacheProvider>
  );
}
