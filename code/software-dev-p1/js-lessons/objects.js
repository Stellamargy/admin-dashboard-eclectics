//What is an object?
// key value pair .
// is a data structure that consist of a list of properties with key-value pairs bounded by curly braces
// SYNTAX
// condt obj={
   //key1:value1,
  // key2: value2,

//}
const myCar = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
  };

  // //RECAP 
// //What is an Array? - is  a list of ordered items surrounded by square brackets
// //SYNTAX
// const fruits=[" bananas" , " apples " , " watermelon "  , "pineapple" , [ 1, 2, 3]];
// // Indexing  - starts from 0
// //length - returns the number of items of items in array -length of array starts from 0
// console.log(fruits.length);

// // Mutability  - we change after creating it .
//  // Accessing items in an array.
// // Just bracket notation.
// console.log(fruits[2])

// // Update items in an array  - we assignment operator
// // 1. to get the item -access the item
// // 2. use assignnment operator to update the value .
// fruits[2]= "guavas";
// console.log(fruits);
// console.log(fruits[4][0])


// // ARRAY METHODS - inbuilt methods that are used to manipulate arrays. 
// // Add elements in array 
// // Unshift - adds elements  at the beggining 
// // push -adds elements at the end 
// // Can take 1 to many arguments 
// //It returns the length of the new array 
// // push and unshift methods are both destructive 

// const days=[" Mon" , "Tue" , "Wed"];
// days.unshift("Sun" , " Stella");
// console.log(days.push(" Thu" , " Fri"))
// console.log(days)

// // Spread Operators 
// //Allows us to create a copy of an array.
// // uses ellipses ...
// //Spreads the elements .
// const copyOfDays=[ ...days];
// copyOfDays.unshift(" ADDS");
// console.log(copyOfDays);
// console.log(days)

// //It will 2 variables that point the same location in memory .
// // const copyOfDays=days;



// // Methods that are used to remove elements from an array
// // 1 .pop() - removes the element at the end of an array
// // 2. shift() - removes the elements at the beggining of array.
// // They dont take any arguments
// //They remove on element
// //The return value is the element that has been removed
// //They are destructive 

// const months=["Jan" , "Feb ", "March" , "April" , " May"];
// console.log(months.pop());
// months.shift()
// console.log(months);



// // SLICE METHOD 
// //Removes elements from an array 
// //It is a non destructive method --it does not mutate the original array 
// // it takes 0 -2 arguments 
// //Return value -it is a new array with sliced elements

// const students=["Stella" , " Nixon" , " Winnie ", "Kimberly"];
// const slicedStudents=students.slice(); // spread operator - they both point to a different loc in memory 

// console.log(students);
// console.log(slicedStudents)
// console.log(students.slice(2)); // slice elements from the position specified to the end of an array.
// console.log(students)

// console.log(students.slice(1,3)) // 1 ,2 - the last index is not included.
// console.log(students);

// SPLICE
// It performs destructive methods .
// Depending on the arguments - it will remove , add/replace , (do a combinaton of both)


const years=[2000, 2001, 2002, 2003, 2004, 2005];
// without any argumnets. 
console.log(years.splice()) //empty array  --- you have not provided anything to be removed,

console.log(years) //  since you havent received anything it returns everything

// console.log(years.splice(2)); // remove specified position to the end of the array
// console.log(years) // it is destructive  method


// with three arguments - array.splice(start, deletecount , item1 . item2)
console.log(years.splice(2,2 , "Yes" , "No" , "Undecided")) 
console.log(years)


// 



