class TaskRunner {
  constructor() {
   this.tasksList = {}
    this.currentIndex = 1;
  }
  
  push(task) {
    let self = this;
    
    if ( this.currentIndex === 1) {
      this.tasksList[1] = { fun:function(){}}
      this.tasksList[0] = { index:1, fun:function(){ task(self.tasksList[1].fun) }}
    } else {
		
       this.tasksList[this.currentIndex] = { index:this.currentIndex, fun:function(){console.log("index2");}}	
       console.log('this.tasksList[this.tasksList.length-2]', this.tasksList);
       this.tasksList[this.currentIndex-2].fun = function(){
         console.log("test"); 
		 task(self.tasksList[self.currentIndex-1].fun);  
       }
    }
   	
    if ( this.currentIndex === 1) {
       console.log("this", this.tasksList);
       task(self.tasksList[0].fun); 
// 		this.currentIndex = this.currentIndex + 1;      
    }
	this.currentIndex++;
  }
}


function createTask(i) {
  return function task(onTaskComplete) {
    console.log(i);
    setTimeout(onTaskComplete, i * 1000);
  }
}

var r = new TaskRunner();
r.push(createTask(1)); // executes immediately
r.push(createTask(2)); // executes after 1s
r.push(createTask(3));
