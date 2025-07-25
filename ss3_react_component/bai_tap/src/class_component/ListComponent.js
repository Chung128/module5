import {students} from "../service/ListStudents"
import React, {Component} from "react";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsList: students, //lấy danh sách sinh viên
            newStudent: {    //thêm mới sinh viên,k có id nếu cài tự tăng
                name: '',
                phone: '',
                email: ''
            },
            editStudent: {   // sửa sinh viên, phải có id để lấy đúng sv
                id: '',
                name: '',
                phone: '',
                email: ''
            },
            isShowAdd: false, //  hiện nút hay khong
            isShowEdit: false  //  hiện nút hay khong
        };
    }

    //lấy giá trị từ các thẻ input
    handleOnChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                [name]: value
            },
            editStudent: {
                ...this.state.editStudent,
                [name]: value
            }
        })
    }

    //thêm mới khi ấn nút
    handleAdd = (student= { name: '', phone: '', email: '' }) => {
        this.setState({
            newStudent: {...student},
            isShowAdd: true
        })
    }
    handleCreate = () => {
        const {name, phone, email} = this.state.newStudent;
        const maxId = this.state.studentsList.reduce((max, e) => Math.max(max, e.id), 0);
        const newStudents = {
            id: maxId + 1,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim()
        };
        this.setState(prevState => ({
            studentsList: [...prevState.studentsList, newStudents],
            newStudent: {name: '', phone: '', email: ''}
        }))
    }

    // Xoá sinh viên theo ID
    handleDelete = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xoá ");
        if (confirmDelete) {
            this.setState(prevState => ({
                studentsList: prevState.studentsList.filter(student => student.id !== id)
            }));
        }
    };

    // sửa sinh viên theo ID  và hiện khi ấn nút
    handleEdit = (student) => {
        this.setState({
            editStudent: {...student},
            isShowEdit: true
        })
    }
    handleUpdate = () => {
        const {id, name, phone, email} = this.state.editStudent;
        this.setState(prevState => ({
            studentsList: prevState.studentsList.map(student =>
                student.id === id ? {...student, name, phone, email} : student
            ),
            editStudent: {id: '', name: '', phone: '', email: ''},
            isShowEdit: false
        }))
    }

    formEdit() {
        const {id, name, phone, email} = this.state.editStudent;
        return (
            <div style={{marginTop: "30px"}}>
                <h3>Cập nhật</h3>
                <input type="text" value={id} disabled/>
                <input type="text" name="name" value={name} onChange={this.handleOnChange}/>
                <input type="text" name="phone" value={phone} onChange={this.handleOnChange}/>
                <input type="email" name="email" value={email} onChange={this.handleOnChange}/>
                <button onClick={this.handleUpdate}>Cập nhật</button>
            </div>
        )
    }

    formAdd() {
        const {name, phone, email} = this.state.newStudent;
        return (
            <div style={{marginTop: "30px"}}>
                <input type="text" name="name" value={name} onChange={this.handleOnChange}/>
                <input type="text" name="phone" value={phone} onChange={this.handleOnChange}/>
                <input type="email" name="email" value={email} onChange={this.handleOnChange}/>
                <button onClick={this.handleCreate}>Thêm mới</button>
            </div>
        )
    }

    render() {
        const {studentsList, newStudent, editStudent, isShowAdd, isShowEdit} = this.state;

        return (
            <div style={{padding: "20px"}}>
                <h2>Danh sách sinh viên</h2>
                <button onClick={this.handleAdd}>Thêm mới</button>
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
                    {studentsList.map((item, i) =>
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => this.handleEdit(item)}>Sửa</button>
                                <button onClick={() => this.handleDelete(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div>
                    {isShowAdd && this.formAdd()}
                    {isShowEdit && this.formEdit()}
                </div>
            </div>
        )
    }
}

export default ListComponent;