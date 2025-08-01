import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {Link} from "react-router-dom";
import "./css/HeaderComponent.css"



class HeadComponentRouter extends Component{
    render() {
        return <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Trang chủ</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/list"} className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link to={"/list"} className="nav-link active" aria-current="page">List</Link>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link active" aria-current="page">Add</Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link disabled">Disabled</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    }
}

export default HeadComponentRouter;