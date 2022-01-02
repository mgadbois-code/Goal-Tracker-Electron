import { useState } from "react"
import Button from "./Button"
import React from "react"

const AddTask = ({addToGoalColor,onSubmit,buttonColor, buttonText, title, onAdd}) => {
    var [taskName, setTaskName] = useState("")
    var [taskArr, setTaskArr] = useState([])
    
    const addTask = (event) => {
        event.preventDefault()
        setTaskArr([...taskArr,taskName])
        // console.log(taskArr)
        setTaskName("")
    }

    const submitTasks = (event,taskName) =>{
        event.preventDefault();
        // setTaskArr([taskName])
        onSubmit([taskName])
    }

    const removeTask = (event, task) => {
        setTaskArr(taskArr.filter(t => t != task))
    }

    return (
        <div className="item pointer task" style={{backgroundColor: addToGoalColor, cursor:"default"}}>
            <div className="header">
                <input className="h3 detail edit-task-title" value={taskName} onChange={(event) => setTaskName(event.target.value)} placeholder="New Task" />
                <div className="flex">
                    <button onClick={(event) => submitTasks(event,taskName)} className="edit-task-btns" style={{backgroundColor:"green", color:"white", fontWeight:"bold"}}>Done</button>
                    <button className="edit-task-btns" style={{backgroundColor:"red", marginRight:"20px", color:"white", fontWeight:"bold"}} onClick={onAdd}>Never Mind</button>
                </div>
                {/* <ItemRemoveButton removeGoal={() => props.removeTask(props.goal.id,props.task.id)} allDone="1" /> */}
            </div>
        </div>
    )
}

export default AddTask
