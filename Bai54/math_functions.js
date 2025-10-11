function calculateMax() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const result = Math.max(a, b, c);
    document.getElementById('result').value = result;
}

function calculateMin() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const result = Math.min(a, b, c);
    document.getElementById('result').value = result;
}

function calculateSin() {
    const a = parseFloat(document.getElementById('a').value);
    const aInRadians = a * (Math.PI / 180);
    const result = Math.sin(aInRadians);
    document.getElementById('result').value = result;
}

function calculateCos() {
    const a = parseFloat(document.getElementById('a').value);
    const aInRadians = a * (Math.PI / 180);
    const result = Math.cos(aInRadians);
    document.getElementById('result').value = result;
}

function calculatePow() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = Math.pow(a, b);
    document.getElementById('result').value = result;
}