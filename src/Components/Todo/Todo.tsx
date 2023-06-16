import React, { useEffect, useState } from 'react';
import './Todo.scss';
import Todos from '../Todos/Todos';
import { ITodo, ITodos } from '../../Interface';
import { json } from 'stream/consumers';



const currTodos: ITodo[] = [
    { _id: 1, todo: 'Go to play cricket', status: 'complete' },
    { _id: 2, todo: 'learn Express', status: 'new' },
    { _id: 3, todo: 'Go to play cricket', status: 'active' },
]

const Todo: React.FC<{}> = () => {
    const [newTodo, setNewTodo] = useState<string>("");
    const [allTodos, setAllTodos] = useState<ITodo[] | []>([]);

    const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    }
    const AddTodo = () => {
        let todosArr: ITodo[] | [] = [];
        let localStorageItems = localStorage.getItem('Todos');
        let newTodoItem: ITodo = {
            _id: Date.now() + Math.random(),
            todo: newTodo,
            status: 'new'
        };

        if (allTodos.length === 0) {
            todosArr = [...todosArr, newTodoItem];
        }
        else {
            setAllTodos([...allTodos, newTodoItem]);
        }
        
        if (localStorageItems) {
            let parsedTodoItems = JSON.parse(localStorageItems);
            parsedTodoItems.push(newTodoItem);
            localStorage.setItem('Todos', JSON.stringify(parsedTodoItems));
        }
        setNewTodo("");
    }

    useEffect(() => {
        try {
            let todos = localStorage.getItem('Todos');
            if (!todos) {
                localStorage.setItem('Todos', JSON.stringify(currTodos));
                console.log('Todo items not found on local storage')
            }
            else {
                let parsedTodos = JSON.parse(todos);
                setAllTodos([...parsedTodos]);
                console.log('Todo items found on local storage')
            }
        } catch (error) {
            console.log(error)
        }
        //setAllTodos([...todos]);
        //console.log(allTodos)
    }, [])
    return (
        <div className='todo-container'>
            <h2 style={{ color: '#c0c0bd' }}>Todos</h2>
            <section className='todos-section'>
                <div className='todos-section-input-wrapper'>
                    <input className="todos-section__input" type='text' placeholder='Enter your todo item' onChange={(e) => { HandleInputChange(e) }} value={newTodo} />
                    <button className='todos-section__add-btn' onClick={AddTodo}>ADD</button>
                </div>
                <main className='todos-body-wrapper'>
                    <Todos myTodos={allTodos} setAllTodos={setAllTodos} />
                </main>
            </section>
        </div>
    )
}

export default Todo