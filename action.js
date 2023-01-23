let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');


function fetchTodos() 
{
   
}
function addTaskToDom (task)
{
   const li = document.createElement('li');

   li.innerHTML = `
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" class="delete" data-id="${task.id}". />
   `;

   taskList.append(li);
}


function renderList()
{
     taskList.innerHTML = '';

     for(let i=0;i<tasks.length;i++)
     {
       addTaskToDom(tasks[i]);
     }

     taskCounter.innerHTML = tasks.length;
} 

function toggleTask (taskId)
{
   const task = tasks.filter(function(task)
   {
      return task.id === taskId;
   });

   if(task.length > 0)
   {
   	 const currentTask = task[0];

   	 currentTask.done = !currentTask.done;
   	 renderList();
   	 showNotification('Task toggled sucessfully');
   	 return;
   }

   showNotification('could not toggle the task');
}

function deleteTask(taskId)
{
   const newTasks = tasks.filter(function(task)
   {
      return task.id !== taskId;
   });

   tasks = newTasks;
   renderList();
   showNotification("Task deleted sucessfully");
}

function addTask (task)
{
    if(task) {

    	tasks.push(task);
    	renderList();
    	showNotification('Task is added sucessfully');
    	return;
    }

    showNotification('Task can not be added sucessfully');
}

function showNotification (text)
{
  alert(text);
}

function handleInputKeyPress(e)
{
	
   if(e.key === 'Enter')
   {
   	 const text = e.target.value;
   	 console.log('text', text);
   
   if(!text)
   {
   	 showNotification('Task text cannot be empty');
   	 return;
   }

   const task = {

   	text: text,
   	id: Date.now().toString(),
   	done: false
   }

   e.target.value = '';
   addTask(task);
  }
}

function handleClickListener(e)
{
   const target = e.target;

   if(target.className === 'delete')
   {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
   }
   else if(target.className === 'custom-checkbox')
   {
       const taskId = target.id;
       toggleTask(taskId);
       return;
   }
}
addTaskInput.addEventListener('keyup', handleInputKeyPress);
document.addEventListener('click', handleClickListener);