"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user ? <FaUserCheck /> : <FaUserPlus />}
          
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        
          {user ? (
            <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          ) : (
            <>
              <DropdownMenuGroup>
                <DropdownMenuLabel>GUEST</DropdownMenuLabel>
                <DropdownMenuItem>
                  <GoogleLoginButton />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AuthManagement
