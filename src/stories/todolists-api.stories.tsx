import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolist-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('blabla tl')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '20ffb018-c4e2-4c47-95d8-232ed5b24a22';
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        todolistsAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}




export const GetTasks = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const getTasks=()=>{
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>

            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>

            <button onClick={getTasks}>
               get tasks
            </button>
        </div>

    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>

            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>
                Delete task
            </button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [todolistId, setTodolistId] = useState<any>(null)
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>

            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>
                Create Task
            </button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [title, setTitle] = useState<string>('title 1')


    const updateTask = () => {
        todolistsAPI.updateTask(todolistId,taskId, {
            deadline:'',
            description: description,
            title: title,
            startDate: '',
            status:status,
            priority:priority



        } )
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>

            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'Status'} value={status}  type={"number"} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'Priority'} value={priority} type={"number"} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>

            <button onClick={updateTask}> Update Task </button>
        </div>
    </div>
}
