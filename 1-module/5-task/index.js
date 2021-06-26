function truncate(str, maxlength) {
  const result = (str.length <= maxlength) ? str : `${str.slice(0, maxlength - 1)}…`;

  return result;
}
