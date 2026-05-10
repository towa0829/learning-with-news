"use client";

import { supabase } from "@/lib/supabase/client";

const GoogleLoginButton = () => {
const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://news-lingo.vercel.app/auth/callback"
    }
  })
}

  return (
    <div>
      <button onClick={login}>Login with Google</button>
    </div>
  )
}

export default GoogleLoginButton
