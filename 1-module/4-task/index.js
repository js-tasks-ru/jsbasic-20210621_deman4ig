function checkSpam(str) {
  const spamList = ['1xBet', 'XXX'];

  for (const word of spamList) {
    if (str.toLowerCase().includes(word.toLowerCase())) {
      return true;
    }
  }

  return false;
}
