// Admin allowlist. To grant someone admin access:
//   1. Add their Google account email here (controls the admin UI).
//   2. Add the same email to the isAdmin() list in firestore.rules and
//      republish the rules (controls actual database write access).
export const ADMIN_EMAILS = [
  "idealapphub@gmail.com",
  "voiceapplication2025@gmail.com",
];

export const isAdmin = (user) => !!user?.email && ADMIN_EMAILS.includes(user.email);
