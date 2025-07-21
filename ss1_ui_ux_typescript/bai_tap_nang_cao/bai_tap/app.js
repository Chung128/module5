//bài 1.1
import {isPrime} from "./isPrime.js";
const number=10;
console.log(`${number} ${isPrime(number) ? "là" : "không phải "} số nguyên tố.`);
// nếu muốn nhập số
// import readline from 'readline';
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question('Nhập một số: ', (input) => {
//     const number = parseInt(input);
//     if (isNaN(number)) {
//         console.log("Vui lòng nhập một số hợp lệ!");
//     } else if (isPrime(number)) {
//     console.log(`${number} là số nguyên tố`);
//   } else {
//     console.log(`${number} không phải số nguyên tố`);
//   }
//   rl.close();
// })

//bài 1.2
 const arr=[1,2,3,4,5,6,7,8,9,10];
 const arr1=[];
for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])){
        arr1.push(arr[i]);
    }
}
    console.log(arr1);
