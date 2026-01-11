#!/usr/bin/env node
/* eslint-env node */
/**
 * Provision a Supabase Auth user (Admin API) so magic-link sign-in can work
 * even when client-side signups are disabled.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/provision_auth_user.js <email>
 *
 * Or provision all family members:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/provision_auth_user.js --all
 *
 * Env:
 *   SUPABASE_URL or VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (DO NOT commit)
 */

import { createClient } from "@supabase/supabase-js";
import process from "node:process";

// Family members to provision
const FAMILY_EMAILS = [
  "italgalpal@gmail.com",
  "mikaelahostetler@gmail.com",
  "gunnarguy@me.com",
];

const arg = (process.argv[2] || "").trim().toLowerCase();
const provisionAll = arg === "--all";
const singleEmail = provisionAll ? null : arg;

if (!singleEmail && !provisionAll) {
  console.error("Usage: node scripts/provision_auth_user.js <email>");
  console.error("       node scripts/provision_auth_user.js --all");
  process.exit(1);
}

const loadDotEnvFile = async (relativePath) => {
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const envPath = path.resolve(process.cwd(), relativePath);
    if (!fs.existsSync(envPath)) return;

    const raw = fs.readFileSync(envPath, "utf8");
    raw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const eq = trimmed.indexOf("=");
      if (eq <= 0) return;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] == null) {
        process.env[key] = value;
      }
    });
  } catch {
    // Best-effort only.
  }
};

await loadDotEnvFile(".env.local");
await loadDotEnvFile(".env");

// Use the same Supabase URL as the app
const url =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://miihwxxgqyyotptiihej.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  console.error("");
  console.error(
    "Get it from: https://supabase.com/dashboard/project/miihwxxgqyyotptiihej/settings/api"
  );
  console.error("Look for 'service_role' key (NOT the anon key!)");
  console.error("");
  console.error("Run like this:");
  console.error(
    "  SUPABASE_SERVICE_ROLE_KEY='your-key-here' node scripts/provision_auth_user.js --all"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function provisionUser(email) {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {},
    });

    if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("already") && msg.includes("registered")) {
        console.log(`✅ ${email} - already exists (good!)`);
        return true;
      }
      throw error;
    }

    console.log(`✅ ${email} - created (id: ${data.user.id})`);
    return true;
  } catch (err) {
    console.error(`❌ ${email} - FAILED: ${err?.message || err}`);
    return false;
  }
}

async function main() {
  const emails = provisionAll ? FAMILY_EMAILS : [singleEmail];

  console.log("🦞 MMT-2025 User Provisioning");
  console.log("==============================");
  console.log(`Supabase URL: ${url}`);
  console.log("");

  let success = 0;
  let failed = 0;

  for (const email of emails) {
    const ok = await provisionUser(email);
    if (ok) success++;
    else failed++;
  }

  console.log("");
  console.log(`Done! ${success} succeeded, ${failed} failed.`);
  console.log("");
  console.log("Users can now request a magic link and sign in at:");
  console.log("  https://gunnarguy.github.io/MMT-2025/");

  process.exit(failed > 0 ? 1 : 0);
}

await main();
