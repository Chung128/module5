import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findById, getAllCategory, update } from "../service/products";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./css/UpdateComponent.css";

function UpdateComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const fetchDataCategory = async () => {
            const cate = await getAllCategory();
            setCategoryList(cate);
        };
        fetchDataCategory();
    }, []);

    useEffect(() => {
        const fetchDataProduct = async () => {
            const pro = await findById(id);
            setProductList(pro);
        };
        fetchDataProduct();
    }, []);

    if (!productList) {
        return <div className="update-container"><div className="empty-list">Đang tải...</div></div>;
    }

    const handleUpdate = async (value) => {
        const newProduct = {
            ...productList,
            name: value.name || productList.name,
            dateOfEntry: value.dateOfEntry || productList.dateOfEntry,
            dateOfIssue: value.dateOfIssue || productList.dateOfIssue,
            size: value.size !== '' ? value.size === 'true' : productList.size,
            color: value.color.length > 0 ? value.color : productList.color,
            category: value.category ? JSON.parse(value.category) : productList.category,
            price: value.price || productList.price
        };
        await update(newProduct.id, newProduct);
        toast.success('Cập nhật thành công.');
        navigate('/list');
    };

    return (
        <div className="update-container">
            <h2 className="list-title">Cập nhật</h2>
            <hr className="list-hr" />
            <Formik
                initialValues={{
                    name: '',
                    dateOfIssue: '',
                    size: '',
                    color: [],
                    category: '',
                    price: ''
                }}
                onSubmit={handleUpdate}
            >
                <Form className="update-form">
                    <div className="form-group">
                        <label htmlFor="name">Tên:</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder={productList.name}
                            className="form-input"
                        />
                        <ErrorMessage name="name" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfIssue">Ngày bán:</label>
                        <Field
                            type="date"
                            name="dateOfIssue"
                            className="form-input"
                        />
                        <ErrorMessage name="dateOfIssue" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Size:</label>
                        <label>
                            <Field type="radio" name="size" value="true" className="form-radio" />
                            Lớn
                        </label>
                        <label>
                            <Field type="radio" name="size" value="false" className="form-radio" />
                            Nhỏ
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Màu sắc:</label>
                        <label>
                            <Field type="checkbox" name="color" value="Vàng" className="form-checkbox" />
                            Vàng
                        </label>
                        <label>
                            <Field type="checkbox" name="color" value="Đen" className="form-checkbox" />
                            Đen
                        </label>
                        <label>
                            <Field type="checkbox" name="color" value="Nâu" className="form-checkbox" />
                            Nâu
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Loại sản phẩm:</label>
                        <Field as="select" name="category" className="form-input">
                            <option value="">
                                Sản phẩm hiện tại: {productList?.category?.name}
                            </option>
                            {categoryList.map(cl => (
                                <option key={cl.id} value={JSON.stringify(cl)}>
                                    {cl.name}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Giá:</label>
                        <Field
                            type="text"
                            name="price"
                            placeholder={productList.price}
                            className="form-input"
                        />
                        <ErrorMessage name="price" component="div" className="error-message" />
                    </div>
                    <button type="submit" className="submit-button">Cập nhật</button>
                </Form>
            </Formik>
            <div >
                <button onClick={() => navigate("/list")} className="search-button">
                    ← Back to list
                </button>
            </div>
        </div>
    );
}

export default UpdateComponent;



// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import {findById, getAll, getAllCategory, update} from "../service/products";
// import {toast} from "react-toastify";
// import {ErrorMessage, Field, Form, Formik} from "formik";
// import {Button} from "react-bootstrap";
//
// function UpdateComponent() {
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const [productList, setProductList] = useState(null);
//     const [categoryList, setCategoryList] = useState([]);
//
//     useEffect(() => {
//         const fetchDataCategory = async () => {
//             const cate = await getAllCategory();
//             setCategoryList(cate);
//         }
//         fetchDataCategory();
//     }, []);
//
//     useEffect(() => {
//         const fetchDataProduct = async () => {
//             const pro = await findById(id);
//             setProductList(pro);
//         }
//         fetchDataProduct();
//     }, []);
//
//     if (!productList) {
//         return <p>Đang tải...</p> //kiểm tra dữ liệu từ setStudent(findById(id)) xong mới render
//     }
//
//     const handleUpdate = async (value) => {
//         const newProduct = {
//             ...productList,
//             name: value.name || productList.name,
//             dateOfEntry: value.dateOfEntry || productList.dateOfEntry,
//             dateOfIssue: value.dateOfIssue || productList.dateOfIssue,
//             size: value.size !== '' ? value.size === 'true' : productList.size,
//             color: value.color.length > 0 ? value.color : productList.color,
//             category: value.category ? JSON.parse(value.category) : productList.category,
//             price: value.price || productList.price
//         };
//         await update(newProduct.id,newProduct);
//         toast.success('Cập nhật thành công .');
//         navigate('/list');
//     };
//
//     return (
//         <div>
//             <h2>Cập nhật</h2>
//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => navigate("/list")}>
//                     ← Back to list
//                 </Button>
//             </div>
//             <Formik initialValues={{
//                 name: '',
//                 dateOfIssue:'',
//                 size:'',
//                 color: [],
//                 category: '',
//                 price:''
//             }}
//                     onSubmit={handleUpdate}
//                     // validationSchema={handleValidate}
//             >
//                 <Form>
//                     <div>
//                         <label htmlFor="name">Tên:</label>
//                         <Field
//                             type="text"
//                             name="name"
//                             placeholder={productList.name}
//                         />
//                         <ErrorMessage name="name" component={'div'} style={{color: 'red'}}/>
//                     </div>
//                     <div>
//                         <label htmlFor="name">Ngày bán :</label>
//                         <Field
//                             type="date"
//                             name="dateOfIssue"
//                         />
//                         <ErrorMessage name="name" component={'div'} style={{color: 'red'}}/>
//                     </div>
//                     <div>
//                         <label>size:</label>
//                         <label>
//                             <Field type="radio" name="size" value="true"/>
//                             Lớn
//                         </label>
//                         <label>
//                             <Field type="radio" name="size" value="false"/>
//                             Nhỏ
//                         </label>
//                     </div>
//
//                     <div>
//                         <label>Màu sắc:</label>
//                         <label>
//                             <Field type="checkbox" name="color" value="Vàng"/>
//                             Vàng
//                         </label>
//                         <label>
//                             <Field type="checkbox" name="color" value="Đen"/>
//                             Đen
//                         </label>
//                         <label>
//                             <Field type="checkbox" name="color" value="Nâu"/>
//                             Nâu
//                         </label>
//                     </div>
//
//                     <div>
//                         <label>Loại sản phẩm :</label>
//                         <Field as="select" name="category">
//                             <option value="">
//                                Sản phẩm hiện tại: {productList?.category?.name}
//                             </option>
//                             {categoryList.map(cl => (
//                                 <option key={cl.id} value={JSON.stringify(cl)}>
//                                     {cl.name}
//                                 </option>
//                             ))}
//                         </Field>
//                     </div>
//
//                     <div>
//                         <label htmlFor="name">Tên:</label>
//                         <Field
//                             type="text"
//                             name="price"
//                             placeholder={productList.price}
//                         />
//                         <ErrorMessage name="name" component={'div'} style={{color: 'red'}}/>
//                     </div>
//                     <button type="submit">Cập nhật</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
//
// }
//
// export default UpdateComponent;