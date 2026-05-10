"use client";

import { supabase } from "@/lib/supabase/client";

const LogoutButton = () => {
  const logout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/";
  }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default LogoutButton
