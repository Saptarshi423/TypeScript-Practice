import React from 'react';
import { useState } from 'react';
import { ITodos, ITodo, ISingleTodoItems } from '../../Interface';
import './Todos.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';



const Todos: React.FC<ITodos> = ({ myTodos, setAllTodos }) => {
    const DeleteItem = (id: number): void => {
        const newTodos = myTodos.filter((todo, index) => {
            return todo._id != id;
        });

        setAllTodos([...newTodos]);
        localStorage.setItem('Todos', JSON.stringify(newTodos));
    }
    return (
        <div className='todos-body'>
            {myTodos.map((todoItem, index) => {
                return (
                    <SingleTodoItem key={todoItem._id} index={index} todoItem={todoItem} DeleteItem={DeleteItem} myTodos={myTodos} setAllTodos={setAllTodos} />
                )
            })}
        </div>
    )
}

const SingleTodoItem: React.FC<ISingleTodoItems> = ({ index, todoItem, DeleteItem, myTodos, setAllTodos }) => {
    const [isEdit, setIsEdit] = useState<Boolean>(false);
    const [editBoxVal, setEditBoxVal] = useState<string>(todoItem.todo);
    const SetEditItem = (): void => {
        setIsEdit(!isEdit);
    }
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditBoxVal(e.target.value);
    }
    const HandleToDoUpdate = (id: number): void => {
        let updatedTodos: ITodo[] | [] = myTodos.map((todo, index): ITodo => {
            if (todo._id == id) {
                return {
                    _id: todo._id,
                    todo: editBoxVal,
                    status: todo.status
                }
            }
            return todo;
        });

        setAllTodos((prevState) => {
            let newState: ITodo[] | [] = [];
            prevState.forEach((state, index) => {
                if (state._id === id) {
                    //console.log('...', updatedTodos[index])
                    newState[index] = updatedTodos[index];
                }
                else {
                    newState[index] = state;
                }
            });
            return newState;
        });

        localStorage.setItem('Todos', JSON.stringify(updatedTodos))

        setIsEdit(!isEdit)
    }
    const getCrudIcons = (): JSX.Element => {
        return (
            <>
                {isEdit ? (<button className='todoItem_updateBtn' onClick={() => { HandleToDoUpdate(todoItem._id) }}>Update</button>) : (<div><span className='todoItem_delete-icon' onClick={() => { DeleteItem(todoItem._id) }}><FontAwesomeIcon icon={faTrashCan} /></span>
                    <span className='todoItem_edit-icon' onClick={() => { SetEditItem() }}><FontAwesomeIcon icon={faPenToSquare} /></span></div>)}
            </>
        )
    }
    return (
        <div key={index} className='todoItem-wrapper'>
            {isEdit ? <input className='todoItem_edit-inpBox' value={editBoxVal} onChange={(e) => { HandleChange(e) }} /> : <p>{todoItem.todo}</p>}
            {getCrudIcons()}
        </div>
    );
}

export default Todos