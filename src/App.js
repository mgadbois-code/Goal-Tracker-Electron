import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import AddGoal from "./components/AddGoal";
import GoalList from "./components/GoalList";
import MinMaxButtons from "./components/MinMaxButtons";

import React from "react"
import { set } from "lodash";



function App({fetchGoals, updGoalsDB, updCompletedDB, showDialogBox}) {

  
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(false)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [holdingTaskMinimize, setHoldingTaskMinimize] =useState(false);
  const [holdingGoalMinimize, setHoldingGoalMinimize] =useState(false);
  const [goals, setGoals] = useState([ ])
  const [goalColor,setGoalColor] = useState("white")
  const [windowWidth, setWindowWidth] = useState(800)

  const [showGoalEdit,setShowGoalEdit] = useState(false)


//loads goals from db
  useEffect(() => {
    const getGoals = async () => {
      var goalsFromServer = await fetchGoals();

      let g = await JSON.parse(goalsFromServer).goals
      setGoals(g)
    }
    getGoals()

  }, [])
//


  useEffect(() => {
    function handleResize() {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      setWindowWidth(window.innerWidth)
      if( windowWidth < 645 && (!minimizeTasks && !minimizeGoals)){
        setMinimizeGoals(true)
        setHoldingGoalMinimize(true)
      }
      else if(windowWidth >= 645 && holdingGoalMinimize){
        setMinimizeGoals(false);
        setMinimizeTasks(false);
        setHoldingGoalMinimize(false)
      }
      else{
        setMinimizeTasks(minimizeTasks)
        setMinimizeGoals(minimizeGoals)
      }
      // else{
      //   setMinimizeGoals(false)
      //   setMinimizeTasks(false)
      // }
      // if( windowWidth < 645 && !minimizeTasks && !minimizeGoals && holdingGoalMinimize){
      //   setMinimizeTasks(true)
      //   setHoldingGoalMinimize(false)

      // }
    
}

    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    
}
    
  })

const toggleMiniTasks = () => {
  console.log("toggleMiniTasks")
  if(windowWidth < 645){
    if(minimizeTasks){
      setMinimizeTasks(false)
      setMinimizeGoals(true)
    }
    if(!minimizeTasks){
      setMinimizeTasks(true)
      setMinimizeGoals(false)
    }
  }
  else{
    setMinimizeTasks(!minimizeTasks)
  }
}

const toggleMiniGoals = () => {
  console.log("toggleMiniGoals")
  if(windowWidth < 645){
    if(minimizeGoals){
      setMinimizeGoals(false)
      setMinimizeTasks(true)
    }
    if(!minimizeGoals){
      setMinimizeGoals(true)
      setMinimizeTasks(false)
    }
  }
  else{
    setMinimizeGoals(!minimizeGoals)
  }
}

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

const toggleEditGoal = (id) => {
  console.log("goal id: " + id)
  setGoals(goals.map((goal) => {
    if( goal.id == id){
      let showEditGoalValue = true
      if(goal.hasOwnProperty("showEditGoal")){
        showEditGoalValue = !goal.showEditGoal
      }
      let newGoal = {...goal,showEditGoal: showEditGoalValue}
      goal = newGoal
    }
    console.log(goal.showEditGoal)
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
const addTask = (goalId, taskTitle) => {
  // const goalToUpdate = await fetchGoal(goalId)
  if(taskTitle == ""){
    showDialogBox("Input a Task")
    return
  }
  let goalToUpdate = goals.filter((goal)=>(goal.id == goalId))[0]

  const tasks = goalToUpdate.tasks
  let newTask = {id:tasks.length+1, title: taskTitle, done:false}
  let index = 1;
  const updTasks = [...tasks, newTask] 
  const updGoal = {...goalToUpdate, tasks:updTasks}
  
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    return goal
  })

  // await updGoalsDB(newGoals)
  setGoals(newGoals)

  

}


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

const submitGoalEdits = async(goalId,newGoal) =>{
  setGoals(goals.map(goal => {
    if(goal.id == goalId){
      console.log(newGoal)
      return newGoal
    }
    return goal
  }))
  await updGoalsDB(goals)
}

const submitTasks = async(taskArr) =>{
  if(taskArr.length == 0){
    showDialogBox("Input a Task")
    return
  }
 
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
  let newGoals =  [goal,...goals]
  setGoals(newGoals)
  await updGoalsDB(newGoals)

}

const createNewGoal = () => {
  let newGoal = {title:"New Goal",dueDate:"",showEditGoal:true, showSubGoals:false,color:"#ff000080",visible:true,tasks:[] }
  addGoal(newGoal);
  
}

const createNewTask = (goalId) => {

}

const reOrderTaskUp = (goalId,taskId, taskArr) =>{
  for(let i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
          let switchIndex = i-1
          if(i == 0){
              switchIndex = taskArr.length -1
          }
          let tempTask = taskArr[switchIndex]
          taskArr[switchIndex] = taskArr[i]
          taskArr[i] = tempTask;
          break;
      }
  }
  
  setGoals(goals.map(((goal) => {
    if(goal.id == goalId){
      goal.tasks = taskArr
    }
    return goal
  })))
  
}

const reOrderTaskDown = (goalId,taskId, taskArr) =>{
  for(let i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
          let switchIndex = i+1
          if(i == taskArr.length -1){
              switchIndex = 0
          }
          let tempTask = taskArr[switchIndex]
          taskArr[switchIndex] = taskArr[i]
          taskArr[i] = tempTask;
          break;
      }
  }
  
  setGoals(goals.map(((goal) => {
    if(goal.id == goalId){
      goal.tasks = taskArr
    }
    return goal
  })))
  
}

