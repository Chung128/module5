import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {add, getAll, getAllLoaiSach} from "../service/data";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import './css/AddComponent.css';


function AddComponent() {
    const navigate = useNavigate();
    const [theLoaiList, setTheLoaiList] = useState([]);
    const [sachList, setSachList] = useState({
        maSach: '',
        tensach: '',
        ngayNhap: '',
        theLoai: {
            id: '',
            name: ''
        },
        soLuong: ''
    });

    useEffect(() => {
        const fetchDataCate = async () => {
            const result = await getAllLoaiSach();
            setTheLoaiList(result);
            console.log(result);
        };
        fetchDataCate();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAll();
            setSachList(result);
        };
        fetchData();
    }, []);

    const handleAdd = async (value) => {
        try {
            value = {
                ...value,
                theLoai: JSON.parse(value.theLoai)
            };
            await add(value);
            navigate("/list");
            toast.success("Thêm mới thành công !");
            console.log(value);
        } catch (error) {
            toast.error("Thêm mới thất bại! Vui lòng kiểm tra lại kết nối hoặc dữ liệu.");
            console.error("Lỗi thêm mới:", error);
        }
    };


    // const handleAdd = async (value) => {
    //     value = {
    //         ...value,
    //         theLoai: JSON.parse(value.theLoai)
    //     };
    //     await add(value);
    //     navigate("/list");
    //     toast.success("Thêm mới thành công !");
    //     console.log(value);
    // };

    const handleValidate = Yup.object({
        maSach: Yup.string().required("Không được để trống").matches(/^BO-[0-9]{4}$/,"Nhập đúng định dạng BO-XXXX "),
        tensach: Yup.string().required("Không được để trống").max(100,"không được dài quá 100 kí tự!"),
        ngayNhap: Yup.date().required("Chọn ngày nhập")
            .typeError("Ngày nhập không hợp lệ")
            .max(new Date(), "Ngày nhập phải sau hoặc bằng ngày hôm nay"),
        soLuong: Yup.number()
            .typeError("Số lượng phải là số")
            .required("Không được để trống")
            .positive("Số lượng phải lớn hơn 0")
    });

    return (
        <div className="add-container">
            <h2>Thêm mới</h2>
            <div className="btn-back">
                <Button variant="secondary" onClick={() => navigate("/list")}>
                    ← Quay lại
                </Button>
            </div>
            <Formik
                initialValues={{
                    ...sachList,
                }}
                onSubmit={handleAdd}
                validationSchema={handleValidate}
            >
                <Form>
                    <Field type={'hidden'} name={'id'}/>
                    <div className="form-group">
                        <label>Mã sách</label>
                        <Field type={'text'} name={'maSach'}/>
                        <ErrorMessage name="maSach" component={'div'} className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Tên sách</label>
                        <Field type={'text'} name={'tensach'}/>
                        <ErrorMessage name="tensach" component={'div'} className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Ngày nhập</label>
                        <Field type={'date'} name={'ngayNhap'}/>
                        <ErrorMessage name="ngayNhap" component={'div'} className="error-message"/>
                    </div>
                    <div className="form-group">
                        <label>Loại sách</label>
                        <Field as={'select'} name={'theLoai'}>
                            <option value="">--Chọn loại sách--</option>
                            {theLoaiList.map(cll => (
                                <option key={cll.id} value={JSON.stringify(cll)}>
                                    {cll.name}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div className="form-group">
                        <label>Số lượng</label>
                        <Field type={'text'} name={'soLuong'}/>
                        <ErrorMessage name="soLuong" component={'div'} className="error-message"/>
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