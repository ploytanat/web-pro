function plus(input){
    // TODO: สร้าง function ที่นำ input จำนวน 2 ตัวมาบวกกัน
    const ans = input.reduce((x, y) => x + y, 0)
    return ans;
}

// TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
// *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
// global variable
let a = 'Hello';

function greet() {
    // local variable
    let b = 'World';
    if (b == 'World') {
        // block-scoped variable
        var c = 'hello';
    }

    // variable c cannot be accessed here
    console.log(a + ' ' + b + ' ' + c);
    return a + ' ' + b + ' ' + c
}

function varLetConst() {
    // TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
    // *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
    var k = 5
    let j = 30
    var i = 0
    for (let  j = 0; j <= 5; j++) {
        i++
    }
    for (let  j = 0; j <= 5; j++) {
        j++
    }
    console.log(j)
    console.log(i)
    console.log(k)
    console.log(j + k + i)
    return j + k + i
}

function chainfunction(input){
    // TODO: จงใช้ String method และการ chain function ให้ผลลัพธ์ตรงตามโจทย์

    //เขียนต่อจาก Return ได้เลยครับ

    return input.toUpperCase().trim().split(" ").shift()+" "+input.toLowerCase().trim().split(" ").pop();
}