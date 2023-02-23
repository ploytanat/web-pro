// ข้อ 3.1
function getDogDemo(url) {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  
let num = 10
  const countdown = setInterval(() => {
    num--;
    dogTime.innerHTML = num
    if (num == 0) {
      clearInterval(countdown)
      getAPI('https://dog.ceo/api/breeds/image/random', (pic) => {
        dogImg.src = pic.message 
        console.log(pic.message)
      })
    }
  }, 1000)
}

// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')
  const rainbow = document.getElementById("rainbow")
  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
    let num1 = getResult()
    if (num1.status === 'success') {
      rainbow.innerHTML = num1.text
      rainbow.className = "has-text-primary"
    }
    else {
      rainbow.innerHTML = 'STATE 1'
      rainbow.className = "has-text-danger"
    }

    setTimeout(() => {
      // STATE 2 color = 'has-text-success'
      let num2 = getResult()
      if (num2.status === 'success') {
        rainbow.innerHTML = num2.text
        rainbow.className = "has-text-success"
      }
      else {
        rainbow.innerHTML = 'STATE 2'
        rainbow.className = "has-text-danger"
      }
      setTimeout(() => {
        // STATE 3 color = 'has-text-success'
        let num3 = getResult()
        if (num3.status === 'success') {
          rainbow.innerHTML = num3.text
          rainbow.className = "has-text-success"
        }
        else {
          rainbow.innerHTML = 'STATE 3'
          rainbow.className = "has-text-danger"
        }

      }, 2000)

    }, 2000)

  }, 2000)
}

function getResult() {
  const num = Math.floor(Math.random() * 10)
  // console.log(num)
  if (num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  } else {
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้
  let myPromise = new Promise(function (myResolve, myReject) {

    // some code (try to change x to 5)

    if (num % 2 == 0) {
      myResolve("success : " + num + " is an even number");
    } else {
      myReject("Error : " + num + " is not an even number");
    }
  });

  myPromise.then(
    function (value) { myDisplayer(value); },
    function (error) { myDisplayer(error); }
  );

  function myDisplayer(some) {
    document.getElementById("result").innerHTML = some;
  }

}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise

  let myPromise = new Promise(function (myResolve, myReject) {

    setTimeout(() => {
      if (delay < 500) {
        myResolve("task " + id + ": " + delay + "ms ... PASS!");
      } else {
        myReject("task " + id + ": " + delay + "ms ... NOTPASS!");
      }
    }, delay);


  })

  myPromise.then(
    function (value) { console.log(value); }

  ).catch(function (error) { console.log(error); })


  return myPromise
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  for (let i = 1; i <= 4; i++) {
    task(i)
  }
}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  let myPromise = new Promise(function (myResolve, myReject) {

    if (password == "Cisco") {
      myResolve("รหัสผ่านถูกต้อง");
    } else {
      myReject("รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง");
    }
  });

  myPromise.then(
    function (value) {
      alert(value);
      getAPI('https://api.thecatapi.com/v1/images/search', (res) => {
        cat.src = res[0].url
      }, () => { })
    },
    function (error) { alert(error); }
  );
}

function fetchData(password) {
  checkAuth(password)
}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}