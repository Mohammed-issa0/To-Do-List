let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');
let deleteAll= document.querySelector('.deleteAll')

let arrayOfTasks=[];
dataFromLocals();
if(window.localStorage.getItem('tasks') != null){
    arrayOfTasks=JSON.parse(window.localStorage.getItem('tasks'));
    addElementsToPageFrom(arrayOfTasks);
}else{
    arrayOfTasks=[];
}

submit.onclick = function(){
    if(input.value !== ''){
        addTaskToArray(input.value);
        input.value='';
    }
}


taskDiv.addEventListener("click", (e) =>{
    if(e.target.classList.contains('del')){
        deleteTask(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
    }

    if(e.target.classList.contains('task')){
        toggleStatusTask(e.target.getAttribute('data-id'))
        e.target.classList.toggle('done');
    }

});

function addTaskToArray(taskText){
    //task data
    const tasks={
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(tasks);
    console.log(arrayOfTasks);

    addElementsToPageFrom(arrayOfTasks);
    addArrayToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
    taskDiv.innerHTML='';

    if(arrayOfTasks.length>0){
    deleteAll.style.display='block';
    }else{
        deleteAll.style.display='none';
    }

    arrayOfTasks.forEach((task) => {
        let div = document.createElement('div');
        div.className='task';
        //check if class name done
        if(task.completed){
            div.className="task done";
        }
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        
        let span = document.createElement('span');
        span.className='del';
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        console.log(div);
        taskDiv.appendChild(div);
    });
}

function addArrayToLocalStorage(arrayOfTasks){
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

function dataFromLocals(){
    let data = window.localStorage.getItem('tasks');
    if(data){
        let tasks = JSON.parse(data);
    }
}

function deleteTask(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
    addArrayToLocalStorage(arrayOfTasks);
    if(arrayOfTasks.length>0){
    deleteAll.style.display='block';
    }else{
        deleteAll.style.display='none';
    }
}
// function delete(id){

// }

function toggleStatusTask(taskId){
    for(let i=0; i<arrayOfTasks.length ; ++i){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed == true) : (arrayOfTasks[i].completed == false);
        }
        console.log(`${arrayOfTasks[i].id} == ${taskId}`)
    }
    addArrayToLocalStorage(arrayOfTasks);
}

deleteAll.onclick = function(){
    clearData();  
}

function clearData(){
    localStorage.clear();
    taskDiv.innerHTML='';
    arrayOfTasks=[];
    addElementsToPageFrom(arrayOfTasks);
}