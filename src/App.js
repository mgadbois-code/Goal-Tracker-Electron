import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import AddGoal from "./components/AddGoal";
import GoalList from "./components/GoalList";
import MinMaxButtons from "./components/MinMaxButtons";

import React from "react"



function App({fetchGoals, updGoalsDB, updCompletedDB}) {

  
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(false)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [goals, setGoals] = useState([ ])
  const [goalColor,setGoalColor] = useState("white")



  useEffect(() => {
    const getGoals = async () => {
      var goalsFromServer = await fetchGoals();

      let g = await JSON.parse(goalsFromServer).goals
      setGoals(g)
    }
    getGoals()
  }, [])


// used in GoalList component to toggle view of tasks in a goal with checkmarks
const toggleSubGoals = (id) => {
  setGoals(goals.map((goal) =>{
    if(goal.id === id){
      let newGoal = {...goal, showSubGoals: !goal.showSubGoals}
      
      return newGoal
    }
    
    return goal
  }))
  
}

const removeGoal = async (goalId, done) => {
 
    let removedGoal
    let newGoals = goals.filter(goal => {
      if(goal.id != goalId){
      return true
    }
  else{
    removedGoal = goal
    return false
  }}).map((goal,index) => {
      goal.id = index + 1;
      return goal
  })
  setGoals(newGoals)
  if(done){
    await updCompletedDB(removedGoal)
    //
  }
  await updGoalsDB(newGoals)
}

//used to be async
const removeTask = async (goalId, taskId) => {
  // const goalToUpdate = await fetchGoal(goalId)
  let goalToUpdate = goals.filter((goal)=>(goal.id == goalId))[0]

  const tasks = goalToUpdate.tasks
  let index = 1;
  const updTasks = tasks.filter(task => task.id != taskId).map((task) => {
    task.id = index
    index++;
    return task
  })
  const updGoal = {...goalToUpdate, tasks:updTasks}
  
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    return goal
  })

  await updGoalsDB(newGoals)
  setGoals(newGoals)

  

}



//Toggles checkmark icon in the sugoals in the GoalList component from unchecked icon to checked icon by toggling done property in task object within goal object

//used to be async
const toggleDone=  async (goalId,taskId) => {
  const goalToUpdate = goals.filter((goal) => (goal.id==goalId))[0]
  const tasks = goalToUpdate.tasks;
  const updTasks = tasks.map((task) => {
    if(task.id == taskId){
      task.done = !task.done
    }
    return task;
  })
  const updGoal = { ...goalToUpdate, tasks:updTasks}

  
let newGoals = goals.map((goal) => {
  if(goal.id == goalId){
    return updGoal
  }
  return goal
})

setGoals(newGoals)
await updGoalsDB(newGoals)

 
}

//When submit button is clicked in addTask component it toggles view, adds the task to the target goal, uses setGoals
//used to be async
const submitTasks = async(taskArr) =>{
 
  setShowAddTask(!showAddTask)
  let taskObjArr = []
  // 
  let targetGoal = goals.filter((goal)=> {return goal.id==addToGoal})[0]
  for(let i = 0; i < taskArr.length; i++){
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false})
  }
  

  let newTasks = targetGoal.tasks.concat(taskObjArr);
  targetGoal.tasks = newTasks

  const goalToUpdate = targetGoal
  goalToUpdate.tasks = newTasks;



  let newGoals = [...goals]
  newGoals= newGoals.map((goal) => {
    if(goal.id=== targetGoal.id){
      return targetGoal
    }
    else{
      return goal
    }
  })
  // addTaskDB([newTasks, addToGoal])

  setGoals(newGoals)
  await updGoalsDB(newGoals)
}

//Sets the goal color of a new goal. 
const handleColorChange = () => {
  setGoalColor(goalColor);
  
}

//Creates goal object and adds it to the goals array
//used to be async
const addGoal = async(goal) => {

  goal.id = goals.length + 1
  let newGoals =  [...goals,goal]
  setGoals(newGoals)
  await updGoalsDB(newGoals)

}



//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  setShowAddTask(!showAddTask)
  setAddToGoal(eventKey)
  // 
}

//used to be async
const toggleVisible = async (goalId) => {
  

  let targetGoal = goals.filter((goal)=> {return goal.id==goalId})[0]
  let visibility = false
  if(targetGoal.hasOwnProperty("visible")){
    visibility = !targetGoal.visible
  }
  targetGoal.visible = visibility
  

  const goalToUpdate = goals.filter((goal) => (goal.id == goalId))[0]
  goalToUpdate.visible = visibility;




  let newGoals = [...goals]
  newGoals= newGoals.map((goal) => {
    if(goal.id=== targetGoal.id){
      return targetGoal
    }
    else{
      return goal
    }
  })
  
  

  setGoals(newGoals)
  await updGoalsDB(newGoals)
}

  
  return (
    <div className="App">

       
     {!minimizeTasks && <div className="container">
        {/* Tasks components */}
        <MinMaxButtons component = "Tasks" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => setMinimizeTasks(!minimizeTasks)} toggleMiniGoals={() => setMinimizeGoals(!minimizeGoals)} />
        {showAddTask ? <Header buttonColor="red" buttonText="✖️ Never Mind" title="New Task" onAdd={() => (setShowAddTask(!showAddTask))}/> : <Header goals={goals} title="Tasks"  onAdd={handleDropDown} />}
        {showAddTask ? <AddTask addToGoal={addToGoal.id} onSubmit={submitTasks}/> : <TaskList goals={goals} removeTask={removeTask}  onToggle={toggleDone} />}
      </div>}

      {!minimizeGoals && <div className = "container">
        {/* Goals components */}
        <MinMaxButtons component = "Goals" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => setMinimizeTasks(!minimizeTasks)} toggleMiniGoals={() => setMinimizeGoals(!minimizeGoals)} />
       {showAddGoal ? <Header  buttonColor="red" buttonText="✖️ Never Mind" title="New Goal" onAdd={() => setShowAddGoal(!showAddGoal)}/> :  <Header  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => setShowAddGoal(!showAddGoal)}/>}
        {showAddGoal ? <AddGoal setShowGoals={() => setShowAddGoal(!showAddGoal)} addGoal={addGoal} onChange={handleColorChange} />:
        <GoalList goals={goals}  removeGoal={removeGoal} onToggle ={toggleSubGoals} toggleDone={toggleDone} toggleVisible={toggleVisible} />}
      </div>}

    </div>
  );
}

export default App;