const reOrderGoalUp = (goalId) => {
  let goalsArr = [...goals]
  for(let i = 0; i< goalsArr.length; i++){
    if(goalsArr[i].id == goalId){
        let switchIndex = i-1;
        if(i == 0){
            switchIndex = goalsArr.length -1
        }
        let tempGoal = goalsArr[switchIndex]
        goalsArr[switchIndex] = goalsArr[i]
        goalsArr[i] = tempGoal;
        break;
    }
}
setGoals(goalsArr)

}

const reOrderGoalDown = (goalId) => {
  let goalsArr = [...goals]
  for(let i = 0; i< goalsArr.length; i++){
    if(goalsArr[i].id == goalId){
        let switchIndex = i+1
        if(i == goalsArr.length -1){
            switchIndex = 0
        }
        let tempGoal = goalsArr[switchIndex]
        goalsArr[switchIndex] = goalsArr[i]
        goalsArr[i] = tempGoal;
        break;
    }
}
setGoals(goalsArr)

}



//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  if(eventKey != "newGoal"){
    setShowAddTask(!showAddTask)
    setAddToGoal(eventKey)
  }
  else{
    // setMinimizeTasks(true);
    setMinimizeGoals(false);
    createNewGoal();
  }
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
        <MinMaxButtons windowWidth={windowWidth} component = "Tasks" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => toggleMiniGoals()} />
        {showAddTask ? <Header titleName="Tasks" buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/> : 
        <Header titleName="Tasks" goals={goals} title="Tasks"  onAdd={handleDropDown} />}
        {showAddTask && <AddTask addToGoalColor={goals.filter(goal => goal.id == addToGoal)[0].color} 
        onSubmit={submitTasks} buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/>}
        <TaskList goals={goals} removeTask={removeTask}  onToggle={toggleDone} />
      </div>}

      {!minimizeGoals && <div className = "container">
        {/* Goals components */}
        <MinMaxButtons windowWidth={windowWidth} component = "Goals" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => setMinimizeGoals(!minimizeGoals)} />
       {showAddGoal || goals.length == 0 ? <header className="header h1">Add Goal</header> :  
       <Header titleName="Goals"  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => createNewGoal()}/>}
        {showAddGoal || goals.length == 0 ? <AddGoal setShowGoals={() => setShowAddGoal(false)} addGoal={addGoal} onChange={handleColorChange} showDialogBox={showDialogBox}/>:
        <GoalList showDialogBox={showDialogBox} submitGoalEdits={submitGoalEdits}
         reOrderGoalUp={reOrderGoalUp} reOrderGoalDown={reOrderGoalDown} reOrderTaskUp={reOrderTaskUp} reOrderTaskDown={reOrderTaskDown} 
         goals={goals}  removeGoal={removeGoal} addTask={addTask} removeTask={removeTask} onToggle ={toggleSubGoals} toggleDone={toggleDone} toggleVisible={toggleVisible} 
         toggleShowEditGoal={toggleEditGoal} />}
      </div>}

    </div>
  );
}

export default App;
