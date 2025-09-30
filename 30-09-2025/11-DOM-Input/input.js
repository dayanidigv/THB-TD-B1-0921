// Getting Text from User

function showName() {
    let input = document.getElementById("nameInput");
    let name = input.value;
    
    let result = document.getElementById("result");
    result.innerHTML = "Hello " + name + "!";
    
    console.log("Name entered:", name);
}