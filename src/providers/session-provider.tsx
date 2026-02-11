"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "@/lib/shopify/queries/customers/getCurrentUser";

type SessionUser = Awaited<ReturnType<typeof getCurrentUser>>;

type SessionContextValue = {
  user: SessionUser;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined,
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SessionContext.Provider value={{ user, loading, error, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
