import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ng.com.lifestyleleverage",
  appName: "ltl",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  cordova: {
    preferences: {
      "android-minSdkVersion": "19",
      "android-targetSdkVersion": "20",
      "android-allowBackup": "false",
      "android-debuggable": "true",
    },
  },
};

export default config;
