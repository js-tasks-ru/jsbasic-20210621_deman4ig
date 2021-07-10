function highlight(table) {

  for (const row of table.querySelector('tbody').rows) {
    for (const cell of row.cells) {
      if (cell.cellIndex == 1 && Number(cell.innerText) < 18) {
        cell.parentElement.style.textDecoration = 'line-through';
        continue;
      }

      if (cell.cellIndex == 2) {
        cell.innerText == 'm' ? cell.parentElement.classList.add('male') : cell.parentElement.classList.add('female');
      }

      if (cell.cellIndex == 3) {
        if (cell.dataset.available == undefined) {
          cell.parentElement.hidden = true;
        } else if (cell.dataset.available == 'true') {
          cell.parentElement.classList.add('available');
        } else {
          cell.parentElement.classList.add('unavailable');
        }
      }
    }
  }
}
