function namify(users) {
  const names = [];

  users.forEach(user => names.push(user.name));

  return names;
}
