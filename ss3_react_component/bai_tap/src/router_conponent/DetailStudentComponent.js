import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById} from "../service/StudentRouter";

const DetailStudentComponent = () => {
    const {id} = useParams();
    const [student, setStudent] = useState({
        id: '',
        name: '',
        gender: false,
        subject: [],
        className: {
            id: '',
            name: ''
        }
    });
    useEffect(() => {
        //setStudent(findById(Number(id))); dùng 2 dấu bằng thì parse ở đây về number
       // setStudent(findById(id));
        const fetchData=async () => {
            let stu = await findById(id)
            setStudent(stu);
        }
        fetchData()
    }, [])
    return <>
        <div>
            <h2> Chi tiết</h2>
            <p>MSV : {student.id}</p>
            <p>Tên : {student.name}</p>
            <p> Giới tính : {student.gender ? 'nam' : 'nữ'}</p>
            <p>Học môn : {student.subject}</p>
            <p>Học lớp : {student.className?.name}</p>
        </div>
    </>
}
export default DetailStudentComponent;