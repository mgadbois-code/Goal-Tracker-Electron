import SubGoal from "./SubGoal"
import ItemRemovebutton from "./ItemRemoveButton"
import EditButton from "./EditButton"
import FocusButton from "./FocusButton"
import EditGoal from "./EditGoal"
import React from "react"


const Goal = (props) => {

    //order Tasks by whether they are done
    const doneTasks = props.goal.tasks.filter((task) => task.done)
    const undoneTasks = props.goal.tasks.filter((task) => !task.done)
    const tasks=doneTasks.concat(undoneTasks)
    const done = undoneTasks.length == 0
    
    
    if(props.showEditGoal){
        return (
            <EditGoal showDialogBox={props.showDialogBox} submitGoalEdits={props.submitGoalEdits} goals={props.goals} reOrderGoalUp={props.reOrderGoalUp} reOrderGoalDown={props.reOrderGoalDown} reOrderTaskUp={props.reOrderTaskUp} reOrderTaskDown={props.reOrderTaskDown} 
            addTask={props.addTask} removeTask={props.removeTask} toggleShowEditGoal={props.toggleShowEditGoal} goalId = {props.goal.id} goalColor={props.goal.color} goal={props.goal} />
        )
    }

    return (
        <div className="item pointer" style={{border:"solid 6px", borderColor: props.goal.color}} onClick={() => props.onToggle(props.goal.id)}>
            
            <div className="header" style={{marginTop:"-5px"}}>
                {/* goal title */}
                <h3 className="detail flex"  onClick={() => props.onToggle(props.goal.id)}>{props.goal.title} 
                
                    <FocusButton visible={props.goal.visible} goalId ={props.goal.id} toggleVisible = {props.toggleVisible}/>
                </h3>

                <div className="header">
                    <EditButton toggleShowEditGoal={props.toggleShowEditGoal} goalId = {props.goal.id} />
                    <ItemRemovebutton allDone={undoneTasks.length} removeGoal={() => props.removeGoal(props.goal.id,done)}/>
                </div>

            </div>

            {props.goal.dueDate !=="" && <h4 onClick={() => props.onToggle(props.goal.id)} className="detail">Due: {props.goal.dueDate} </h4>}

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
