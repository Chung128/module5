import axios from "axios";

// export async function getAll() {
//     try {
//         const response = await axios.get("http://localhost:3001/products")
//         return response.data;
//     } catch (e) {
//         return []
//     }
// }

export async function getAll(page, size) {
    try {
        const response = await axios.get(`http://localhost:3001/products?_sort=name&_order=asc&_page=${page}&_limit=${size}`)
        return response.data;
    } catch (e) {
        return []
    }
}

export async function add(product) {
    try {
        const response = await axios.post("http://localhost:3001/products", product)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export async function update(id, product) {
    try {
        const response = await axios.patch("http://localhost:3001/products/" + id, product)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export async function getAllCategory() {
    try {
        const response = await axios.get("http://localhost:3001/category")
        return response.data;
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function findById(id) {
    try {
        const response = await axios.get("http://localhost:3001/products/" + id)
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function deleteById(id) {
    try {
        const response = await axios.delete("http://localhost:3001/products/" + id);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function search(nameKeyword, categoryIdKey, page, size) {
    try {
        const nameProduct = await axios.get(`http://localhost:3001/products?_sort=name&_order=asc&_page=${page}&_limit=${size}`)
        const categoryId = await axios.get("http://localhost:3001/category");
        const responseName = nameProduct.data.filter((p) => {
            return (!nameKeyword || p.name.toLowerCase().includes(nameKeyword.toLowerCase()))
                && (!categoryIdKey || p.category.id === parseInt(categoryIdKey));
        });
        const data=nameProduct.data;
        const totalRecord =nameProduct.headers['x-total-count'];
        return {
            data:data,
            totalRecord:totalRecord,
            products: responseName,
            categories: categoryId.data
        }
    } catch (e) {
        console.log(e)
        return {
            products: [],
            categories: []
        }
    }
}

// export async function search(nameKeyword = '', categoryIdKey = '', page = 1, size = 10) {
//     try {
//         const response = await axios.get(`http://localhost:3001/products?_sort=name&_order=asc&_page=${page}&_limit=${size}`);
//         const categoryResponse = await axios.get("http://localhost:3001/category");
//
//         const filteredProducts = response.data.filter((p) => {
//             return (!nameKeyword || p.name.toLowerCase().includes(nameKeyword.toLowerCase()))
//                 && (!categoryIdKey || p.category.id === parseInt(categoryIdKey));
//         });
//
//         return {
//             products: filteredProducts,
//             categories: categoryResponse.data
//         };
//     } catch (e) {
//         console.log(e);
//         return {
//             products: [],
//             categories: []
//         };
//     }
// }

