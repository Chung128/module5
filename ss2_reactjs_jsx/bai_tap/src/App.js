import logo from './logo.svg';
import './App.css';
import {city} from "./service/City";

function App() {
    return (
        // <div className="App">
        <div>
            <h3> Danh sách thành phố</h3>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tên</th>
            </tr>
            </thead>
            <tbody>
            {city.map(item =>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                </tr>)}
            </tbody>
        </div>
    )
}

export default App;
