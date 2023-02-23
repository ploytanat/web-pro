// Convert to async await
const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        const randnum = Math.random()
        setTimeout(() => {
            if (randnum > 0.4){
                document.body.style.backgroundColor = newColor;
                resolve(newColor)
            }else{
                reject('Error cannot change color')
            }
        }, delay)
    })
}

async function main () {
    try{
        await delayedColorChange('red', 2000)
        await delayedColorChange('green', 2000)
        await delayedColorChange('blue', 2000)
        await delayedColorChange('black', 2000)
    } catch (err) {
        console.log(err)
    }
}

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