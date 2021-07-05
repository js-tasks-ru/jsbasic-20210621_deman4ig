function camelize(str) {
  const capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

  const splitted = str.split('-');

  for (let i = 1; i < splitted.length; i += 1) {
    splitted[i] = capitalize(splitted[i]);
  }

  return splitted.join('');
}
