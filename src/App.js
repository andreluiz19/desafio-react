import { useState } from 'react';
import './App.css';

function App() {

  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    }
    console.log(newDot);
    // Cria um novo array com o spread operator e adiciona o novo objeto
    setList((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const handleUndo = (event) => {
    // Não deixa que o evento do elemento pai atinja o elemento filho
    event.stopPropagation();
    console.log("undo");

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    console.log("redo");

    if (undid.length === 0) {
      return;
    }

    const recoveredItem = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredItem]);
  };

  return (
    <div className="App" id="page" onClick={handleClick}>
      <button className="btn" onClick={handleUndo}>Desfazer</button>
      <button className="btn" onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span 
          key={index}
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}


    </div>
  );
}

export default App;
