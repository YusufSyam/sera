import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient =
  // Create a supabase client on the browser with project's credentials
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
