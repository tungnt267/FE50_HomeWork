function isEven() {
  var num = prompt("Please enter a number: ");
  if (!num) {
    alert("Please enter a integer number!!!");
  } else {
    num = +num;
    if (!Number.isInteger(num)) {
      alert("Please enter a integer number!!!");
    } else {
      if (num % 2 == 0) {
        alert(num + " is even number");
      } else {
        alert(num + " is odd number");
      }
    }
  }
}
isEven();
