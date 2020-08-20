function findEvenNumber(arr) {
  console.log("Given Array: " + arr);
  console.log("The even numbers in array: " + arr.filter((x) => x % 2 == 0));
}
findEvenNumber([1, 2, 5, 3, 4, 6, 8, 0]);
