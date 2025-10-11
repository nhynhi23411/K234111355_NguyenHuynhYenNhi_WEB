function findSolution() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);

  let result = "";

  if (a === 0) {
    // Phương trình bậc nhất: bx + c = 0
    if (b === 0) {
      result = c === 0 ? "Phương trình vô số nghiệm" : "Phương trình vô nghiệm";
    } else {
      const x = -c / b;
      result = `x = ${x.toFixed(2)}`;
    }
  } else {
    // Phương trình bậc hai: ax^2 + bx + c = 0
    const delta = b * b - 4 * a * c;

    if (delta < 0) {
      result = "Phương trình vô nghiệm";
    } else if (delta === 0) {
      const x = -b / (2 * a);
      result = `x1 = x2 = ${x.toFixed(2)}`;
    } else {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      result = `x1 = ${x1.toFixed(2)}; x2 = ${x2.toFixed(2)}`;
    }
  }
  document.getElementById("result").value = result;
}

function clearFields() {
  document.getElementById("a").value = "";
  document.getElementById("b").value = "";
  document.getElementById("c").value = "";
  document.getElementById("result").value = "";
}
