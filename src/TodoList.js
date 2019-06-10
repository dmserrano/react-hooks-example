import React, { useState } from "react";

import TodoItem from "./TodoItem";

const initialTodo = {
    complete: false,
    text: ""
};

const TodoList = () => {
    // Default value is '[]' for todos
    // Using array destructuring to get getter and setter
    const [ todos, setTodos ] = useState([]);
    const [ newTodo, setNewTodo ] = useState(initialTodo);

    const getCompleteTodos = () => {
        return todos.filter(({ complete }) => complete);
    };

    const getIncompleteTodos = () => {
        return todos.filter(({ complete }) => !complete);
    };

    const handleToggleTodo = id => {
        const currentTodo = todos.find(todo => todo.id === id);
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(() =>
            [...filteredTodos, { ...currentTodo, complete: !currentTodo.complete }
        ]);
    };

    const handleEnterKeyPress = ({ key }) => {
        if (key !== "Enter") return;
        handleSaveTodo();
    };

    const handleOnChange = ({ target: { value } }) => {
        setNewTodo(newTodo => ({ ...newTodo, text: value }));
    };

    const handleSaveTodo = () => {
        const todo = { ...newTodo, id: todos.length + 1 };
        setTodos(() => [ ...todos, todo ]);
        setNewTodo(initialTodo);
    };

    return (
        <div className="d-flex flex-column align-items-center m-t-10 w-75">
            <h4>My Todo List</h4>

            {!todos.length && <p>No todos yet, please add one!</p>}

            <div className="d-flex justify-content-around w-75">
                <div className="d-flex flex-column">
                    {todos.length > 0 && <h5>Todo</h5>}

                    {getIncompleteTodos().map(({ complete, id, text }, index) =>
                        <TodoItem
                            key={id}
                            complete={complete}
                            handleToggleTodo={handleToggleTodo}
                            id={id}
                            index={index + 1}
                            text={text}
                        />
                    )}
                </div>

                <div className="d-flex flex-column">
                    {todos.length > 0 && <h5>Done</h5>}

                    {getCompleteTodos().map(({ complete, id, text }, index) =>
                        <TodoItem
                            key={id}
                            complete={complete}
                            handleToggleTodo={handleToggleTodo}
                            id={id}
                            index={index + 1}
                            text={text}
                        />
                    )}
                </div>
            </div>

            <div className="d-flex flex-column w-50 mt-2">
                <h5>Create Todo</h5>

                <input
                    onChange={handleOnChange}
                    onKeyPress={handleEnterKeyPress}
                    placeholder="Todo text"
                    value={newTodo.text}
                />

                <button
                    className="btn btn-primary mt-2"
                    onClick={handleSaveTodo}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default TodoList;
