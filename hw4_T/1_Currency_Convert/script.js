// Currency Converter
function dollarConverter() {
  const USD_RATE = 24000;
  var dollar = document.getElementById("dollar").value;
  if (!dollar || isNaN(dollar)) {
    alert("Please enter a valid amount!!!");
  } else {
    alert(dollar * USD_RATE + " VND");
  }
}
