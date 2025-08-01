import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findById, getAll, getAllKhach, update} from "../service/hoaDon";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import * as Yup from "yup";

function UpdateComponent() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [hoaDon, setHoaDon] = useState(null);
    const [khachHang, setKhachHang] = useState([]);

    useEffect(() => {
        const fetchDataCategory = async () => {
            const khach = await getAllKhach();
            setKhachHang(khach);
        }
        fetchDataCategory();
    }, []);

    useEffect(() => {
        const fetchDataProduct = async () => {
            const pro = await findById(id);
            setHoaDon(pro);
        }
        fetchDataProduct();
        console.log(fetchDataProduct())
    }, []);

    if (!hoaDon) {
        return <p>Đang tải...</p> //kiểm tra dữ liệu từ setStudent(findById(id)) xong mới render
    }

    const handleUpdate = async (value) => {
        const hoaDonMoi = {
            ...hoaDon,
            maHoaDon: value.maHoaDon || hoaDon.maHoaDon,
            soKW: value.soKW || hoaDon.soKW,
            donGia: value.donGia || hoaDon.donGia,
            thang: value.thang || hoaDon.thang,
            size: value.size !== '' ? value.size === 'true' : hoaDon.size,
            khachHang: value.khachHang ? JSON.parse(value.khachHang) : hoaDon.khachHang
        };
        await update(hoaDonMoi.id, hoaDonMoi);
        toast.success('Cập nhật thành công .');
        navigate('/list');
    };

    const handleValidate = Yup.object({
        maHoaDon: Yup.string().matches(/^MHD-[0-9]{4}$/, 'Nhập theo định dạng MHD-XXXX'),
    });

    return (
        <div>
            <h2>Cập nhật</h2>
            <div className="mt-4">
                <Button variant="secondary" onClick={() => navigate("/list")}>
                    ← Back to list
                </Button>
            </div>
            <Formik initialValues={{
                name: '',
                dateOfIssue: '',
                size: '',
                color: [],
                category: '',
                price: ''
            }}
                    onSubmit={handleUpdate}
                    validationSchema={handleValidate}
            >
                <Form>
                    <div>
                        <label htmlFor="name">mã hóa đơn cũ:</label>
                        <Field
                            type="text"
                            name="maHoaDon"
                            placeholder={hoaDon.maHoaDon}
                        />
                        <ErrorMessage name="maHoaDon" component={'div'} style={{color: 'red'}}/>

                    </div>
                    <div>
                        <label htmlFor="name">Số kw cũ:</label>
                        <Field
                            type="number"
                            name="soKW"
                            placeholder={hoaDon.soKW}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Đơn giá cũ:</label>
                        <Field
                            type="number"
                            name="donGia"
                            placeholder={hoaDon.donGia}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Tháng :</label>
                        <Field
                            type="date"
                            name="thang"
                        />
                    </div>
                    {/*<div>*/}
                    {/*    <label>size:</label>*/}
                    {/*    <label>*/}
                    {/*        <Field type="radio" name="size" value="true"/>*/}
                    {/*        Lớn*/}
                    {/*    </label>*/}
                    {/*    <label>*/}
                    {/*        <Field type="radio" name="size" value="false"/>*/}
                    {/*        Nhỏ*/}
                    {/*    </label>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <label>Màu sắc:</label>*/}
                    {/*    <label>*/}
                    {/*        <Field type="checkbox" name="color" value="Vàng"/>*/}
                    {/*        Vàng*/}
                    {/*    </label>*/}
                    {/*    <label>*/}
                    {/*        <Field type="checkbox" name="color" value="Đen"/>*/}
                    {/*        Đen*/}
                    {/*    </label>*/}
                    {/*    <label>*/}
                    {/*        <Field type="checkbox" name="color" value="Nâu"/>*/}
                    {/*        Nâu*/}
                    {/*    </label>*/}
                    {/*</div>*/}

                    <div>
                        <label>Chọn khách hàng:</label>
                        <Field as="select" name="category">
                            <option value="">
                                Khách hàng hiện tại: {hoaDon?.khachHang?.name}
                            </option>
                            {khachHang.map(cl => (
                                <option key={cl.id} value={JSON.stringify(cl)}>
                                    {cl.name}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <button type="submit">Cập nhật</button>
                </Form>
            </Formik>
        </div>
    );

}

export default UpdateComponent;