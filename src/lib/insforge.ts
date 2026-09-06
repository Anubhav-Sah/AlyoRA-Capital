import { createClient } from "@insforge/sdk";

export const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || "https://2v5tfmzc.ap-southeast.insforge.app",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_c074ab9ccf398203750003e97600ba84",
});
