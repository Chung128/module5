import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findById, updateStudent} from "../service/StudentRouter";
import {getAllClass} from "../service/ListClass";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";


const UpdateStudentComponent = () => {
    const navigate=useNavigate();
    const {id} = useParams();
    const [classList, setClassList] = useState([])
    const [student, setStudent] = useState(null);
    useEffect(() => {
        setClassList(getAllClass);
        const studentData = findById(id);
        if (studentData) {
            setStudent(studentData)
        }
    }, [id]);

    if (!student) return <p>Đang tải...</p>; //kiểm tra dữ liệu từ setStudent(findById(id)) xong mới render

    const handleUpdate = (value) => {
        const newStudent = {
            ...student,
            name: value.name || student.name,
            gender: value.gender !== '' ? value.gender === 'true' : student.gender,
            subject: value.subject.length > 0 ? value.subject : student.subject,
            className: value.className ? JSON.parse(value.className) : student.className
        };
        updateStudent(newStudent);
        toast.success("Cập nhật thành công");
        navigate("/list");
    };


    return (
        <div>
            <h2>Thêm mới</h2>
            <Formik initialValues={{
                name: '',
                gender: '',
                subject: [],
                className: ''
            }}
                    onSubmit={handleUpdate}>
                <Form>
                    <div>
                        <label htmlFor="name">Tên:</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder={student.name}
                        />
                    </div>

                    <div>
                        <label>Giới tính:</label>
                        <label>
                            <Field type="radio" name="gender" value="true" />
                            Nam
                        </label>
                        <label>
                            <Field type="radio" name="gender" value="false" />
                            Nữ
                        </label>
                    </div>

                    <div>
                        <label>Môn học:</label>
                        <label>
                            <Field type="checkbox" name="subject" value="Java" />
                            Java
                        </label>
                        <label>
                            <Field type="checkbox" name="subject" value="JS" />
                            JS
                        </label>
                        <label>
                            <Field type="checkbox" name="subject" value="C#" />
                            C#
                        </label>
                    </div>

                    <div>
                        <label>Lớp:</label>
                        <Field as="select" name="className">
                            <option value="">
                                Lớp hiện tại: {student.className.name}
                            </option>
                            {classList.map(cl => (
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
export default UpdateStudentComponent;