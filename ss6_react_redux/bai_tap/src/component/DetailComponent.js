import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findById } from "../service/products";
import "./css/DetailComponent.css";

function DetailComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productList, setProductList] = useState({
        id: '',
        name: '',
        dateOfEntry: '',
        dateOfIssue: '',
        size: '',
        color: [],
        category: {
            id: '',
            name: ''
        },
        price: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            let pro = await findById(id);
            setProductList(pro);
        };
        fetchData();
    }, []);

    // Format ngày tháng
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (date === null) {
            return '';
        }
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Format giá tiền
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    if (!productList || !productList.id) {
        return (
            <div className="detail-container">
                <div className="empty-list">
                    Product not found
                </div>
            </div>
        );
    }

    return (
        <div className="detail-container justify-content-center">
            <h2 className="list-title">Chi tiết sản phẩm</h2>
            <hr className="list-hr" />
            <div className="detail-content">
                <div className="detail-item"><strong>ID :</strong> {productList.id}</div>
                <div className="detail-item"><strong>Tên sản phẩm :</strong> {productList.name}</div>
                <div className="detail-item"><strong>Ngày nhập :</strong> {formatDate(productList.dateOfEntry)}</div>
                <div className="detail-item"><strong>Kích thước :</strong> {productList.size ? 'Lớn' : 'Nhỏ'}</div>
                <div className="detail-item"><strong>Màu sắc :</strong> {productList.color.join(', ')}</div>
                <div className="detail-item"><strong>Loại sản phẩm :</strong> {productList.category?.name}</div>
                <div className="detail-item"><strong>Giá bán :</strong> {formatCurrency(productList.price)}</div>
            </div>
            <div className="detail-actions">
                <button onClick={() => navigate("/list")} className="search-button">
                    ← Back to list
                </button>
            </div>
        </div>
    );
}

export default DetailComponent;




// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import {findById} from "../service/products";
// import {Alert, Button, Card, Col, Container, Row} from "react-bootstrap";
//
// function DetailComponent() {
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const [productList, setProductList] = useState({
//         id: '',
//         name: '',
//         dateOfEntry: '',
//         dateOfIssue: '',
//         size: '',
//         color: [],
//         category: {
//             id: '',
//             name: ''
//         },
//         price: ''
//     });
//     useEffect(() => {
//         const fetchData = async () => {
//             let pro = await findById(id);
//             setProductList(pro);
//         }
//         fetchData()
//     }, []);
//
//     //Format ngày tháng
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         if (date === null) {
//             return '';
//         }
//         return date.toLocaleDateString("vi-VN", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//         });
//     };
//
//     //Format giá tiền
//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat("vi-VN", {
//             style: "currency",
//             currency: "VND",
//         }).format(value);
//     };
//
//
//     if (!productList) {
//         return (
//             <Alert variant="danger" className="mt-3 text-center">
//                 Product not found
//             </Alert>
//         );
//     }
//
//     return <>
//         <Container className="mt-5">
//             <h2>Chi tiết sản phẩm</h2>
//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => navigate("/list")}>
//                     ← Back to list
//                 </Button>
//             </div>
//             <hr/>
//             <Row className="justify-content-center">
//                 <Col md={8}>
//                     <Card className="shadow-sm border-0">
//                         <Card.Text><strong>ID : </strong>{productList.id}</Card.Text>
//                         <Card.Text><strong>Tên sản phẩm : </strong>{productList.name}</Card.Text>
//                         <Card.Text><strong>Ngày nhập : </strong>{formatDate(productList.dateOfEntry)}</Card.Text>
//                         <Card.Text><strong>Kích thước : </strong>{productList.size ? 'Lớn' : 'Nhỏ'}</Card.Text>
//                         <Card.Text><strong>Màu sắc : </strong>{productList.color}</Card.Text>
//                         <Card.Text><strong>Loại sản phẩm : </strong>{productList.category?.name}</Card.Text>
//                         <Card.Text><strong>Giá bán : </strong>{formatCurrency(productList.price)}</Card.Text>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     </>
// }
//
// export default DetailComponent;