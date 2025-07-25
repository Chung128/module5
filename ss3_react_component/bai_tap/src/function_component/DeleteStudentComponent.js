import React from "react";
import {Button,Modal} from "react-bootstrap";
import {getAll,deleteById} from "../service/ListStudents";

function DeleteStudentComponent(deleteStudent,isShowModel,isCloseModal) {
    const handleDelete=()=>{
        deleteById(deleteStudent.id);
        isCloseModal();
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có muốn xóa {deleteStudent.name}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={isCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleDelete}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default DeleteStudentComponent;