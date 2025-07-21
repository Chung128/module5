import {person} from "./person.js";
//Destructuring
const {firstName, lastName, age, language} = person;
console.log('tên :' + firstName + ' ' + lastName, '| tuổi :' + age + '| ngôn ngữ : ' + language[0]);

//rest
const {...rest}=person
console.log(rest);

//spread operator
const student2={...person,hobbies:'đá bóng'}
console.log(student2)