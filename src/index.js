import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

async function fetchGoals(){
    var goals = await myApp.fetchGoals()
    return goals
}

async function updGoalsDB(args){
    var result = myApp.updGoalsDB(args)
}

async function updCompletedDB(args){
    var result = myApp.updCompletedDB(args)
}

async function showDialogBox(args){
    console.log(args)
    var result = myApp.showDialogBox(args)
}


ReactDOM.render(
    <div>
        <App updGoalsDB={updGoalsDB} fetchGoals={fetchGoals} updCompletedDB={updCompletedDB} showDialogBox={showDialogBox} />
    </div>
    , document.getElementById("root"))