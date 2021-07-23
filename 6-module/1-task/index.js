/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  _table;
  _thead;
  _tbody;
  _tr;

  constructor(rows) {
    this._rows = rows;
    this._generateTable();
  }

  _generateSingleRow(rowData) {
    this._tr = document.createElement('tr');
    this._tr.innerHTML = `<td>${rowData.name}</td>
    <td>${rowData.age}</td>
    <td>${rowData.salary}</td>
    <td>${rowData.city}</td>
    <td><button>X</button></td>`;

    return this._tr;
  }

  _generateTableBody(rows) {
    this._tbody = document.createElement('tbody');
    this._tbody.append(...rows.map(row => this._generateSingleRow(row)));

    return this._tbody;
  }

  _generateTableHeader() {
    this._thead = document.createElement('thead');
    this._thead.innerHTML = `<tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>`;

    return this._thead;
  }

  _generateTable() {
    this._generateTableBody(this._rows);
    this._generateTableHeader();

    this._table = document.createElement('table');
    this._table.addEventListener('click', this._onCloseBtnClick);
    this._table.append(this._thead, this._tbody);

    return this._table;
  }

  _onCloseBtnClick(event) {
    let target = event.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }
    if (!target.closest('tr')) {
      return;
    }

    target.closest('tr').remove();
  }

  get elem() {
    return this._table;
  }
}
