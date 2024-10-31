"use client";

import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useRouter } from "next/navigation";
import { PluginListenerHandle } from "@capacitor/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const setupBackButtonListener = async () => {
      const backButtonListener = await CapacitorApp.addListener(
        "backButton",
        ({ canGoBack }) => {
          if (canGoBack) {
            router.back();
          } else {
            // Exit the app if there’s no navigation history
            CapacitorApp.exitApp();
          }
        }
      );

      return backButtonListener;
    };

    let backButtonListenerHandle: PluginListenerHandle;
    setupBackButtonListener().then((handle) => {
      backButtonListenerHandle = handle;
    });

    return () => {
      if (backButtonListenerHandle) {
        backButtonListenerHandle.remove();
      }
    };
  }, [router]);

  return <div className="w-full h-full">{children}</div>;
}
