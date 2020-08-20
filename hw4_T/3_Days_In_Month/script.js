function getDaysInMonth() {
  var month = +document.getElementById("month").value;
  var year = +document.getElementById("year").value;
  var resDay = document.getElementById("resDay");
  var resYear = document.getElementById("resYear");
  var dayFebruary =
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;
  if (!year || !Number.isInteger(year) || year < 0) {
    resYear.style.display = "block";
    resYear.innerHTML = "Invalid Year!";
  } else {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        resDay.style.display = "block";
        resDay.innerHTML = month + "/" + year + " is 31 days long.";
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        resDay.innerHTML = month + "/" + year + " is 30 days long.";
        break;
      case 2:
        resDay.style.display = "block";
        resDay.innerHTML =
          month + "/" + year + " is " + dayFebruary + " days long.";
        break;
      default:
        resDay.style.display = "block";
        resDay.innerHTML = "Invalid Month!";
        break;
    }
    if (dayFebruary == 29) {
      resYear.style.display = "block";
      resYear.innerHTML = year + " is leap year.";
    } else {
      resYear.style.display = "block";
      resYear.innerHTML = year + " is not a leap year.";
    }
  }
}

function refresh() {
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";
}

function main() {
  getDaysInMonth();
  refresh();
}
