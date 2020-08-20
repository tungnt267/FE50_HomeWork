var factorial = (n) => (n > 1 ? n * factorial(n - 1) : 1);
console.log(0 + "! = " + factorial(0));
console.log(1 + "! = " + factorial(1));
console.log(5 + "! = " + factorial(5));
