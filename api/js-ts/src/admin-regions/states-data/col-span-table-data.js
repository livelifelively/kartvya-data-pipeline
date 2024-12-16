const tableElement = document.getElementById("t");

function readAndRemoveSup(element) {
  links = [];
  element.querySelectorAll("sup")?.forEach((val) => {
    let link = {
      text: val.querySelector("a")?.innerText,
      href: val.querySelector("a")?.href,
    };

    links.push(link);

    val.remove();
  });

  return links;
}

let heads = [];

tableElement.querySelectorAll("thead tr").forEach((row) => {
  let colSpan = 0;
  row.querySelectorAll("th").forEach((cell, idx) => {
    const links = readAndRemoveSup(cell);

    heads.push(cell.innerText);
  });
});

let states = [];
tableElement.querySelectorAll("tbody tr").forEach((row) => {
  let colSpan = 0;
  let rowValues = [];
  row.querySelectorAll("td, th").forEach((cell, idx) => {
    if (colSpan) {
      while (colSpan) {
        rowValues.push(rowValues[rowValues.length - 1]);
        colSpan -= 1;
      }
    }
    readAndRemoveSup(cell);

    let links = [];
    cell.querySelectorAll("a").forEach((a) => {
      links.push({ text: a.innerText, href: a.href });
    });

    rowValues.push({ links, text: cell.innerText });
    colSpan = cell.colSpan - 1;
  });

  let rowValuesKeyed = {};

  rowValues.map((stateFieldVals, i) => {
    rowValuesKeyed[heads[i]] = stateFieldVals;
  });

  states.push(rowValuesKeyed);
});
