function mapToSquare (input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    const result = input.map(x => x**2);
    return result;
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()

    var num = input.map(Maptemp);
    function Maptemp(input){
        return fah_to_celsius(input.temperature)
    }

    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }
    
    for(let i = 0; i< input.length; i++){
        input[i].temperature = num[i];
    }
    return input;
}


function filterEvenNumber (input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    const ans = input.filter(x => (x%2==0));
    return ans;
}

function filterAgeRange (input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    let result = input.people.filter(x => (x.age >= (input.min)) && (x.age <= (input.max)));
    return result;
}

function removeByFilter (input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    result = input.people.filter(x => x.id != (input.removeId));
    return result;
}

function replaceBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **เปลี่ยน (replace)** สมาชิกใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(4, 1, 4 )
     return input;
}
