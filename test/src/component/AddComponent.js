import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {add, getAll, getAllKhach} from "../service/hoaDon";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";

function AddComponent() {
    const navigate = useNavigate();
    const [khachHang, setKhachHang] = useState([]);
    const [hoaDonList, setHoaDonList] = useState({
        maHoaDOn: "",
        soKW: "",
        donGia: "",
        tongTien: "",
        thang: "",
        khachHang: {
            id: "",
            name: "",
            diaChi: ""
        }
    });

    useEffect( () => {
        const fetchDataCate = async () => {
            const result = await getAllKhach();
            setKhachHang(result)
            console.log(result)
        }
        fetchDataCate();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAll();
            setHoaDonList(result)
        }
        fetchData()
    }, []);

    const handleAdd = async (value) => {
        const tong=(value.soKW)*(value.donGia);
        value = {
            ...value,
            tongTien:tong,
            khachHang: JSON.parse(value.khachHang)
        }
        await add(value);
        navigate("/list");
        toast.success("Thêm mới thành công !")
        console.log(value)
    }

    const handleValidate = Yup.object({
        maHoaDon: Yup.string().required("Không được để trống").matches(/^MHD-[0-9]{4}$/,'Nhập theo định dạng MHD-XXXX'),
        // .matches(/^[A-Z][a-z\d]*(\s[A-Z][a-z\d]*)*$/, 'Nhập tên sai định dạng'),
        thang: Yup.date()
            .required("Vui lòng chọn ngày nhập")
            .typeError("Ngày nhập không hợp lệ"),
        // dateOfIssue: Yup.date()
        //     .typeError("Ngày bán không hợp lệ")
        //     .min(Yup.ref("dateOfEntry"), "Ngày bán phải sau hoặc bằng ngày nhập"),
        // size: Yup.string().required("Chọn kích thước."),
        // color: Yup.array().min(1, "Chọn ít nhất 1 màu"),
        // khachHang: Yup.number().required("Vui lòng chọn loại sản phẩm."),
        soKW: Yup.number().typeError("Giá phải là số")
            .required("Không được để trống")
            .positive("Giá phải lớn hơn 0"),
        donGia: Yup.number().typeError("Giá phải là số")
            .required("Không được để trống")
            .positive("Giá phải lớn hơn 0")
    })

    return (
        <div >
            <h2>Thêm mới</h2>
            <div className="mt-4">
                <Button  onClick={() => navigate("/list")}>
                    ← Back to list
                </Button>
            </div>
            <Formik initialValues={{
                ...hoaDonList,
                // id: generateNextId()
            }}
                    onSubmit={handleAdd}
                    validationSchema={handleValidate}
            >
                <Form>
                    <Field type={'hidden'} name={'id'}/>
                    <div>
                        <label>Mã hóa đơn</label>
                        <Field type={'text'} name={'maHoaDon'}/>
                        <ErrorMessage name="maHoaDon" component={'div'} style={{color: 'red'}}/>
                    </div>
                    <div>
                        <label>Số kw tiêu thụ</label>
                        <Field type={'text'} name={'soKW'}/>
                        <ErrorMessage name="soKW" component={'div'} style={{color: 'red'}}/>

                    </div>
                    <div>
                        <label>Đơn giá</label>
                        <Field type={'text'} name={'donGia'}/>
                        <ErrorMessage name="donGia" component={'div'} style={{color: 'red'}}/>

                    </div>
                    <div>
                        <label>Tháng</label>
                        <Field type={'date'} name={'thang'}/>
                        <ErrorMessage name="thang" component={'div'} style={{color: 'red'}}/>

                    </div>
                    {/*<div>*/}
                    {/*    <label>Ngày bán</label>*/}
                    {/*    <Field type={'date'} name={'dateOfIssue'}/>*/}
                    {/*    <ErrorMessage name="dateOfIssue" component={'div'} style={{color: 'red'}}/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Size</label>*/}
                    {/*    <Field type={'radio'} name={'size'} value="true"/>Lớn*/}
                    {/*    <Field type={'radio'} name={'size'} value='false'/>Nhỏ*/}
                    {/*    <ErrorMessage name="size" component={'div'} style={{color: 'red'}}/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Màu sắc : </label>*/}
                    {/*    <Field type={'checkbox'} name={'color'} value='Đỏ'/>Đỏ*/}
                    {/*    <Field type={'checkbox'} name={'color'} value='Vàng'/>Vàng*/}
                    {/*    <Field type={'checkbox'} name={'color'} value='Xanh'/>Xanh*/}
                    {/*    <Field type={'checkbox'} name={'color'} value='Tím'/>Tím*/}
                    {/*    <ErrorMessage name="color" component={'div'} style={{color: 'red'}}/>*/}
                    {/*</div>*/}
                    <div>
                        <label>Khách hàng</label>
                        <Field as={'select'} name={'khachHang'}>
                            <option value="">--Chọn khách hàng--</option>
                            {khachHang.map(cll => (
                                <option key={cll.id} value={JSON.stringify(cll)}>{cll.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="khachHang" component={'div'} style={{color: 'red'}}/>
                    </div>
                    {/*<div>*/}
                    {/*    <label>Giá bán</label>*/}
                    {/*    <Field type={'text'} name={'price'}/>*/}
                    {/*    <ErrorMessage name="price" component={'div'} style={{color: 'red'}}/>*/}
                    {/*</div>*/}
                    <button type="submit">Thêm mới</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddComponent;