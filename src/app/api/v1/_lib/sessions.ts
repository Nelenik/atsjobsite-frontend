// Module-level map persists within the Node.js process (dev + prod)
export const sessions = new Map<string, number>();

export const DEV_TOKEN = "dev-token-2025";
sessions.set(DEV_TOKEN, 1);
