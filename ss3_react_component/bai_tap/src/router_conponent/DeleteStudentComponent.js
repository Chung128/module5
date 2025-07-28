import React from "react";
import {Button, Modal} from "react-bootstrap";
import { deleteById} from "../service/StudentRouter";

function DeleteStudentComponent({deleteStudent, isShowModal, isCloseModal}) {
    const handleDelete = () => {
        deleteById(deleteStudent.id);
        isCloseModal();
    }
    return <>
        <Modal show={isShowModal} onHide={isCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Thông Báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có muốn xóa {deleteStudent.name}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={isCloseModal}>Hủy</Button>
                <Button variant="primary" onClick={handleDelete}>Xóa</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default DeleteStudentComponent;