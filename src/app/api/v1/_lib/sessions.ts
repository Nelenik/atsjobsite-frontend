// Store sessions on the global object so the same Map instance is shared
// across all API route bundles (Next.js compiles each route separately).
declare global {
  // eslint-disable-next-line no-var
  var __sessions: Map<string, number | string> | undefined;
}

if (!global.__sessions) {
  global.__sessions = new Map<string, number | string>();
}

export const sessions = global.__sessions;
