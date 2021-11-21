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


ReactDOM.render(
    <div>
        <App updGoalsDB={updGoalsDB} fetchGoals={fetchGoals} updCompletedDB={updCompletedDB} />
    </div>
    , document.getElementById("root"))