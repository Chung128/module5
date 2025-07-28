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

export function getAll() {
    return studentRouter;
}

export function addNewStudent(student) {
    studentRouter.push(student)
}

export function deleteById(id) {
    studentRouter = studentRouter.filter(s => s.id !== id) //tảo mảng mới bỏ qua phần tử có id này
}

export function findById(id) {
    return studentRouter.find(s => s.id == id); //(dùng 3 dấu bằng thì kèm parse file khác)
}

export function updateStudent(student) {
    const index = studentRouter.findIndex(s => s.id === student.id); // trả về vị trí dối tượng
    if (index !== -1) {
        studentRouter[index] = student;
    }
}

// export function searchByName(keyword){
//     if (!keyword) return studentRouter;
//     const name=keyword.toLowerCase();
//     return studentRouter.filter(s=>s.name.toLowerCase().includes(name)); //includes kiểm tra xem tn có chưa từ tìm k
// }

export function searchStudent(nameKeyword, classKeyword) {
    return studentRouter.filter((s) => {
        const nameMatch = !nameKeyword || s.name.toLowerCase().includes(nameKeyword.toLowerCase());
        const classMatch = !classKeyword || s.className?.name.toLowerCase().includes(classKeyword.toLowerCase());
        return nameMatch && classMatch;
    });
}
