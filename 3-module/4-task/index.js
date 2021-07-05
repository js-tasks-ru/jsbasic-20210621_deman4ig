function showSalary(users, age) {
  const result = [];

  users.filter(user => {
    if (user.age <= age) {
      result.push(`${user.name}, ${user.balance}`);
    }
  })

  return result.join('\n');
}
