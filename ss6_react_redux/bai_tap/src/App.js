import './App.css';
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import HeadComponent from "./component/HeadComponent";
import AddComponent from "./component/AddComponent";
import UpdateComponent from "./component/UpdateComponent";
import DetailComponent from "./component/DetailComponent";
import {ToastContainer} from "react-toastify";

function App() {
    return <>
        <HeadComponent/>
        <Routes >
            <Route path={"/list"} element={<ListComponent/>}/>
            <Route path={"/add"} element={<AddComponent/>}/>
            <Route path={"/update/:id"} element={<UpdateComponent/>}/>
            <Route path={"/detail/:id"} element={<DetailComponent/>}/>
        </Routes>
        <ToastContainer/>
    </>
}

export default App;
