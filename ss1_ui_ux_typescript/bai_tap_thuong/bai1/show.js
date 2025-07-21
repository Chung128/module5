import {courses} from "./list.js";
import {addedCourses} from "./list.js";

//yêu cầu 1
function showRatingMin4(cou) {
    for (let i = 0; i < cou.length; i++) {
        if (cou[i].rating >= 4) {
            console.log(`${cou[i].title} - Rating: ${cou[i].rating}`);
        }
    }
}

showRatingMin4(courses);

//yêu cầu 2
function showRatingMax4(cou) {
    for (let i = 0; i < cou.length; i++) {
        if (cou[i].rating < 4) {
            console.log(`<${cou[i].id}>-<${cou[i].title}>-<${cou[i].rating}>`);
        }
    }
}

showRatingMax4(courses);

//yêu cầu 3
const concat=[...courses,...addedCourses];
console.log(concat);