import './App.css';
import ListStudentComponentRouter from "./router_conponent/ListStudentComponent";
import AddStudentComponent from "./router_conponent/AddStudentComponent";
import {Route, Routes} from "react-router-dom";
import HeadComponentRouter from "./router_conponent/HeadComponentRouter";
import {ToastContainer} from "react-toastify";
import DetailStudentComponent from "./router_conponent/DetailStudentComponent";
import UpdateStudentComponent from "./router_conponent/UpdateStudentComponent";

function App() {
  return <>
      <HeadComponentRouter/>
      <Routes>
        <Route path={'/list'} element={<ListStudentComponentRouter/>}/>
        <Route path={'/add'} element={<AddStudentComponent/>}/>
        <Route path={'/detail/:id'} element={<DetailStudentComponent/>}/>
        <Route path={'/update/:id'} element={<UpdateStudentComponent/>}/>
      </Routes>
   <ToastContainer/>
    </>
}

export default App;
