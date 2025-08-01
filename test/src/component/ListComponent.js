import React, {useState, useEffect} from "react";
import {search} from "../service/hoaDon";
import DeleteComponent from "./DeleteComponent";
import {Link} from "react-router-dom";
import {getAll} from "../service/hoaDon";


function ListComponent() {
    const [hoaDonList, setHoaDonList] = useState([]);
    const [khachHangList, setKhachHang] = useState([]);
    const [keyword, setKeyWord] = useState("");
    const [keyId, setKeyId] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState({
        id: "",
        maHoaDOn: "",
        soKW: "",
        donGia: "",
        tongTien: "",
        thang: "",
        khachHang: {
            id: "",
            name: "",
            diaChi: ""
        }
    });


    useEffect(() => {
        const fetchData = async () => {
            const list = await getAll();
            console.log(list)
            setHoaDonList(list);
        }
        fetchData();
        handleSearch();
    }, [isShowModal]);

    // const handleSearch = async () => {
    //     const result = await search(keyword, keyId);
    //     setHoaDonList(result.name);
    //     setKhachHang(result.keyId);
    //
    // }
        const handleSearch = async () => {
        const result = await search(keyword, keyId);
        setHoaDonList(result.name);
        setKhachHang(result.keyId);

       //1 trường // const result = searchStudent(nameKeyword);
        //  setList(await result);
    };

    const handleShowModal = (value) => {
        setIsShowModal(pre => !pre);
        setDeleteProduct(value);
        console.log(deleteProduct)
        console.log(isShowModal)
    }

    const handleCloseModal = () => {
        setIsShowModal(pre => !pre);
    }

    //Format ngày tháng
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            // day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    //Format giá tiền
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    return <>
        <div className="container py-5">
            <h2>Danh sách</h2>
            <hr/>
            {/*<div>*/}
            {/*    <Link to={"/add"}>Thêm mới</Link>*/}
            {/*</div>*/}
            <div>
                <input
                    type={"text"}
                    placeholder={"Nhập tên cần tìm "}
                    value={keyword}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <select
                    value={keyId}
                    onChange={(e) => setKeyId(e.target.value)}>
                    <option value="">Tất cả danh sách</option>
                    {khachHangList.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã hóa đơn</th>
                    <th>số điện tiêu thụ (kw)</th>
                    <th>Đơn giá</th>
                    <th>Tổng tiền</th>
                    <th>Tháng </th>
                    <th>Tên khách hàng</th>
                    <th>Cập nhật</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tbody>
                {hoaDonList.map((p, index) =>
                    <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.maHoaDon}</td>
                        <td>{p.soKW}</td>
                        <td>{formatCurrency(p.donGia)}</td>
                        <td>{formatCurrency(p.tongTien)}</td>
                        <td>{formatDate(p.thang)}</td>
                        <td>{p?.khachHang?.name}</td>
                        <td>
                            <button><Link to={`/update/${p.id}`}>Cập nhật</Link></button>
                        </td>
                        <td>
                            <button onClick={() => {
                                handleShowModal(p)
                            }}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                )}
                <tr>
                    <td colSpan={8}>
                        {(hoaDonList.length === 0) ? 'Danh sách trống...' : ''}
                    </td>
                </tr>
                </tbody>
            </table>
            <DeleteComponent
                deletes={deleteProduct}
                isShowModal={isShowModal}
                isCloseModal={handleCloseModal}
            />
        </div>
    </>
}

export default ListComponent;