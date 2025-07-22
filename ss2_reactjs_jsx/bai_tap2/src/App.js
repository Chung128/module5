import './App.css';
import {students} from "./service/student";


function App() {
    return (
        <div>
            <h2> Student List</h2>
            <table>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {students.map(item =>
                    <tr>
                        <td>{item.company}</td>
                        <td>{item.contact}</td>
                        <td>{item.country}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
