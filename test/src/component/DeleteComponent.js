import {deleteById} from "../service/hoaDon";
import {Button, Modal} from "react-bootstrap";
import React from "react";

function DeleteComponent({deletes, isShowModal, isCloseModal}) {
    const handleDelete=async ()=>{
        await deleteById(deletes.id);
        isCloseModal();
    }
    return <>
        <Modal show={isShowModal} onHide={isCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Thông Báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có muốn xóa {deletes.name}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={isCloseModal}>Hủy</Button>
                <Button variant="primary" onClick={handleDelete}>Xóa</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default DeleteComponent;