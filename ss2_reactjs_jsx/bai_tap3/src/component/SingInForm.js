import 'bootstrap/dist/css/bootstrap.min.css'


function FormSingIn() {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-4 bg-white p-4 rounded shadow">
                <form>
                    <div className="text-center mb-4">
                        <img
                            className="mb-3"
                            src="https://pos.nvncdn.com/cba2a3-7534/ps/20240707_du7QhBbmzx.png"
                            alt=""
                            width="72"
                            height="57"
                        />
                        <h1 className="h4 fw-bold">Vui lòng đăng nhập</h1>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập password"
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe"/>
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormSingIn;