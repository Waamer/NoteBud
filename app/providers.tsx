"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <OtherProviders>{children}</OtherProviders>
    </ThemeProvider>
  );
}

function OtherProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const appearance = {
    baseTheme: resolvedTheme === "dark" ? dark : undefined,
    variables: { colorPrimary: '#e11d48' },
    signIn: {
      baseTheme: resolvedTheme === "dark" ? dark : undefined,
      variables: { colorPrimary: '#e11d48' }
    }
  };

  return (
    <ClerkProvider
      appearance={appearance}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}