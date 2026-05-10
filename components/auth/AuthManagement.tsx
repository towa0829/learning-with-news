"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import LogoutButton from "@/components/auth/LogoutButton";

const AuthManagement = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return user ? (
    <div>
      <p>Welcome, {user.email}!</p>
      <LogoutButton />
    </div>
  ) : (
    <GoogleLoginButton />
  );
}

export default AuthManagement
