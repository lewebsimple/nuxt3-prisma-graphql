import { initAuthState } from "../utils/auth";

export default defineEventHandler(async (event) => {
  event.context.auth = await initAuthState(event.req);
});
