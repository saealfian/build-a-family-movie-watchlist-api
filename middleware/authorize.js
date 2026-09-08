export function authorizeModification(req, res, next) {
  const role = req.user.role;
  const loggedInUserId = req.user.id;           // ← number (dari JWT payload)
  const requestedUserId = Number(req.params.userId); // ← konversi dari string ke number

  // Parent boleh memodifikasi watchlist siapapun → langsung lanjut
  if (role === "parent") {
    return next();
  }

  // Child hanya boleh memodifikasi watchlist milik sendiri
  if (role === "child" && loggedInUserId === requestedUserId) {
    return next();
  }

  // Selain itu → tolak
  return res.status(403).json({ error: "Access denied" });
}