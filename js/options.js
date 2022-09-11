let saveElem = document.getElementById("save");
let hallElem = document.getElementById("hall");
let nameElem = document.getElementById("name");
let emailElem = document.getElementById("email");
let phoneElem = document.getElementById("phone");

saveElem.addEventListener("click", ()=>{
    let hall = document.getElementById("hall").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    
    chrome.storage.sync.set({phone});
    chrome.storage.sync.set({email});
    chrome.storage.sync.set({name});
    chrome.storage.sync.set({hall});
    console.log("Saved!");
    close();
    alert("Configuration saved!");
})
function load(){
    chrome.storage.sync.get("hall", ({ hall }) => {
        if (hall == "" || hall == null){
            hallElem.value = "Blazer Hall";
        }else{
            hallElem.value = hall;
        }
    });
    
    chrome.storage.sync.get("name", ({ name }) => {
        if (name == "" || name == null){
            nameElem.value = "Blaze the Dragon";
        }else{
            nameElem.value = name;
        }
    });
    
    chrome.storage.sync.get("email", ({ email }) => {
        if (email == "" || email == null){
            emailElem.value = "blaze@uab.edu";
        }else{
            emailElem.value = email;
        }
    });
    
    chrome.storage.sync.get("phone", ({ phone }) => {
        if (phone == "" || phone == null){
            phoneElem.value = "1234567890";
        }else{
            phoneElem.value = phone;
        }
    });
}

load()