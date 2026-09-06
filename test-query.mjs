import { createClient } from "@insforge/sdk";

const client = createClient({
  baseUrl: "https://2v5tfmzc.ap-southeast.insforge.app",
  anonKey: "ik_c074ab9ccf398203750003e97600ba84",
});

async function main() {
  console.log("Testing select on user_profiles:");
  const res = await client.database.from("user_profiles").select("*").eq("email", "admin@gmail.com");
  console.log("Result:", JSON.stringify(res, null, 2));

  console.log("Testing select all on user_profiles:");
  const resAll = await client.database.from("user_profiles").select("*");
  console.log("Result all:", JSON.stringify(resAll, null, 2));
}

main().catch(console.error);
