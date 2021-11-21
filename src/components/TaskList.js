import Task from "./Task";
import Goal from "./Goal";
import React from "react"

const TaskList = (props) => {
    return (
        <div>
            { props.goals.filter(goal => goal.visible).map((goal) => goal.tasks.filter((task) => !task.done).map((task) => <Task onToggle={props.onToggle} removeTask={props.removeTask}  goal= {goal} task={task} />))}
        </div>
    )
}

export default TaskList
