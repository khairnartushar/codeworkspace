//REMOVE LIST OF ELEMENTS ELEMENTS FROM ARRAY
const array = [1, 2, 3, 4, 5];
const elementsToRemove = [2, 4];
const filteredArray = array.filter(item => !elementsToRemove.includes(item));
console.log(filteredArray);
