import { AuthState } from "../server/utils/auth";

export default defineNuxtPlugin(({ ssrContext }) => {
  useState<AuthState>("auth", () => ssrContext?.event.context.auth || { user: null });
});
