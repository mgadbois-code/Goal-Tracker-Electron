import React from 'react'
import { useState } from "react"
import EditButton from './EditButton'
import ItemRemoveButton from './ItemRemoveButton'
import ReOrderButtons from './ReOrderButtons'
import { HuePicker, SliderPicker } from "react-color"
import GoalList from './GoalList'

const EditGoal = ({submitGoalEdits,toggleShowEditGoal,reOrderTaskUp,reOrderTaskDown,showDialogBox, reOrderGoalUp,reOrderGoalDown, goalId, goalColor, goal,goals}) => {
    var [goalName,setGoalName] = useState(goal.title)
    var [goalDueDate, setGoalDueDate] = useState(goal.dueDate)
    var [color,setColor] = useState(goalColor)
    var [newTask,setNewTask] = useState("")
    var [taskArr, setTaskArr] = useState(goal.tasks)

    // const editGoalColor = (newColor,event) =>{
    //     // let colorValue = newColor.hex + "80";
    //     // setColor(colorValue)

    //     // console.log(color.hex)

    // }

    const removeTask = (taskId) => {
        let tasks = taskArr;
        tasks = tasks.filter(task => {
            return task.id != taskId
        })
        tasks = tasks.map((task,index) => {
            task.id = index + 1
            return task
        })
        setTaskArr(tasks)
        goal.tasks = taskArr
        
    }


    const addTask = (taskTitle) =>{
        if(taskTitle==""){
            showDialogBox("Enter a task name")
            return
        }
        let newTaskObj = {id:taskArr.length + 1, title: taskTitle, done:false}
        setTaskArr([...taskArr,newTaskObj])
        setNewTask("")
        console.log(taskArr)
        
    }

    const editGoalTitle = (newTitle)=>{
        goal.title= newTitle
        setGoalName(newTitle)

    }
  

    const editGoalDueDate = (newDueDate) =>{
        goal.dueDate = newDueDate
        setGoalDueDate(newDueDate)
    }

    const editGoalColor =(newColor,event) => {
        let newColorValue = newColor.hex + "80";
        goal.color = newColorValue
        setColor(newColorValue)
    }

    const editTaskTitle = (taskId, newTitle) => {
        let tasks = taskArr
        tasks = tasks.map(task => {
            if(task.id == taskId){
                task.title = newTitle;
            }
        return task
        })
        setTaskArr(tasks)
        goal.tasks = taskArr
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          event.preventDefault();
          addTask(newTask)
        //   console.log("Enter Press")
        }
      }

    return (
        <div style={{border:"solid 6px", borderColor: color}}>
            <div className="flex header">
                <div className="header">
                    <input className="h3" placeholder={goal.title} value={goalName} onChange={(event) => {editGoalTitle(event.target.value)}}></input>
                    <ReOrderButtons reOrderUp={() => reOrderGoalUp(goal.id,goals)} reOrderDown={() => reOrderGoalDown(goal.id,goals)} size="40px" />
                </div>
    
                    <button onClick={() => {goal.showEditGoal=false;goal.tasks = taskArr;submitGoalEdits(goalId,goal)}} className="btn" style={{backgroundColor:color, marginRight:"20px", color:"black", fontWeight:"bold"}}>Done</button>
 
            </div>
           <input className="h4" placeholder="Due Date" value={goalDueDate} onChange={(event) => {editGoalDueDate(event.target.value)}} />
            <div className="flex">
                <div>
                    <HuePicker color={goal.color} onChange={(color,event) => editGoalColor(color,event)} />
                {taskArr.map((task)=>
                    <div className="flex" style={{marginTop:"5px"}}>
                        <ReOrderButtons reOrderUp={() => reOrderTaskUp(goalId,task.id,taskArr)} reOrderDown={() => reOrderTaskDown(goalId,task.id,taskArr)} size="20px" />
                        <input className="p" value={taskArr.filter(arrTask => arrTask.id == task.id)[0].title} onChange={(event) => {editTaskTitle(task.id,event.target.value)}}></input>
                        <ItemRemoveButton size="20px" className="p small-btn" removeGoal={() => {removeTask(task.id)}} allDone="1" />
                    </div>
                    )}
                    <div className="flex" style={{marginTop: "7px"}}>
                        <label style={{fontWeight:"bold", fontSize:"12px", backgroundColor:"white",padding:"12px 2px 2px"}} for="New Task">Add Task: </label>
                        <input style={{margin:"5px 7px 2px 0px"}}  name="New Task" className="p" value={newTask} placeholder="New Task" onChange={(event) => {setNewTask(event.target.value)}} onKeyPress={handleKeyPress} />
                        <button style = {{backgroundColor:"green", color:"white",fontSize:"20px",fontWeight:"bold",margin:"5px 0px 5px 0px", padding:"0px 5px 0px 5px"}}
                         onClick ={(event) => {addTask(newTask)}} className="plus-btn"> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditGoal
