import React, {useRef} from "react";
import {addNewStudent, getAll} from "../service/ListStudents";

function AddComponent({setIsLoadPage}) {
    const idRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    const handleAdd = () => {
        let newStudent = {
            id: idRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value
        }
        addNewStudent(newStudent);
        console.log(getAll());
        setIsLoadPage(prev => !prev)
    }
    return (
        <div>
            <input ref={idRef} placeholder={'Nhập id'}/>
            <input ref={nameRef} placeholder={'Nhập tên'}/>
            <input ref={phoneRef} placeholder={'Nhập sđt'}/>
            <input ref={emailRef} placeholder={'Nhập email'}/>
            <button onClick={handleAdd}>Lưu</button>
        </div>
    )
}

export default React.memo(AddComponent);