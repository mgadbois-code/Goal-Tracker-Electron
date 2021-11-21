import SubGoal from "./SubGoal"
import ItemRemovebutton from "./ItemRemoveButton"
import FocusButton from "./FocusButton"
import React from "react"


const Goal = (props) => {

    //order Tasks by whether they are done
    const doneTasks = props.goal.tasks.filter((task) => task.done)
    const undoneTasks = props.goal.tasks.filter((task) => !task.done)
    const tasks=doneTasks.concat(undoneTasks)
    const done = undoneTasks.length == 0
    

    return (
        <div className="item pointer" style={{border:"solid 6px", borderColor: props.goal.color}} onClick={() => props.onToggle(props.goal.id)}>
            
            <div className="header" style={{marginTop:"-5px"}}>
            <h3 className="detail flex"  onClick={() => props.onToggle(props.goal.id)}>{props.goal.title}<FocusButton visible={props.goal.visible} goalId ={props.goal.id} toggleVisible = {props.toggleVisible}/> </h3>
          
            <ItemRemovebutton allDone={undoneTasks.length} removeGoal={() => props.removeGoal(props.goal.id,done)}/>
            </div>
            {props.goal.dueDate !=="" && <h4 onClick={() => props.onToggle(props.goal.id)} className="detail">Due: {props.goal.dueDate, done} </h4>}
            <div className="flex" >
            {!props.goal.showSubGoals && tasks.map((task) =>{
                if(task.done){
                    return <p>✅</p>
                }
                return <p>⬜</p>
            })}
              
            </div>
            {props.goal.showSubGoals && <SubGoal goal={props.goal} toggleDone={props.toggleDone} tasks={tasks}/>}
        </div>
    )
}

export default Goal
