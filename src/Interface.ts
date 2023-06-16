export interface ITodo{
    _id: number,
    todo: string,
    status: String, 
}

export interface ITodos{
    myTodos: ITodo[],
    setAllTodos: React.Dispatch<React.SetStateAction<[] | ITodo[]>>;
}

export interface ISingleTodoItems{
    index: number,
    todoItem: ITodo,
    DeleteItem: (id:number)=> void,
    myTodos: ITodo[],
    setAllTodos: React.Dispatch<React.SetStateAction<[] | ITodo[]>>
}


