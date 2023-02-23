// Mobile phone promise
var isMomHappy = Math.random();

// Promise
var askMomForNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy > 0.7) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('Mom is not happy');
            reject(reason); // reject
        }
    }
);

// Now that we have the promise, let’s consume it.
// call our promise

askMomForNewPhone
    .then(function (fulfilled) {
        // yay, you got a new phone
        console.log('Get a new phone:', fulfilled);
            // output: { brand: 'Samsung', color: 'black' }
    })
    .catch(function (error) {
        // oops, mom don't buy it
        console.log(error.message);
            // output: 'mom is not happy'
    });

//Example 2
document.getElementById("title").innerHTML = "Dad's Joke";

function loadDadJoke() {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.response);
        // return res.joke;
        resolve(res.joke)
      } else if (this.readyState == 4) {
        reject('Error')
      }
    };
    xhttp.open("GET", "https://icanhazdadjoke.com/", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
  })
}

const ul = document.getElementById("content");

async function showJoke() {
  try {
    let joke = await loadDadJoke()
    console.log('joke', joke)
    let li = document.createElement("LI");
    li.innerText = joke;
    ul.append(li)
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

showJoke();

// Chaining - example 3
// const delayedColorChange = (newColor, delay) => {
//     return new Promise((resolve, reject) => {
//         const randnum = Math.random()
//         setTimeout(() => {
//             if (randnum > 0.4){
//                 document.body.style.backgroundColor = newColor;
//                 resolve(newColor)
//             }else{
//                 reject('Error cannot change color')
//             }
//         }, delay)
//     })
// }

// delayedColorChange('red', 2000)
//     .then((color) => {
//         console.log('Changed to', color)
//         return delayedColorChange('green', 2000)
//     })
//     .then((color) => {
//         console.log('Changed to', color)
//         return delayedColorChange('blue', 2000)
//     })
//     .then((color) => {
//         console.log('Changed to', color)
//         return delayedColorChange('black', 2000)
//     })
//     .then((color) => {
//         console.log('Changed to', color)
//     })
//     .catch((err) => {
//         console.log(err)
//     })