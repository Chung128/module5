export let students = [
    {
        id: 1,
        name: 'chung',
        phone: '0123456789',
        email: 'chung@gmail.com',
        className:{
            id: 1,
            name: 'JV101'
        }
    },
    {
        id: 2,
        name: 'bình',
        phone: '0987654321',
        email: 'binh@gmail.com',
        className:{
            id: 3,
            name: 'JV103'
        }
    },
    {
        id: 3,
        name: 'khánh',
        phone: '0123459876',
        email: 'khanh@gmail.com',
        className:{
            id: 2,
            name: 'JV102'
        }
    }
]

export function getAll() {
    return students;
}

export function addNewStudent(student) {
    students.push(student)
}

export function deleteById(id) {
    students = students.filter(s => s.id !== id)
}