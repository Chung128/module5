import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ListComponent from "./class_component/ListComponent";
import TodoList from "./class_component/TodoList";
import ListStudentComponent from "./function_component/ListStudentComponent";
import ListStudentComponentRouter from "./router_conponent/ListStudentComponent";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <ListStudentComponent setIsLoadPage/>
    <BrowserRouter>
        <App/>
    </BrowserRouter>

   // <ListComponent/>
    //<TodoList/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
