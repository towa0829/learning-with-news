"use client";

import { supabase } from "@/lib/supabase/client";

const GoogleLoginButton = () => {
const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    }
  })
}

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default GoogleLoginButton
