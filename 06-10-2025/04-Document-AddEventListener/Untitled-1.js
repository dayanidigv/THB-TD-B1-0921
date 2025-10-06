



function Calculate (method, callback, value1=0, value2=0){
    if(method === "square"){
        callback(value1);
    }else{
        callback(value1, value2);
    }
}


function add(value1, value2){
    console.log(value1 + value2);
}

function sub(value1, value2){
    console.log(value1 - value2);
}

function multiple(value1, value2){
    console.log(value1 * value2);
}

function square(value1){
    console.log(value1 * value1);
}

Calculate("add", add, 5, 3);
Calculate("sub", sub, 5, 3);
Calculate("multiple", multiple, 5, 3);
Calculate("square", square, 5);

// user input method, value1, value2
// if(method === "add"){
//     add(value1, value2);
// }else if(method === "sub"){
//     sub(value1, value2);
// }else if(method === "multiple"){
//     multiple(value1, value2);
// }else if(method === "square"){
//     square(value1);
// }

if (method in ["add", "sub", "multiple", "square"]) {
    let methods = { "add": add, "sub": sub, "multiple": multiple, "square": square};
    Calculate(method, methods[method], value1, value2);
    // call the function
} else {
    console.log("Unknown method");
}



// hello();
// world();