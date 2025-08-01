import './App.css';
import HeadComponent from "./component/HeadComponent";
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import AddComponent from "./component/AddComponent";
import {ToastContainer} from "react-toastify";

function App() {
  return <>
    <HeadComponent/>
    <Routes >
      <Route path={"/list"} element={<ListComponent/>}/>
      <Route path={"/add"} element={<AddComponent/>}/>
    </Routes>
    <ToastContainer/>
  </>
}

export default App;
