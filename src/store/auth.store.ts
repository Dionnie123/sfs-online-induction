import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
// Define types for the Zustand store state
interface AuthState {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  user: null,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
