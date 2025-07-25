export let students = [
    {
        id: 1,
        name: 'chung',
        phone: '0123456789',
        email: 'chung@gmail.com'
    },
    {
        id: 2,
        name: 'bình',
        phone: '0987654321',
        email: 'binh@gmail.com'
    },
    {
        id: 3,
        name: 'khánh',
        phone: '0123459876',
        email: 'khanh@gmail.com'
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