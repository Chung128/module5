import {useState} from "react";

function ComponentCounter() {
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);

    const handleAdd1 = () => {
        const newValue = count1 + 1;
        setCount1(newValue);
    };

    const handleAdd2 = () => {
        const newValue2 = count2 + 2;
        setCount2(newValue2);
    };

    return (
        <div>
            <div>Count: {count1}</div>
            <div>
                <button onClick={handleAdd1}>Tăng 1</button>
            </div>

            <div>Count: {count2}</div>
            <div>
                <button onClick={handleAdd2}>Tăng 2</button>
            </div>
        </div>
    )
}
export default ComponentCounter;