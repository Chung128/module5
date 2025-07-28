import React, {useEffect, useState} from "react";
import {getAllClass} from "../service/ListClass";
import {addNewStudent, getAll} from "../service/StudentRouter";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as Yup from "yup";

function AddStudentComponent() {
    const navigate = useNavigate();
    const [classList, setClassList] = useState([])
    useEffect(() => {
        setClassList(getAllClass())
    }, []);
    const [student, setStudent] = useState({
        id: '',
        name: '',
        gender: false,
        subject: [],
        className: {
            id: '',
            name: ''
        },
    });

    const generateNextId = () => {
        if (getAll().length === 0) return 1;
        return Math.max(...getAll().map(s => s.id)) + 1;
    };

    const handleAdd = (value) => {
        value = {
            ...value,
            gender: value.gender === "true",
            className: JSON.parse(value.className)
        }

        addNewStudent(value);
        navigate("/list");
        toast.success("Thêm mới thành công");
    }

    const handleValidate = Yup.object({
        name: Yup.string().required('Không được để trống'),
        // .matches(/^[A-Z][a-z]\s[A-Z][a-z]*/,'Nhập tên sai định dạng'),
        gender: Yup.string().required("Chọn giới tính"),
        subject: Yup.array().min(1, "Chọn ít nhất 1 môn học"),
    })

    return (
        <div>
            <h2>Thêm mới</h2>
            <Formik initialValues={{
                ...student,
                id: generateNextId()
            }}
                    onSubmit={handleAdd}
                    validationSchema={handleValidate}
            >
                <Form>
                        <Field type={'hidden'} name={'id'}/>
                    <div>
                        <label>Tên</label>
                        <Field type={'text'} name={'name'}/>
                        <ErrorMessage name="name" component={'div'} style={{color: 'red'}}/>

                    </div>
                    <div>
                        <label>Giới tính</label>
                        <Field type={'radio'} name={'gender'} value="true"/>Nam
                        <Field type={'radio'} name={'gender'} value='false'/>Nữ
                        <ErrorMessage name="gender" component={'div'} style={{color: 'red'}}/>
                    </div>
                    <div>
                        <label>Môn học : </label>
                        <Field type={'checkbox'} name={'subject'} value='Java'/>Java
                        <Field type={'checkbox'} name={'subject'} value='JS'/>JS
                        <Field type={'checkbox'} name={'subject'} value='C#'/>C#
                        <ErrorMessage name="subject" component={'div'} style={{color: 'red'}}/>
                    </div>
                    <div>
                        <label>Học lớp</label>
                        <Field as={'select'} name={'className'}>
                            <option value="">--Chọn lớp--</option>
                            {classList.map(cll => (
                                <option key={cll.id} value={JSON.stringify(cll)}>{cll.name}</option>
                            ))}
                        </Field>
                    </div>
                    <button type={"submit"}>Thêm mới</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddStudentComponent;