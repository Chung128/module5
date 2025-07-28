import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findById, findClass, updateStudent} from "../service/StudentRouter";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";


const UpdateStudentComponent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [classList, setClassList] = useState([])
    const [student, setStudent] = useState(null);
    useEffect(()=>{
        const fetchClasses = async () => {
            const classes = await findClass();
            setClassList(classes);
            console.log(classes)
        };
        fetchClasses();
    },[])

    useEffect(() => {
        const fetchStudents = async () => {
            const studentData =await findById(id);
            setStudent(studentData);
        };
        fetchStudents();

    }, [id]);

    if (!student) return <p>Đang tải...</p>; //kiểm tra dữ liệu từ setStudent(findById(id)) xong mới render

    const handleUpdate = async (value) => {
        const newStudent = {
            ...student,
            name: value.name || student.name,
            gender: value.gender !== '' ? value.gender === 'true' : student.gender,
            subject: value.subject.length > 0 ? value.subject : student.subject,
            className: value.className ? JSON.parse(value.className) : student.className
        };
        await updateStudent(newStudent.id,newStudent);
        toast.success("Cập nhật thành công");
        navigate("/list");
    };


    const handleValidate = Yup.object({
        name: Yup.string().matches(/^[A-Z][a-z\d]*(\s[A-Z][a-z\d]*)*$/,'Nhập tên sai định dạng'),
    })


    return (
        <div>
            <h2>Cập nhật</h2>
            <Formik initialValues={{
                name: '',
                gender: '',
                subject: [],
                className: ''
            }}
                    onSubmit={handleUpdate}
                    validationSchema={handleValidate}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Tên:</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder={student.name}
                        />
                        <ErrorMessage name="name" component={'div'} style={{color: 'red'}}/>
                    </div>

                    <div>
                        <label>Giới tính:</label>
                        <label>
                            <Field type="radio" name="gender" value="true"/>
                            Nam
                        </label>
                        <label>
                            <Field type="radio" name="gender" value="false"/>
                            Nữ
                        </label>
                    </div>

                    <div>
                        <label>Môn học:</label>
                        <label>
                            <Field type="checkbox" name="subject" value="Java"/>
                            Java
                        </label>
                        <label>
                            <Field type="checkbox" name="subject" value="JS"/>
                            JS
                        </label>
                        <label>
                            <Field type="checkbox" name="subject" value="C#"/>
                            C#
                        </label>
                    </div>

                    <div>
                        <label>Lớp:</label>
                        <Field as="select" name="className">
                            <option value="">
                                Lớp hiện tại: {student.className?.name}
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