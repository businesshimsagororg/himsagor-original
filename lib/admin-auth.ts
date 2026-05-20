const unsafeAdminTokens = new Set(["", "change-this-before-launch", "admin", "password"]);

export function isAdminAuthorized(token: string | null) {
  const configuredToken = process.env.ADMIN_TOKEN || "";

  if (unsafeAdminTokens.has(configuredToken.trim())) {
    return false;
  }

  return Boolean(token) && token === configuredToken;
}
