import axios from "axios";

export async function getAll() {
    try {
        const response = await axios.get(`http://localhost:3001/sach?_sort=soLuong&_order=asc`)
        return response.data;
    } catch (e) {
        return [];
    }
}

export async function add(sach) {
    try {
        const response = await axios.post("http://localhost:3001/sach1", sach)
        return response.data;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function getAllLoaiSach() {
    try {
        const response = await axios.get("http://localhost:3001/theLoai")
        return response.data;
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function search(nameKeyword, idKey) {
    try {
        const name = await axios.get(`http://localhost:3001/sach?_sort=soLuong&_order=asc`)
        const theLoaiId = await axios.get("http://localhost:3001/theLoai");
        const responseName = name.data.filter((p) => {
            return (!nameKeyword || p.tensach.toLowerCase().includes(nameKeyword.toLowerCase()))
                && (!idKey || p.theLoai.id === parseInt(idKey));
        });
        return {
            sach: responseName,
            theLoai: theLoaiId.data
        }
    } catch (e) {
        console.log(e)
        return {
            sach: [],
            theLoai: []
        }
    }
}

