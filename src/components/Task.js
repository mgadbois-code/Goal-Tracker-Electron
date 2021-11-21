import ItemRemoveButton from "./ItemRemoveButton"
import React from "react"

const Task = (props) => {
    return (
        
        <div className="item pointer task" style={{backgroundColor: props.goal.color}} onClick={(event) =>props.onToggle(props.goal.id,props.task.id)}>
            <div className="header">
            <h3 className="detail" >{props.task.title}</h3>
            <ItemRemoveButton removeGoal={() => props.removeTask(props.goal.id,props.task.id)} allDone="1" />
            </div>
        </div>
        
    )
}

export default Task
