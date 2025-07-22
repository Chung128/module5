//Rest parameters  OK
function logger({name, ...rest}) {
    console.log(name);
    console.log(rest);
}

logger({
    name: 'JavaScript',
    price: 1000,
    Description: 'Description Content'
})

//Spread
var arr1 = ['JS', 'Ruby', 'PHP'];
var arr2 = ['ReactJS', 'Dart'];
var arr3 = [...arr2, ...arr1];
console.log(arr3);

var obj1 = {
    name: 'JavaScript'
}
var obj2 = {
    price: '1000'
}
var obj3 = {
    ...obj2, ...obj1
}
console.log(obj3)

