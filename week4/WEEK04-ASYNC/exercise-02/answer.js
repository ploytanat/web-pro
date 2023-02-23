// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    // You code here
    if (window.confirm("ยืนยันไหม??")) {
        message = "ยืนยันจ้า";
      }
    else{
        message = "ไม่ดีกว่า";
    }
      
    callback(message);
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    document.getElementById("start").innerHTML = 'Program started';
    setTimeout(() => {document.getElementById("process").innerHTML = 'Hello World';}, 2000);
    setTimeout(() => {document.getElementById("end").innerHTML = 'Program ended';}, 3000);
}   
	
// ข้อ 2.3
function stopTime() {
    let sec= document.getElementById('setSecond');
    let min= document.getElementById('setMinute');
    let timer = document.getElementById('Time').value;
    
    var seconds = timer % 60; 
    var minutes = (timer - seconds) / 60;
    countdown = setInterval(() =>{
        if (seconds < '0'){
            clearInterval(countdown)
        }else if(seconds < 10){
            sec.innerHTML = "0"+ seconds
        }else{
            sec.innerHTML = seconds
        }
        if(minutes > 0 && seconds == 0){
            minutes--
            seconds += 60
        }else if(minutes < 10){
            min.innerHTML = "0"+ minutes
        }else{
            min.innerHTML = minutes
        }
        seconds--;
    }, 1000)
}
