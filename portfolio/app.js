let topic_arr=new Array('Movie Nights ?','Late night at office ?','Movie Marathon ?','Game Night ?','Hungry ?','Unexpected guests ?','Cooking gone Wrong ?');    
let topic_name=document.getElementById('topic');
let counter=0;
setInterval(changeTopic,3000);
function changeTopic() {
  topic_name.textContent =topic_arr[counter];
  counter++;
  if (counter >= topic_arr.length) {
    counter = 0;
  }
}