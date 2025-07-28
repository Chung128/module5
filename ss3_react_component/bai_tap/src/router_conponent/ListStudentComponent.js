import React, {useState, useEffect} from "react";
import {getAll, searchStudent} from "../service/StudentRouter";
import DeleteStudentComponent from "./DeleteStudentComponent";
import {Link} from "react-router-dom";

function ListStudentComponentRouter() {
    const [studentsList, setList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({
        id: '',
        name: '',
        gender: '',
        subject: [],
        className: {
            id: '',
            name: ''
        }
    });
    const [nameKeyword, setNameKeyword] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAll();
            setList(list);
        };
        fetchData();
        handleSearch();
    }, [isShowModal]);

    const handleShowModal = (student) => {
        setIsShowModal(pre => !pre);
        setDeleteStudent(student);
    };

    const handleCloseModal = () => {
        setIsShowModal(pre => !pre);
    };

    const handleSearch = async () => {
        const result = await searchStudent(nameKeyword, selectedClassId);
        setList(result.students);
        setClassList(result.classList);
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Danh sách sinh viên</h2>

            {/* Search Section */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm theo tên"
                                value={nameKeyword}
                                onChange={(e) => setNameKeyword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={selectedClassId}
                                onChange={(e) => setSelectedClassId(e.target.value)}
                            >
                                <option value="">-- Tất cả lớp --</option>
                                {classList.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Môn học</th>
                        <th scope="col">Học lớp</th>
                        <th scope="col">Chi tiết</th>
                        <th scope="col"> Cập nhật</th>
                        <th scope="col">Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentsList && studentsList.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                            <td>{item.subject.join(", ")}</td>
                            <td>{item.className?.name || 'N/A'}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <Link
                                        to={`/detail/${item.id}`}
                                        className="btn btn-success btn-sm"
                                    >
                                        Chi tiết
                                    </Link>
                                </div>
                            </td>
                            <td>
                                <div className="btn-group" role="group">
                                    <Link
                                        to={`/update/${item.id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Cập nhật
                                    </Link>
                                </div>
                            </td>
                            <td>    
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleShowModal(item)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <DeleteStudentComponent
                deleteStudent={deleteStudent}
                isShowModal={isShowModal}
                isCloseModal={handleCloseModal}
            />
        </div>
    );
}

export default ListStudentComponentRouter;


// import React, {useState, useEffect} from "react";
// import {getAll, searchStudent} from "../service/StudentRouter";
// import DeleteStudentComponent from "./DeleteStudentComponent";
// import {Link} from "react-router-dom";
//
// function ListStudentComponentRouter() {
//     const [studentsList, setList] = useState([]);
//     const [classList, setClassList] = useState([]);
//     const [isShowModal, setIsShowModal] = useState(false);
//     const [deleteStudent, setDeleteStudent] = useState({
//         id: '',
//         name: '',
//         gender: '',
//         subject: [],
//         className: {
//             id: '',
//             name: ''
//         }});
//     const [nameKeyword, setNameKeyword] = useState("");
//     const [selectedClassId, setSelectedClassId] = useState("");
//     useEffect( () => {
//         const fetchData = async () => {
//             const list = await getAll();
//             setList(list);
//         }
//         // setList([...getAll()])
//          fetchData();
//         handleSearch();  // sẽ vừa load danh sách sinh viên vừa load danh sách lớp
//     }, [isShowModal])
//
//
//     const handleShowModal =(student)=>{
//         setIsShowModal(pre =>!pre);
//         setDeleteStudent(student);
//     }
//     const handleCloseModal =()=>{
//         setIsShowModal(pre =>!pre);
//     }
//
//     const handleSearch = async () => {
//         const result = await searchStudent(nameKeyword, selectedClassId);
//         setList(result.students);
//         setClassList(result.classList);
//
//        //1 trường // const result = searchStudent(nameKeyword);
//         //  setList(await result);
//     };
//
//     return (
//         <div style={{padding: "20px"}}>
//             <h2>Danh sách sinh viên</h2>
//
//             {/* Ô tìm kiếm */}
//             <div style={{ marginBottom: "10px" }}>
//                 <input
//                     type="text"
//                     placeholder="Tìm theo tên"
//                     value={nameKeyword}
//                     onChange={(e) => setNameKeyword(e.target.value)}
//                     style={{ marginRight: "10px" }}
//                 />
//                 <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)}>
//                     <option value="">-- Tất cả lớp --</option>
//                     {classList.map(cls => (
//                         <option key={cls.id} value={cls.id}>{cls.name}</option>
//                     ))}
//                 </select>
//                 <button onClick={handleSearch}>Tìm kiếm</button>
//             </div>
//
//             <table border="1" cellPadding="10" cellSpacing="0">
//                 <thead>
//                 <tr>
//                     <th>STT</th>
//                     <th>ID</th>
//                     <th>Tên</th>
//                     <th>Giới tính</th>
//                     <th>Môn học</th>
//                     <th>Học lớp</th>
//                     <th>Hành động</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {studentsList && studentsList.map((item, i) =>
//                     <tr key={item.id}>
//                         <td>{i + 1}</td>
//                         <td>{item.id}</td>
//                         <td>{item.name}</td>
//                         <td>{item.gender?'Nam':'Nữ'}</td>
//                         <td>{item.subject}</td>
//                         <td>{item.className?.name}</td>
//                         <td>
//                             <button><Link to={`/detail/${item.id}`}>Chi tiết</Link></button>
//                             <button><Link to={`/update/${item.id}`}>Cập nhật</Link></button>
//                             <button onClick={()=>{handleShowModal(item)}}>Delete</button>
//                         </td>
//                     </tr>
//                 )}
//                 </tbody>
//             </table>
//
//             <DeleteStudentComponent
//                 deleteStudent ={deleteStudent}
//                 isShowModal ={isShowModal}
//                 isCloseModal ={handleCloseModal}
//             />
//         </div>
//     )
// }
//
// export default ListStudentComponentRouter;