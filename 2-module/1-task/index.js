function sumSalary(salaries) {
  let sum = 0;
  const isValid = (num) => !isNaN(num) && Math.abs(num) != Infinity;

  for (const key in salaries) {
    if (typeof salaries[key] == 'number' && isValid(salaries[key])) {
      sum += salaries[key];
    }
  }

  return sum;
}
