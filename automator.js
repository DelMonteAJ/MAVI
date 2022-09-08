// ------------------------Pop-up-------------------------------
function go(){
    console.log("AHHHH");
}


// ------------------------Actual Script------------------------
let elems = document.getElementsByTagName("h1")

for (var i = 0; i < elems.length; i++){
    if (elems[i].innerText.includes("Student Conduct Code")){
        elems[i].innerText = "UAB COol"
    }
}