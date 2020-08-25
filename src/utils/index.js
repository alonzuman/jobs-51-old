export const checkPermissions = (role) => {
  switch (role) {
    case 'user': return 1;
    case 'volunteer': return 2;
    case 'manager': return 3;
    case 'moderator': return 4;
    case 'admin': return 5;
    default: return 1;
  }
}
