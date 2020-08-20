function calcSum(arr) {
  console.log("Given Array: " + arr);
  console.log(
    "The sum of elements in array: " + arr.reduce((a, b) => a + b, 0)
  );
}
calcSum([1, 2, 5, 3, 4]);
