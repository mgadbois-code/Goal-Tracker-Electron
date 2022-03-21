import React from "react"


function SubGoal(props) {
    return (
        <div>
            <ul>
            {props.tasks.map((task,index) => 
                <div className="flex">
                    <li key = {index}  className={`done-${task.done}`} onClick={(event) => {
                    event.stopPropagation();
                    props.toggleDone(props.goal.id,task.id)}}>{task.title}
                    </li>
                    {task.done ? <span>{` - ${task.dateDone}`}</span> : 
                    <div onClick={(event) => {
                        event.stopPropagation();
                        props.toggleToday(props.goal.id, task.id)
                        if(props.goal.tasks.filter((otherTask)=> otherTask.today == task.today).length == props.goal.tasks.length){
                            props.setAllTodayStatus(!task.today)
                        }
                    }}>{task.today ? "🟢" : "🟡"}</div>}
                </div>)}
            </ul>
            
        </div>
    )
}

export default SubGoal
