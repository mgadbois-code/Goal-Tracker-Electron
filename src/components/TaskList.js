import Task from "./Task";
import Goal from "./Goal";
import React from "react"


const TaskList = (props) => {
    let tasks = props.goals.map((goal) => goal.tasks.filter((task) => !task.done)).reduce((prev,curr)=> prev.concat(curr), [])
    if (tasks.filter(task => !task.done).length == 0){
        return <h3 style={{color:"gray", marginLeft:"25%" }}>No Tasks To Show</h3>
    }

    return (
        <div>
            { props.goals.map((goal) => goal.tasks.filter((task) => {return (task.today && !task.done)}).map((task) => <Task onToggle={props.onToggle} removeTask={props.removeTask}  goal= {goal} task={task} />))}
        </div>
    )
}

export default TaskList
