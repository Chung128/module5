import React, {useState, useEffect} from "react";
import {getAll, searchStudent} from "../service/StudentRouter";
import DeleteStudentComponent from "./DeleteStudentComponent";
import {Link} from "react-router-dom";

function ListStudentComponentRouter() {
    const [studentsList, setList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({
        id: '',
        name: '',
        gender: '',
        subject: [],
        className: {
            id: '',
            name: ''
        }});
    const [nameKeyword, setNameKeyword] = useState("");
    const [classKeyword, setClassKeyword] = useState("");
    useEffect(() => {
        setList([...getAll()])
    }, [isShowModal])


    const handleShowModal =(student)=>{
        setIsShowModal(pre =>!pre);
        setDeleteStudent(student);
    }
    const handleCloseModal =()=>{
        setIsShowModal(pre =>!pre);
    }

    const handleSearch = () => {
        const result = searchStudent(nameKeyword, classKeyword);
        setList(result);
    };

    return (
        <div style={{padding: "20px"}}>
            <h2>Danh sách sinh viên</h2>

            {/* Ô tìm kiếm */}
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Tìm theo tên"
                    value={nameKeyword}
                    onChange={(e) => setNameKeyword(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Tìm theo lớp"
                    value={classKeyword}
                    onChange={(e) => setClassKeyword(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giới tính</th>
                    <th>Môn học</th>
                    <th>Học lớp</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {studentsList && studentsList.map((item, i) =>
                    <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.gender?'Nam':'Nữ'}</td>
                        <td>{item.subject}</td>
                        <td>{item.className.name}</td>
                        <td>
                            <button><Link to={`/detail/${item.id}`}>Chi tiết</Link></button>
                            <button><Link to={`/update/${item.id}`}>Cập nhật</Link></button>
                            <button onClick={()=>{handleShowModal(item)}}>Delete</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <DeleteStudentComponent
                deleteStudent ={deleteStudent}
                isShowModal ={isShowModal}
                isCloseModal ={handleCloseModal}
            />
        </div>
    )
}

export default ListStudentComponentRouter;