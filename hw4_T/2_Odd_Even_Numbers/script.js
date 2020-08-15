function isEven() {
  var num = prompt("Please enter a number: ");
  if (!num || isNaN(num)) {
    alert("Please enter a number!!!");
  } else {
    if (num % 2 == 0) {
      alert(num + " is even number");
    } else {
      alert(num + " is odd number");
    }
  }
}
isEven();
