import React, { useState } from 'react';
import RandomUser from "./RandomUser";
import TodoList from "./TodoList";

const RANDOM_USER = "random-user";
const TODO_LIST = "todo-list";

const App = () => {
    const [contentToShow, setContentToShow] = useState(RANDOM_USER);

    return (
        <div className="container d-flex flex-column align-items-center">
            <div className="d-flex w-100 justify-content-center text-center mb-3">
                <div
                    className="btn-link mr-2"
                    onClick={() => setContentToShow(TODO_LIST)}>
                        Todo List Example
                </div>

                <div
                    className="btn-link"
                    onClick={() => setContentToShow(RANDOM_USER)}>
                        Random user Example
                </div>
            </div>

            {contentToShow === TODO_LIST && <TodoList />}

            {contentToShow === RANDOM_USER && <RandomUser />}
        </div>
    );
};

export default App;
