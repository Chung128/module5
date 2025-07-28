import axios from "axios";

export let studentRouter = [
    {
        id: 1,
        name: 'chung',
        gender: true,
        subject: ['JS', 'Java'],
        className: {
            id: 1,
            name: 'JV101'
        }
    },
    {
        id: 2,
        name: 'bình',
        gender: true,
        subject: ['JS', 'Java'],
        className: {
            id: 3,
            name: 'JV103'
        }
    },
    {
        id: 3,
        name: 'khánh',
        gender: true,
        subject: ['JS', 'Java'],
        className: {
            id: 2,
            name: 'JV102'
        }
    }
]

export async function getAll() {
    //gọi API
    try {
        const response=await axios.get("http://localhost:3001/students");
        return response.data;
    }catch (e) {
        console.log(e)
        return [];
    }
}

export async function addNewStudent(student) {
    try {
        const response=await axios.post("http://localhost:3001/students",student);
    }catch (e) {
        console.log(e)
    }
   // studentRouter.push(student)
}

export async function deleteById(id) {
    try {
        const response=await axios.delete("http://localhost:3001/students/"+id);
    }catch (e) {
        console.log(e)
    }
   // studentRouter = studentRouter.filter(s => s.id !== id) //tảo mảng mới bỏ qua phần tử có id này
}

export async function findById(id) {
    try {
        const response=await axios.get("http://localhost:3001/students/"+id);
        return response.data;
    }catch (e) {
        console.log(e)
        return null;
    }
    //return studentRouter.find(s => s.id == id); //(dùng 3 dấu bằng thì kèm parse file khác)
}

export async function updateStudent(id,student) {
    try {
        const response = await axios.patch("http://localhost:3001/students/"+id, student);
    } catch (e) {
        console.log(e)
    }
    // const index = studentRouter.findIndex(s => s.id === student.id); // trả về vị trí dối tượng
    // if (index !== -1) {
    //     studentRouter[index] = student;
    // }
}

export  async  function  findClass() {
    try{
        const response = await axios.get("http://localhost:3001/className");
        return response.data;
    } catch (e) {
        console.log(e)
    }
}


// export async function searchStudent(nameKeyword,classKeyword) {
//     try {
//        // const response = await axios.get(`http://localhost:3001/students?name_like=${nameKeyword}`);  tìm tên nhanh
//
//         const response = await axios.get("http://localhost:3001/students");
//         //const responseClass = await axios.get("http://localhost:3001/className");
//
//         return response.data.filter((s) => {
//             const nameMatch = !nameKeyword || s.name.toLowerCase().includes(nameKeyword.toLowerCase());
//             const classMatch = !classKeyword ||  s.className?.id === parseInt(classKeyword);
//             return nameMatch && classMatch;
//         });
//     } catch (e) {
//         console.log(e)
//         return [];
//     }
//     // return studentRouter.filter((s) => {
//     //     const nameMatch = !nameKeyword || s.name.toLowerCase().includes(nameKeyword.toLowerCase());
//     //     const classMatch = !classKeyword || s.className?.name.toLowerCase().includes(classKeyword.toLowerCase());
//     //     return nameMatch && classMatch;
//     // });
// }

export async function searchStudent(nameKeyword, classKeyword) {
    try {
        const [studentRes, classRes] = await Promise.all([
            axios.get("http://localhost:3001/students"),
            axios.get("http://localhost:3001/className")
        ]);

        const filteredStudents = studentRes.data.filter((s) => {
            const nameMatch = !nameKeyword || s.name.toLowerCase().includes(nameKeyword.toLowerCase());
            const classMatch = !classKeyword || s.className?.id === parseInt(classKeyword);
            return nameMatch && classMatch;
        });

        return {
            students: filteredStudents,
            classList: classRes.data
        };
    } catch (e) {
        console.error("Lỗi khi tìm kiếm:", e);
        return {
            students: [],
            classList: []
        };
    }
}

