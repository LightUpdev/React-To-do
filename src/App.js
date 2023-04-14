import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");

  // HANDLE ADD TODO FUNCTIONS
  const handleAddToList = () => {
    if (todoText.length > 1) {
      setTodoList([
        ...todoList,
        { id: Date.now(), text: todoText, check: false },
      ]);
      toast("New List Added");
      setTodoText("");
    } else {
      toast("Input cannot be empty");
      setTodoList([...todoList]);
      return;
    }

    if (todoList.length === 10) {
      toast("you can't add more items to your list");
      setTodoList([...todoList]);
      return;
    }
  };

  // HANDLE DELETE LIST
  const deleteListItem = (listId) => {
    const newList = todoList.filter((singleList) => singleList.id !== listId);
    toast("Item deleted successfully");
    setTodoList(newList);
  };

  // HANDLE CHECK LIST
  const handleCheckList = (listId) => {
    const newList = todoList.map((item) => {
      if (item.id === listId) {
        const updateCheck = {
          ...item,
          check: !item.check,
        };
        return updateCheck;
      }
      return item;
    });
    setTodoList(newList);
  };

  return (
    <>
      <ToastContainer />
      <div className="container justify-content-center align-items-center">
        <div className="todo-container">
          <header>
            <h1 className="text-center display-3 my-auto py-5">Todo List</h1>
          </header>
          {todoList.length > 0 ? (
            <h3 className="text-center">
              you have {todoList.length} item available
            </h3>
          ) : (
            <h3 className="text-center my-auto ">No item in List</h3>
          )}
          <div className="todo-input d-flex">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Add to your list..."
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button className="btn btn-success ms-3" onClick={handleAddToList}>
              Add List
            </button>
          </div>

          <div className="list-items align-items-center justify-content-center my-5">
            {todoList.map((list, index) => {
              return (
                <div className="list my-3 px-3 d-flex" key={index}>
                  <h3
                    style={{
                      textDecoration: `${list.check ? "line-through" : "none"}`,
                      color: `${list.check ? "red" : "green"}`,
                    }}
                  >
                    {list.text}
                  </h3>
                  <div className="action-btn ms-auto align-items-center">
                    <div
                      className="btn btn-success m-1"
                      onClick={() => handleCheckList(list.id, list.check)}
                    >
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div
                      className="btn btn-danger m-1"
                      onClick={() => deleteListItem(list.id)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
