import { useEffect } from "react";
import {
  createClient,
  Session,
  AuthChangeEvent,
  User,
} from "@supabase/supabase-js";
import useAuthStore from "./auth.store";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function useAuthListener(): void {
  // Zustand actions to set session and user state
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Set up the Supabase auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log("Auth event:", event, "Session:", session);

        switch (event) {
          case "INITIAL_SESSION":
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
          case "USER_UPDATED":
            setSession(session);
            setUser(session?.user ?? null);
            break;

          case "SIGNED_OUT":
            setSession(null);
            setUser(null);
            break;

          case "PASSWORD_RECOVERY":
            // You could handle password recovery here if needed
            console.log("Password recovery event received");
            break;

          default:
            console.warn(`Unhandled auth event: ${event}`);
        }
      }
    );

    // Clean up the listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setSession, setUser]);
}

export default useAuthListener;
