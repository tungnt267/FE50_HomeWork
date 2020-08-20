function getDivisors(n) {
  var result = [];
  if (n > 1) {
    for (i = 1; i <= n; i++) {
      if (n % i === 0) result.push(i);
    }
  }
  console.log(result);
}
getDivisors(6);
getDivisors(10);
getDivisors(12);
