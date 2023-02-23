// Passing in functions as an argument
const greet = function () {
    console.log('Hello!')
}

function greetTwice (greet) {
    greet()
    greet()
}


const greet2 = function (number) {
    console.log('Hello!', number)
}

function greetTenTimes (greet) {
    for (let i=1; i <= 10; i++){
        greet2(i)
    }
}

// Returning functions
function matchResult(team1, team2, ods) {
    const result = Math.random()
    if (result <= ods) {
        return function () {
            console.log(`${team1} beats ${team2}`)
        }
    } else {
        return function () {
            console.log(`${team2} won!!!`)
            console.log(`${team1} sucks :p`)
        }
    }
}
// matchResult('Liverpool', 'Man U', 0.7)

// Factory function
function isBetween1(num){
    return num >= 50 && num <= 100
}

function isBetween2(num){
    return num >= 100 && num <= 200
}

function isBetween(num, min, max){
    return num >= min && num <= max
}

function isBetweenFactory(min, max) {
    return function (num) {
        return num >= min && num <= max
    }
}

const page1 = isBetweenFactory(1, 100)
const page2 = isBetweenFactory(101, 200)
const page3 = isBetweenFactory(201, 300)

// console.log(page1(150))
// console.log(page2(150))
// console.log(page3(150))
