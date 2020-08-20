function checkAmicableNumbers(a, b) {
  var sumA = calcSumDivisors(a);
  var sumB = calcSumDivisors(b);
  sumA === b && sumB === a ? console.log("YES") : console.log("NO");
}

function calcSumDivisors(n) {
  var sum = 0;
  if (n > 1) {
    for (i = 1; i < n; i++) {
      if (n % i === 0) sum += i;
    }
  }
  return sum;
}

checkAmicableNumbers(220, 284);
checkAmicableNumbers(1184, 1210);
checkAmicableNumbers(10, 12);
checkAmicableNumbers(2620, 2924);
