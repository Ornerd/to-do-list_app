import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";

// Use production URL
const convexUrl = "https://hip-yak-107.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Slot />
    </ConvexProvider>
  );
}