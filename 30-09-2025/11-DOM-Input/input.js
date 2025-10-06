// Getting Text from User

function showName() {
    let input = document.getElementById("nameInput");
    let name = input.value;
    
    let result = document.getElementById("result");
    result.innerHTML = "Hello " + name + "!";
    
    console.log("Name entered:", name);
}

function changes(e) {
    // console.log("Input changed:", e.value);

    console.log(e);
}



let e = document.querySelector('input[type="text"]');
console.log(e);  // "Daya"
