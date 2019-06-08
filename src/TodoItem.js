import React, { useEffect, useState } from "react";

const TodoItem = ({ complete, handleToggleTodo, index, id, text }) => {
    const [ checked, setChecked ] = useState(complete);

    const handleCheckboxClick = () => {
        setChecked(!checked);
        handleToggleTodo(id);
    };

    useEffect(() => console.log(id, checked));

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxClick}
                id="todo-complete"
            />

            <label className="form-check-label" htmlFor="todo-complete">
                {`${index}. ${text}`}
            </label>
        </div>
    );
};

export default TodoItem;
