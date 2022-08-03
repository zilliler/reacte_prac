import { useState } from "react"

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    };
    //기존 js에서는 [ ].push로 하던 작업을 ...currentArray로 가능하다
    //value가 배열로 추가되는것을 자동으로 해줌
    setTodos((currentArray) => [toDo, ...currentArray]);
    setTodo("");
  };

  return (
    <div>
      <h1>My To Dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Wite your to do.."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item,index) => (
          <li key={index}>{item}</li>))}
      </ul>
    </div>
  );
}

export default App;