import './App.css';
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import HeadComponent from "./component/HeadComponent";
import AddComponent from "./component/AddComponent";
import UpdateComponent from "./component/UpdateComponent";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="App">
      <HeadComponent/>
      <Routes >
        <Route path={"/list"} element={<ListComponent/>}/>
        <Route path={"/add"} element={<AddComponent/>}/>
        <Route path={"/update/:id"} element={<UpdateComponent/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
