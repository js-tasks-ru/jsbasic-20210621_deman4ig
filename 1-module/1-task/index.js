function factorial(n) {
  let result = 1;

  if (n == 0) {
    return result;
  }

  for (let i = n; n > 1; n -= 1) {
    result *= n;
  }

  return result;
}
