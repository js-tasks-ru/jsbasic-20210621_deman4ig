function ucFirst(str) {
  if (str.trim().length == 0) {
    return str;
  }

  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
