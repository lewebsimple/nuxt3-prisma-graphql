import { setAuthState } from "../utils/jwt";

export default defineEventHandler((event) => {
  return setAuthState({ user: null }, event);
});
