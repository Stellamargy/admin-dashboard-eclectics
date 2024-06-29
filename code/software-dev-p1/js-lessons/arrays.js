// primitive data types includes -string , number , boolean , undefined , null  , symbol .They point a single value.
// However ,sometimes we usually need to store a collection of data,for this we need data structures.
//Data structure is a means for associationg and organixing information -Arrays , objects


//What is an array?
//Array is a list with items listed in a particular order ,surrounded by square brackets
//The items can be of any data type
//Arrays are mutable -they can be changed.
//When we say arrays are ordered -it means itens in an array are arranged in specific sequence .Each items has a fixed position in an array -this is what we call indexing in array.

//Creating an array / syntax of an array
const emptyArray=[]; // array can also be empty !
const fruits=[" bananas" , "watermelon" , "oranges"] // array is assigned to the variable fruits , each item in the array is separated by a comma

// Array constructor
// The Array() constructor creates Array objects.
//Array() can be called with or without new. Both create a new Array instance.
// Example : 
const names=new Array("Stella" , "Margy" , "Winnie" , "Arnold")
// or you can use the array constructor without the key word new
// Example
const myLuckyNumbers=Array(2,11,1)
// NB use console.log fn to view the output


// NO OF ITEMS IN AN ARRAY.
// How will I know the number of items an array has - the length method returns the number of items in an array
//For us to know the no of items in names array we do the below
console.log(names.length)
//  IMPORTANT : The length of an array starts from 1

// INDExING IN ARRAYS
// indexing in arrays refers to a number that identifies the position of an item in an array .
// Used to access items in an array
// IMPORTANT INDEXING STARTS FROM 0 .
names[0] // You get the item at index o


// MANIPULATING ARRAYS
// BRACKET NOTATION
// How can I access an element in an array?
//We use the bracket notation ,inside the bracket notation provide the index of the item you want to access.
// eg for me to access bananas in  fruits array desclared in line 14 , I  will do this.
fruits[0] // Logging this gives me banana

// As we said earlier , array can include any data type - including the arrays themselves.
// Example
const oddAndEvenNumbers=[[0,2,4] , [ 1,3,5]] // Nesting arrays inside other arrays.
// To access 1 with is nested in the second array in the oddAndEvenNumbers 
oddAndEvenNumbers[1][0];

//Updating a value in an array
//A value is updated using the assignment operator 
// To update bananas in fruits array (in line 14 ) to read guavas use the syntx below
fruits[0]="guavas"


//ARRAY METHODS 
//These are inbuilt functions that can be called on an array

// METHODS TO ADD ELEMENTS IN AN ARRAY
// To add elements in an array we use  push and unshift methods 
// Let 's talk about the push and unshift method -  What do they have in common and what is their difference

// COMMON
//Requires one / more arguments
// Return value is usually the length of the modified array
//It is a destructive method .
 
// DIFFERECE - push method adds elements at the end of an array while unshift adds elements at the begging of an array
fruits.push("mangoes");
fruits.unshift("pineapple" , " Kiwi");
console.log(fruits) // Run the file and observe the output

// SPREAD OPERATOR 
//Allows us to create a copy 
//Spread operator looks like ellipsis
//Spreads out elements of an existing array into a new array
// NB : NEVER USE A SPREAD OPERATOR TO COPY NESTED ARRAY . I REPEAT DONT ----RESEARCH ON THIS
const copyOfFruits=[...fruits];

// REMOVING ELEMENTS FROM AN ARRAY.
// To remove elements from an array ,we use the pop / shift method

// WHAT DO THE  TWO METHODS  DO 
//  They dont take arguments
// They remove a single element
// The return value is the elements that it has removed
// They are destructive


// What is the difference - the pop method removes the last element while the shift method removes the first element
fruits.pop()
fruits.shift()


// SLICE METHOD
// It removes elements from an array non-destructively that is without mutating the original array
// The return value is usually a new array containing the portion of the removed array


// slice method with no arguments 
// Returns a copy of the original array ,works the same as the spread operator
const slicedFruits= fruits.slice()
console.log(slicedFruits)

// One / Two arguments - the first argument represent the index where it should start slicing from  and the second index the position which it should end .In summary the last argument is not included

//SPLICE METHOD
//Performs destructive methods
//Depending on how many args you use it can remove elements , add/replace elements or a combination of both .
 
// SINGLE ARGUMENT - index at which to begin the splice 
console.log(fruits.splice(1))

//With two arguments
//array.splice(start ,deletecount , item1 , item2)


// TRY IT OUT WITH 2 ARGUMENTS AND THREE ARGUMENTS TO SEE WHAT HAPPENS

//EXTRA RESOURCES .
// MDN WEBSITE
//W3SCHOOL WEBSITE


