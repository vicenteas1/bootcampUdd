import { useState } from "react";

export function Contador() {
    const [count, setCount] = useState(0);

    function aumentar() {
        setCount(count + 1);
    }

    function decrementar() {
        setCount(count - 1);
    }

    function deshabilitar() {
        return count === 0;
    }

    return (
    <div>
        <h1>Contador</h1>
        <p>{count}</p>
        <button onClick={aumentar}>Aumentar</button>
        <button disabled={deshabilitar()} onClick={decrementar}>Decrementar</button>
    </div>
    );
}
