import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, ListGroup } from "react-bootstrap";
import { add, remove, clear } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";


const App = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const selectTodos = useAppSelector(state => state.todos)

  const [isTodo, setIsTodo] = useState(selectTodos)

  useEffect(() => {
    setIsTodo(selectTodos)
  }, [selectTodos])


  const todoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add(title));
    setTitle("");
  }

  const handleClick = (id: string) => {
    dispatch(remove(id))
  }

  const handleClear = () => {
    dispatch(clear())
    setIsTodo([])
  }


  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h1 className="my-5">Todo App</h1>
        <Col className="col-4">
          <form onSubmit={todoSubmit}>
            <InputGroup className="mb-3">
              <Form.Control placeholder="add todo" value={title} onChange={(e) => { setTitle(e.target.value) }} />
              <Button type='submit' variant="secondary">Add</Button>
            </InputGroup>
          </form>
          <ListGroup  className="mb-1">
            {selectTodos.map((item: any, i: number) => (
              <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center px-3" >
                {item.title}
                <Button
                  onClick={() => handleClick(item.id)}
                  variant="danger" >
                  del
                </Button>
              </ListGroup.Item>
            ))}

          </ListGroup>
          {isTodo.length === 0 ?  <></> : <Button className="mt-3" onClick={handleClear} >Clear</Button> }
        </Col>

      </div>
    </>
  );
};

export default App;
