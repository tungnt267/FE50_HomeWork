// Currency Converter
function dollarConverter() {
  const USD_RATE = 24000;
  var dollar = document.getElementById("dollar").value;
  if (!dollar || isNaN(dollar) || dollar < 0) {
    alert("Please enter a valid amount!!!");
  } else {
    alert(Math.round(dollar * USD_RATE) + " VND");
  }
}
