import React, { useState, useEffect } from "react";
import { search } from "../service/products";
import DeleteComponent from "./DeleteComponent";
import { Link } from "react-router-dom";
import "./css/ListComponent.css";

function ListComponent() {
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategory] = useState([]);
    const [keyword, setKeyWord] = useState("");
    const [selectCategoryId, setSelectCategoryId] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [page,setPage]=useState(1);
    const [size,setSize]=useState(2);
    const [totalPage,setTotalPage]=useState(0);
    const [deleteProduct, setDeleteProduct] = useState({
        id: "",
        name: "",
        dateOfEntry: "",
        dateIdIssue: "",
        size: false,
        color: [],
        category: {
            id: "",
            name: ""
        },
        price: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const {data,totalRecord,products,categories} = await search('', '', page, size); // Gọi hàm search với tham số mặc định
            setTotalPage(()=>Math.ceil(totalRecord/size)) //làm tròn trên nếu tổng lẻ
            setProductList(Array.isArray(products) ? products : []);
            setCategory(Array.isArray(categories) ? categories : []);
        };
        fetchData();
        console.log(page)
    }, [isShowModal,page]);

    const handleSearch = async () => {
        const result = await search(keyword, selectCategoryId);
        setProductList(result.products);
        setCategory(result.categories);
    };

    const handleShowModal = (product) => {
        setIsShowModal(pre => !pre);
        setDeleteProduct(product);
        console.log(deleteProduct);
        console.log(isShowModal);
    };

    const handleCloseModal = () => {
        setIsShowModal(pre => !pre);
    };

    // Format ngày tháng
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Format giá tiền
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    return (
        <div className="list-container">
            <h2 className="list-title">Danh sách</h2>
            <hr className="list-hr" />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập tên cần tìm"
                    value={keyword}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <select
                    value={selectCategoryId}
                    onChange={(e) => setSelectCategoryId(e.target.value)}
                >
                    <option value="">Tất cả danh sách</option>
                    {categoryList.map(cate => (
                        <option key={cate.id} value={cate.id}>{cate.name}</option>
                    ))}
                </select>
                <button onClick={handleSearch} className="search-button">Tìm kiếm</button>
            </div>
            <table className="product-table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Ngày nhập</th>
                    <th>Màu sắc</th>
                    <th>Loại hàng</th>
                    <th>Giá</th>
                    <th>Cập nhật</th>
                    <th>Chi tiết</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tbody>
                {productList.map((p, index) => (
                    <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.name}</td>
                        <td>{formatDate(p.dateOfEntry)}</td>
                        <td>{p.color.join(', ')}</td>
                        <td>{p.category?.name}</td>
                        <td>{formatCurrency(p.price)}</td>
                        <td><button className="edit-button"><Link to={`/update/${p.id}`}>Cập nhật</Link></button></td>
                        <td><button className="detail-button"><Link to={`/detail/${p.id}`}>Chi tiết</Link></button></td>
                        <td>
                            <button onClick={() => handleShowModal(p)} className="delete-button">
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={9} className="empty-list">
                        {productList.length === 0 ? 'Danh sách trống...' : ''}
                    </td>
                </tr>
                </tbody>
            </table>
            {/*<div className="pagination">*/}
            {/*    {[...Array(totalPage)].map((e, i) => (*/}
            {/*        <button*/}
            {/*            key={i}*/}
            {/*            className={page === i + 1 ? "active-page" : ""}*/}
            {/*            onClick={() => setPage(i + 1)}*/}
            {/*        >*/}
            {/*            {i + 1}*/}
            {/*        </button>*/}

            {/*    ))}*/}
            {/*</div>*/}
            <div className="pagination">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Trước
                </button>

                {[...Array(totalPage)].map((_, i) => (
                    <button
                        key={i}
                        className={page === i + 1 ? "active-page" : ""}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
                    disabled={page === totalPage}
                >
                    Sau
                </button>
            </div>

            <DeleteComponent
                deletes={deleteProduct}
                isShowModal={isShowModal}
                isCloseModal={handleCloseModal}
            />
        </div>
    );
}

export default ListComponent;



//import React, {useState, useEffect} from "react";
//import { search} from "../service/products";
// import DeleteComponent from "./DeleteComponent";
// import {Link} from "react-router-dom";
// import "./css/ListComponent.css";
//
//
// function ListComponent() {
//     const [productList, setProductList] = useState([]);
//     const [categoryList, setCategory] = useState([]);
//     const [keyword, setKeyWord] = useState("");
//     const [selectCategoryId, setSelectCategoryId] = useState("");
//     const [isShowModal, setIsShowModal] = useState(false);
//     const [deleteProduct, setDeleteProduct] = useState({
//         id: "",
//         name: "",
//         dateOfEntry: "",
//         dateIdIssue: "",
//         size: false,
//         color: [],
//         category: {
//             id: "",
//             name: ""
//         },
//         price: ""
//     });
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const list = await search('', '', 1, 2); // Gọi hàm search với tham số mặc định
//             setProductList(Array.isArray(list.products) ? list.products : []);
//             setCategory(Array.isArray(list.categories) ? list.categories : []);
//         };
//         fetchData();
//     }, [isShowModal]);
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         // const list = await getAll(1,2);
//     //         const list=await search('','',1,2)
//     //         console.log(list)
//     //         setProductList(Array.isArray(list.products) ? list.products : []);        }
//     //     fetchData();
//     //     // handleSearch();
//     // }, [isShowModal]);
//
//     const handleSearch = async () => {
//         const result = await search(keyword, selectCategoryId);
//         setProductList(result.products);
//         setCategory(result.categories);
//
//     }
//
//     const handleShowModal = (product) => {
//         setIsShowModal(pre => !pre);
//         setDeleteProduct(product);
//         console.log(deleteProduct)
//         console.log(isShowModal)
//     }
//
//     const handleCloseModal = () => {
//         setIsShowModal(pre => !pre);
//     }
//
//     //Format ngày tháng
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString("vi-VN", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//         });
//     };
//
//     //Format giá tiền
//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat("vi-VN", {
//             style: "currency",
//             currency: "VND",
//         }).format(value);
//     };
//
//     return <>
//         <div className="container py-5">
//             <h2>Danh sách</h2>
//             <hr/>
//             {/*<div>*/}
//             {/*    <Link to={"/add"}>Thêm mới</Link>*/}
//             {/*</div>*/}
//             <div>
//                 <input
//                     type={"text"}
//                     placeholder={"Nhập tên cần tìm "}
//                     value={keyword}
//                     onChange={(e) => setKeyWord(e.target.value)}
//                 />
//                 <select
//                     value={selectCategoryId}
//                     onChange={(e) => setSelectCategoryId(e.target.value)}>
//                     <option value="">Tất cả danh sách</option>
//                     {categoryList.map(cate => (
//                         <option key={cate.id} value={cate.id}>{cate.name}</option>
//                     ))}
//                 </select>
//                 <button onClick={handleSearch}>Tìm kiếm</button>
//             </div>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>STT</th>
//                     <th>Tên</th>
//                     <th>Ngày nhập</th>
//                     <th>Màu sắc</th>
//                     <th>Loại hàng</th>
//                     <th>Giá</th>
//                     <th>Cập nhật</th>
//                     <th>Chi tiết</th>
//                     <th>Xóa</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {productList.map((p, index) =>
//                     <tr key={p.id}>
//                         <td>{index + 1}</td>
//                         <td>{p.name}</td>
//                         <td>{formatDate(p.dateOfEntry)}</td>
//                         <td>{p.color}</td>
//                         <td>{p.category?.name}</td>
//                         <td>{formatCurrency(p.price)}</td>
//                         <td><button><Link to={`/detail/${p.id}`}>Chi tiết</Link></button></td>
//                         <td> <button><Link to={`/update/${p.id}`}>Cập nhật</Link></button></td>
//                         <td>
//                             <button onClick={()=>{handleShowModal(p)}}>
//                                 Xóa
//                             </button>
//                         </td>
//                     </tr>
//                 )}
//                 <tr>
//                     <td colSpan={8}>
//                         {(productList.length===0)?'Danh sách trống...':''}
//                     </td>
//                 </tr>
//                 </tbody>
//             </table>
//             <DeleteComponent
//                 deletes={deleteProduct}
//                 isShowModal={isShowModal}
//                 isCloseModal={handleCloseModal}
//             />
//         </div>
//     </>
// }
//
// export default ListComponent;