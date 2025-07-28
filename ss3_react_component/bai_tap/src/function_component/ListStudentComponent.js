import React, {useState, useEffect} from "react";
import {getAll} from "../service/ListStudents";
import AddComponent from "./AddStudentComponent";
import DeleteStudentComponent from "./DeleteStudentComponent";

function ListStudentComponent() {
    const [studentsList, setList] = useState([]);
    const [isLoadPage, setIsLoadPage] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({id:0,name:"",phone:"",email:""});
    useEffect(() => {
        setList([...getAll()])
    }, [isLoadPage,isShowModal])


    const handleShowModal =(student)=>{
        setIsShowModal(pre =>!pre);
        setDeleteStudent(student);
    }
    const handleCloseModal =()=>{
        setIsShowModal(pre =>!pre);
    }

    return (
        <div style={{padding: "20px"}}>
            <h2>Danh sách sinh viên</h2>
            <AddComponent setIsLoadPage={setIsLoadPage}/>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {studentsList && studentsList.map((item, i) =>
                    <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
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

export default ListStudentComponent;