function calcElectricityBill() {
  const KWH_FIRST_50 = 3000;
  const KWH_CONTINUE_50 = 2500;
  const KWH_CONTINUE_20 = 2300;
  const KWH_REST = 2000;
  var numKwh = +document.getElementById("numberOfKwh").value;
  var result = document.getElementById("result");
  var money = 0;
  if (numKwh === null || isNaN(numKwh) || numKwh < 0) {
    result.style.display = "block";
    result.style.color = "red";
    result.innerHTML = "Invalid Input!";
  } else {
    if (numKwh <= 50) {
      money = numKwh * KWH_FIRST_50;
      money = Math.round(money);
      result.style.display = "block";
      result.innerHTML = "Amount payable: " + money;
    } else if (numKwh <= 100) {
      money = 50 * KWH_FIRST_50 + (numKwh - 50) * KWH_CONTINUE_50;
      money = Math.round(money);
      result.style.display = "block";
      result.innerHTML = "Amount payable: " + money;
    } else if (numKwh <= 120) {
      money =
        50 * KWH_FIRST_50 +
        50 * KWH_CONTINUE_50 +
        (numKwh - 100) * KWH_CONTINUE_20;
      money = Math.round(money);
      result.style.display = "block";
      result.innerHTML = "Amount payable: " + money;
    } else {
      money =
        50 * KWH_FIRST_50 +
        50 * KWH_CONTINUE_50 +
        20 * KWH_CONTINUE_20 +
        (numKwh - 120) * KWH_REST;
      money = Math.round(money);
      result.style.display = "block";
      result.innerHTML = "Amount payable: " + money;
    }
  }
}

function refresh() {
  document.getElementById("numberOfKwh").value = "";
}

function main() {
  calcElectricityBill();
  refresh();
}
