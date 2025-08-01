import React, {useState, useEffect} from "react";
import "./css/ListComponent.css";
import {getAll, search} from "../service/data";

function ListComponent() {
    const [sachList, setSachList] = useState([]);
    const [theLoai, setTheLoai] = useState([]);
    const [keyword, setKeyWord] = useState("");
    const [keyID, setKeyID] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAll();
            setSachList(list);
        };
        fetchData();
        handleSearch();
    }, []);

    const handleSearch = async () => {
        const result = await search(keyword, keyID);
        setSachList(result.sach);
        setTheLoai(result.theLoai);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="list-container">
            <h2 className="list-title">Danh sách</h2>
            <hr className="list-hr"/>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập tên cần tìm"
                    value={keyword}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <select
                    value={keyID}
                    onChange={(e) => setKeyID(e.target.value)}
                >
                    <option value="">Tất cả loại sách</option>
                    {theLoai.map(loai => (
                        <option key={loai.id} value={loai.id}>{loai.name}</option>
                    ))}
                </select>
                <button onClick={handleSearch} className="search-button">Tìm kiếm</button>
            </div>
            <table className="product-table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã sách</th>
                    <th>Tên sách</th>
                    <th>Thể loại</th>
                    <th>Ngày nhập</th>
                    <th>Số lượng</th>
                </tr>
                </thead>
                <tbody>
                {sachList.map((p, index) => (
                    <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.maSach}</td>
                        <td>{p.tensach}</td>
                        <td>{p.theLoai?.name}</td>
                        <td>{formatDate(p.ngayNhap)}</td>
                        <td>{p.soLuong}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={9} className="empty-list">
                        {sachList.length === 0 ? 'Danh sách trống...' : ''}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}

export default ListComponent;