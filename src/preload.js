const { ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld("myApp", {
    fetchGoals: () => ipcRenderer.invoke("fetch-goals"),
    updGoalsDB: (args) => ipcRenderer.invoke("update-goals", args),
    updCompletedDB: (args) => ipcRenderer.invoke("update-completed",args),
    fetchCompleted: () => ipcRenderer.invoke("fetch-completed"),
    showDialogBox: (args) => ipcRenderer.invoke("show-dialog-box",args) 
})