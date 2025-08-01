import axios from "axios";

export async function getAll() {
    try {
        const response = await axios.get("http://localhost:3001/hoaDon")
        return response.data;
    } catch (e) {
        return []
    }
}


export async function add(hoaDon) {
    try {
        const response = await axios.post("http://localhost:3001/hoaDon", hoaDon)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export async function update(id, hoaDon) {
    try {
        const response = await axios.patch("http://localhost:3001/hoaDon/" + id, hoaDon)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export async function getAllKhach() {
    try {
        const response = await axios.get("http://localhost:3001/khachHang")
        return response.data;
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function findById(id) {
    try {
        const response = await axios.get("http://localhost:3001/hoaDon/" + id)
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function deleteById(id) {
    try {
        const response = await axios.delete("http://localhost:3001/hoaDon/" + id);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function search(nameKeyword, idKey) {
    try {
        const nameProduct = await axios.get(`http://localhost:3001/hoaDon`)
        const id = await axios.get("http://localhost:3001/khachHang");
        const responseName = nameProduct.data.filter((p) => {
            return (!nameKeyword || p.maHoaDon.toLowerCase().includes(nameKeyword.toLowerCase()))
                && (!idKey || p.khachHang.id === parseInt(idKey));
        });
        return {
            name: responseName,
            keyId: id.data
        }
    } catch (e) {
        console.log(e)
        return {
            name: [],
            keyId: []
        }
    }
}