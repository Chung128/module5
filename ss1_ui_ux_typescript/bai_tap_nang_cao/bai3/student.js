import {sv1} from "./person.js";
import {sv2} from "./person.js";

function call(sv2) {
// const {firstName='Quân',degree='NA'}=sv2;
    const firstName=sv2.firstName||'Quân';
    const degree=sv2.degree||'NA';
    console.log(firstName);
    console.log(degree);
}
call(sv2);

function call1(sv1) {
// const {firstName='Quân',degree='NA'}=sv2;
    const firstName=sv1.firstName||'Quân';
    const degree=sv1.degree||'NA';
    console.log(firstName);
    console.log(degree);
}
call1(sv1);
