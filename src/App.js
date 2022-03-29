import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import GoalList from "./components/GoalList";
import MinMaxButtons from "./components/MinMaxButtons";
import CompletedList from "./components/CompletedList";

import React from "react"
import HiddenList from "./components/HiddenList";



function App({fetchGoals, updGoalsDB, updCompletedDB, fetchCompleted, showDialogBox}) {

  
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showHiddenList, setShowHiddenList] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(false)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [holdingGoalMinimize, setHoldingGoalMinimize] =useState(false);
  const [completed, setCompleted] = useState([ ])
  const [goals, setGoals] = useState([ ])
  const [goalColor,setGoalColor] = useState("white")
  const [windowWidth, setWindowWidth] = useState(800)

  var date = new Date();
  const numericDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  

//loads goals from db
  useEffect(() => {
    const getGoals = async () => {
      var goalsFromFile = await fetchGoals();

      let g = await JSON.parse(goalsFromFile).goals
      setGoals(g)
    }
    const getCompleted = async () => {
      var completedFromFile = await fetchCompleted();
      let c = await JSON.parse(completedFromFile).completed
      setCompleted(c)
    }
    getGoals()
    getCompleted()
    if(completed.length > 0){
      setShow
    }

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
    
}

    // window.addEventListener('resize', handleResize)
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

const toggleSubCompleted = (id) => {
  setCompleted(completed.map((goal) => {
    if(goal.id == id){
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

// Yo i know we havent gamed in a while but...
// 
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
    removedGoal.id = completed.length + 1
    removedGoal.showSubGoals = false;
    // removedGoal.date =
    removedGoal.dateDone = numericDate
    let newCompleted = [removedGoal, ...completed]
    setCompleted(newCompleted)
    await updCompletedDB(newCompleted)
    //
  }
  await updGoalsDB(newGoals)
}

const removeCompleted = async (goalId) => {
  let newCompleted = completed.filter((goal) => goal.id != goalId)
  newCompleted = newCompleted.map((goal,index) => {
    goal.id = index + 1
    return goal
  })
  setCompleted(newCompleted)
  updCompletedDB(newCompleted)
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
  let newTask = {id:tasks.length+1, title: taskTitle, done:false, today:true,}
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
      if(task.done){
        task.dateDone = numericDate
      }
      else{
        task.dateDone = ""
      }
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
// Toggle task's today property
const toggleToday=  async (goalId,taskId) => {
  let goalToUpdate = goals.filter((goal) => (goal.id==goalId))[0]
  let tasks = goalToUpdate.tasks;
  let updTasks = tasks.map((task) => {
    if(task.id == taskId){
      if(!task.hasOwnProperty('today')){
        task.today = true
      }
      else{
        task.today = !task.today
      }
    }
    return task;
  })
  let updGoal = { ...goalToUpdate, tasks:updTasks}

  
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
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false, today:true})
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

//Creates goal object and adds it to the goals array
//used to be async
const addGoal = async(goal) => {

  goal.id = goals.length + 1
  let newGoals =  [goal,...goals]
  setGoals(newGoals)
  await updGoalsDB(newGoals)

}

const createNewGoal = () => {
  let randomHue = (Math.floor(Math.random()*3600)/10).toString() 
  let randomColor = `hsl(${randomHue},100%,80%)`
  let newGoal = {title:"New Goal",dueDate:"",showEditGoal:true, showSubGoals:false,color:randomColor,tasks:[], visible:true }
  addGoal(newGoal);
  
}

const reOrderTaskUp = (goalId,taskId, taskArr, onTaskList = false) =>{
  for(var i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
        var switchIndex = i-1
        if(onTaskList){
          // Find Task with smaller index with today == true and set switchIndex
          while(switchIndex > 0){
            if(!taskArr[switchIndex].today && !taskArr[switchIndex.done]){
              switchIndex--
            }
            else{
              break
            }
          }
        }
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

const reOrderTaskDown = (goalId,taskId, taskArr, onTaskList=false) =>{
  for(let i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
          let switchIndex = i+1
          if(onTaskList){
            // Find Task with smaller index with today == true and set switchIndex
            while(switchIndex < taskArr.length - 1){
              if(!taskArr[switchIndex].today && !taskArr[switchIndex.done]){
                switchIndex++
              }
              else{
                break
              }
            }
          }
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
// updGoalsDB(goalsArr)

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
// updGoalsDB(goalsArr)

}

const reOrderCompletedUp = (goalId) => {
  let completedArr = [...completed]
  for(let i = 0; i< completedArr.length; i++){
    if(completedArr[i].id == goalId){
        let switchIndex = i-1;
        if(i == 0){
            switchIndex = completedArr.length -1
        }
        let tempGoal = completedArr[switchIndex]
        completedArr[switchIndex] = completedArr[i]
        completedArr[i] = tempGoal;
        break;
    }
}
setCompleted(completedArr)
updCompletedDB(completedArr)

}

const reOrderCompletedDown = (goalId) => {
  let completedArr = [...completed]
  for(let i = 0; i< completedArr.length; i++){
    if(completedArr[i].id == goalId){
        let switchIndex = i+1
        if(i == completedArr.length -1){
            switchIndex = 0
        }
        let tempGoal = completedArr[switchIndex]
        completedArr[switchIndex] = completedArr[i]
        completedArr[i] = tempGoal;
        break;
    }
}
setCompleted(completedArr)
updCompletedDB(completedArr)

}



//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  if(eventKey != "newGoal"){
    setShowAddTask(!showAddTask)
    setAddToGoal(eventKey)
  }
  else{
    // setMinimizeTasks(true);
    if (windowWidth < 645){
      setMinimizeTasks(true)
    }
    setMinimizeGoals(false);
    createNewGoal();
  }
  // 
}

const toggleAllToday = (goalId, status) => {
  let updGoal = goals.filter((goal) => goal.id == goalId)[0]
  updGoal.tasks = updGoal.tasks.map((task) => {
    task.today = status
    return task
  })

  // let newGoals = goals;
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    else{
      return goal
    }
  })

  setGoals(newGoals)
  updGoalsDB(newGoals)
  

}

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

    

      {!minimizeGoals && <div className = "container">
          {/* Goals components */}
          <div style={{display:"flex", flexDirection:"row-reverse" }}>
            <MinMaxButtons windowWidth={windowWidth} component = "Goals" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => setMinimizeGoals(!minimizeGoals)} />
            { !showCompleted && completed.length > 0 ?<button className="completed-btn" onClick={() => {setShowCompleted(!showCompleted); setShowHiddenList(false)} }>Completed</button> : (completed.length > 0 || showCompleted) && <button className="completed-btn"  onClick={() => setShowCompleted(!showCompleted)}>Goals</button> }
            {(showHiddenList || goals.filter((goal) => !goal.visible).length > 0) && <button style={{backgroundColor:"steelblue"}} className="completed-btn" onClick={() => {setShowHiddenList(!showHiddenList); setShowCompleted(false)} }>{!showHiddenList ? "Hidden Goals" : "Goals"}</button>}
          </div>
        
        {showCompleted ? <h1 style={{display:"flex", justifyContent:"space-around"}}>Completed Goals</h1> : showAddGoal || (goals.filter(goal => goal.visible).length == 0 && !showHiddenList) ? <Header titleName="⟵  Add A Goal!"  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => createNewGoal()}></Header> 
        : showHiddenList ? <h1 style={{display:"flex", justifyContent:"space-around"}}>Hidden Goals</h1> 
        : <Header titleName="Goals"  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => createNewGoal()}/>}
          {showCompleted ? 
          <CompletedList completed={completed} showDialogBox={showDialogBox} submitGoalEdits={submitGoalEdits}
            reOrderCompletedUp={reOrderCompletedUp} reOrderCompletedDown={reOrderCompletedDown} removeGoal={removeCompleted} onToggle ={toggleSubCompleted}/> 
            : 
            showHiddenList ? <HiddenList goals={goals} toggleVisible={toggleVisible} onToggle ={toggleSubGoals}/>
            :
            <GoalList showDialogBox={showDialogBox} submitGoalEdits={submitGoalEdits} toggleVisible={toggleVisible}
            reOrderGoalUp={reOrderGoalUp} reOrderGoalDown={reOrderGoalDown} reOrderTaskUp={reOrderTaskUp} reOrderTaskDown={reOrderTaskDown} 
            goals={goals}  removeGoal={removeGoal} addTask={addTask} removeTask={removeTask} onToggle ={toggleSubGoals} toggleDone={toggleDone} toggleToday={toggleToday}  toggleAllToday={toggleAllToday}
            toggleShowEditGoal={toggleEditGoal} />}
      </div>}

      {!minimizeTasks && <div className="container">
          {/* Tasks components */}
          <MinMaxButtons windowWidth={windowWidth} component = "Tasks" miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => toggleMiniGoals()} />
          {showAddTask ? <Header titleName="Tasks" buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/> : 
          <Header titleName= "Today's Tasks" goals={goals} title="Tasks"  onAdd={handleDropDown} />}
          {showAddTask && <AddTask addToGoalColor={goals.filter(goal => goal.id == addToGoal)[0].color} 
          onSubmit={submitTasks} buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/>}
          <TaskList reOrderTaskUp={reOrderTaskUp} reOrderTaskDown={reOrderTaskDown} goals={goals} removeTask={removeTask}  onToggle={toggleDone} />
      </div>}
      
    </div>
  );
}

export default App;
