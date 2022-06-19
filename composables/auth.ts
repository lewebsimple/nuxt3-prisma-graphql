import { UserRole } from "@prisma/client";
import { AuthState } from "../server/utils/auth";

export function useAuth() {
  // Current authentication state (initialized in plugins/auth.server.ts)
  const auth = useState<AuthState>("auth", () => ({ user: null }));

  // Authorization rules
  const isAuthenticated = computed<boolean>(() => !!auth.value.user?.id);
  const hasUserRole = (role: UserRole) => ["ADMIN", role].includes(auth.value.user?.role || "");

  // Authentication helpers
  const login = async (credentials: { email: string; password: string }) => {
    auth.value = await $fetch("/api/login", { method: "POST", body: credentials });
  };
  const logout = async () => {
    auth.value = await $fetch("/api/logout", { method: "POST" });
  };

  return { auth, isAuthenticated, hasUserRole, login, logout };
}
