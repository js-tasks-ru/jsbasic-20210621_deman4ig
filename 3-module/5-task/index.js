function getMinMax(str) {
  const splittedArr = str.split(/\s|\,/)
    .filter(element => element != '')
    .map(element => Number(element))
    .filter(num => !isNaN(num));

  return {
    min: Math.min(...splittedArr),
    max: Math.max(...splittedArr)
  };
}
