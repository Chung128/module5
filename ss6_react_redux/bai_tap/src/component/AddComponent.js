import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { add, getAll, getAllCategory } from "../service/products";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import './css/AddComponent.css'; // Import CSS

function AddComponent() {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState({
        name: '',
        dateOfEntry: '',
        dateOfIssue: '',
        size: '',
        color: [],
        category: {
            id: '',
            name: ''
        },
        price: ''
    });

    useEffect(() => {
        const fetchDataCate = async () => {
            const result = await getAllCategory();
            setCategoryList(result);
            console.log(result);
        };
        fetchDataCate();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAll();
            setProductList(result);
        };
        fetchData();
    }, []);

    const handleAdd = async (value) => {
        value = {
            ...value,
            category: JSON.parse(value.category)
        };
        await add(value);
        navigate("/list");
        toast.success("Thêm mới thành công !");
        console.log(value);
    };

    const handleValidate = Yup.object({
        name: Yup.string().required("Không được để trống"),
        dateOfEntry: Yup.date()
            .required("Vui lòng chọn ngày nhập")
            .typeError("Ngày nhập không hợp lệ"),
        dateOfIssue: Yup.date()
            .typeError("Ngày bán không hợp lệ")
            .min(Yup.ref("dateOfEntry"), "Ngày bán phải sau hoặc bằng ngày nhập"),
        size: Yup.string().required("Chọn kích thước."),
        color: Yup.array().min(1, "Chọn ít nhất 1 màu"),
        price: Yup.number()
            .typeError("Giá phải là số")
            .required("Không được để trống")
            .positive("Giá phải lớn hơn 0")
    });

    return (
        <div className="add-container">
            <h2>Thêm mới</h2>
            <div className="btn-back">
                <Button variant="secondary" onClick={() => navigate("/list")}>
                    ← Back to list
                </Button>
            </div>
            <Formik
                initialValues={{
                    ...productList,
                }}
                onSubmit={handleAdd}
                validationSchema={handleValidate}
            >
                <Form>
                    <Field type={'hidden'} name={'id'} />
                    <div className="form-group">
                        <label>Tên</label>
                        <Field type={'text'} name={'name'} />
                        <ErrorMessage name="name" component={'div'} className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Ngày nhập</label>
                        <Field type={'date'} name={'dateOfEntry'} />
                        <ErrorMessage name="dateOfEntry" component={'div'} className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Size</label>
                        <div className="radio-group">
                            <label>
                                <Field type={'radio'} name={'size'} value="true" /> Lớn
                            </label>
                            <label>
                                <Field type={'radio'} name={'size'} value="false" /> Nhỏ
                            </label>
                        </div>
                        <ErrorMessage name="size" component={'div'} className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Màu sắc</label>
                        <div className="checkbox-group">
                            <label>
                                <Field type={'checkbox'} name={'color'} value="Đỏ" /> Đỏ
                            </label>
                            <label>
                                <Field type={'checkbox'} name={'color'} value="Vàng" /> Vàng
                            </label>
                            <label>
                                <Field type={'checkbox'} name={'color'} value="Xanh" /> Xanh
                            </label>
                            <label>
                                <Field type={'checkbox'} name={'color'} value="Tím" /> Tím
                            </label>
                        </div>
                        <ErrorMessage name="color" component={'div'} className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Loại sản phẩm</label>
                        <Field as={'select'} name={'category'}>
                            <option value="">--Chọn loại sản phẩm--</option>
                            {categoryList.map(cll => (
                                <option key={cll.id} value={JSON.stringify(cll)}>
                                    {cll.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component={'div'} className="error-message" />
                    </div>
                    <div className="form-group">
                        <label>Giá bán</label>
                        <Field type={'text'} name={'price'} />
                        <ErrorMessage name="price" component={'div'} className="error-message" />
                    </div>
                    <button type="submit" className="btn-submit">
                        Thêm mới
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddComponent;