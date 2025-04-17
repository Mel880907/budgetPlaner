const incomeFields = ['incomeProj1', 'incomeProj2', 'incomeAct1', 'incomeAct2'];
const incomeProjTotalEl = document.getElementById('incomeProjTotal');
const incomeActTotalEl = document.getElementById('incomeActTotal');
const projBalanceEl = document.getElementById('projBalance');
const actBalanceEl = document.getElementById('actBalance');
const balanceDiffEl = document.getElementById('balanceDiff');

const expenseCategories = {
  Housing: ['Mortgage or rent', 'Phone', 'Electricity', 'Gas', 'Water and sewer', 'Cable', 'Waste removal', 'Maintenance', 'Supplies', 'Other'],
  Transportation: ['Public Transport', 'Fuel', 'Repairs', 'Insurance'],
  Entertainment: ['Night out', 'Movies', 'Concerts', 'Music platforms'],
};

function createExpenseTable(category, items) {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${category}</h3><table><thead><tr><th>Item</th><th>Projected</th><th>Actual</th></tr></thead><tbody></tbody></table>`;
  const tbody = div.querySelector('tbody');

  items.forEach((item, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item}</td>
      <td><input type="number" data-type="proj" data-cat="${category}" data-index="${i}"></td>
      <td><input type="number" data-type="act" data-cat="${category}" data-index="${i}"></td>`;
    tbody.appendChild(row);
  });

  document.getElementById('categories').appendChild(div);
}

Object.entries(expenseCategories).forEach(([cat, items]) => {
  createExpenseTable(cat, items);
});

function update() {
  let incomeProj = 0, incomeAct = 0;

  incomeFields.forEach(id => {
    const val = parseFloat(document.getElementById(id).value) || 0;
    if (id.includes('Proj')) incomeProj += val;
    else incomeAct += val;
  });

  incomeProjTotalEl.textContent = incomeProj;
  incomeActTotalEl.textContent = incomeAct;

  let expenseProj = 0, expenseAct = 0;

  document.querySelectorAll('[data-type=proj]').forEach(el => {
    expenseProj += parseFloat(el.value) || 0;
  });

  document.querySelectorAll('[data-type=act]').forEach(el => {
    expenseAct += parseFloat(el.value) || 0;
  });

  projBalanceEl.textContent = (incomeProj - expenseProj).toFixed(2);
  actBalanceEl.textContent = (incomeAct - expenseAct).toFixed(2);
  balanceDiffEl.textContent = ((incomeAct - expenseAct) - (incomeProj - expenseProj)).toFixed(2);
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', update);
});
