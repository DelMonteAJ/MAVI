let autofill = document.getElementById("button1");
let improper = document.getElementById("button2");
let unattended = document.getElementById("button3");
let overnight = document.getElementById("button4");
let settings = document.getElementById("settings");

// chrome.storage.sync.get("color", ({ color }) => {
//     changeColor.style.color = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
autofill.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: autofiller,
    });
});

improper.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: writeup,
        args: ["improper"]
    });
});

unattended.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: writeup,
        args: ["unattended"]
    });
});

overnight.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: writeup,
        args: ["overnight"]
    });
});

settings.addEventListener("click", async () =>{
    chrome.tabs.create({'url': "../html/options.html" });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    })
}

function autofiller(){
    console.log("start autofill");
    
    rfullName = document.getElementById("reporters_full_name");


    rNumber = document.getElementById("reporters_phone_number");


    rEmail = document.getElementById("reporters_email_address");


    rAddress = document.getElementById("reporters_physical_address");


    vType = document.getElementById("urgency");
    vType.value = "ONLY INVOLVES Residence Life Visitation Policy Violation"
    
    vLocation = document.getElementById("location_of_incident");
    vLocation.value = "Gold Hall"

    chrome.storage.sync.get("hall", ({ hall }) => {
        if (hall == ""){
            vLocation.value = "Blazer Hall";
        }else{
            vLocation.value = hall;
        }
    });

    chrome.storage.sync.get("name", ({ name }) => {
        if (name == ""){
            rfullName.value = "Blaze the Dragon";
        }else{
            rfullName.value = name;
        }
    });

    chrome.storage.sync.get("email", ({ email }) => {
        if (email == ""){
            rEmail.value = "blaze@uab.edu";
        }else{
            rEmail.value = email;
        }
    });

    chrome.storage.sync.get("phone", ({ phone }) => {
        if (phone == ""){
            rNumber.value = "1234567890";
        }else{
            rNumber.value = phone;
        }
    });

    rTitle = document.getElementById("reporters_title");
    rTitle.value = vLocation.value + " Resident Assistant";

    switch (vLocation.value){
        case "Blazer Hall":
            rAddress.value = "920 16th St S, Birmingham, AL 35205";
            break;

        case "Blount Hall":
            rAddress.value = "1001 14th St S, Birmingham, AL 35205";
            break;

        case "Camp Hall":
            rAddress.value = "1516 10th Ave S, Birmingham, AL 35205";
            break;

        case "Gold Hall":
            rAddress.value = "900 17th St S, Birmingham, AL 35205"
            break; 

        case "McMahon Hall":
            rAddress.value = "1600 10th Ave S, Birmingham, AL 35205";
            break;

        case "Rast Hall":
            rAddress.value = "1530 11th Ave S, Birmingham, AL 35205";
            break;

        default:
            rAddress.value = "1720 University Blvd, Birmingham, AL 35205";
    }


    console.log("[AV] Autofill complete!");
}

function writeup(type){
    let element = document.getElementById("aq[1][answer]");
    let dateArray = document.getElementById("date_of_incident").value.split("-");
    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];
    let date = month+"/"+day+"/"+year;

    let time = document.getElementById("time_of_incident").value;

    let hallArray = document.getElementById("halladdress_0").value.split(" ");
    let hall = hallArray[0] + " Hall";
    let resName = document.getElementById("person_0").value;
    
    let nameArray = resName.split(" ");
    let resLastName = nameArray[nameArray.length-1];
    let roomNumber = hallArray[hallArray.length-1];
    let guest = prompt("Guest Name");
    switch(type){
        case "improper":
            element.value = `At approximately ${time} on ${date}, ${hall} resident, ${resName}, signed in guest, ${guest}, to room ${roomNumber}. ${resLastName} did not sign out their guest. This constitutes an improper checkout violation.`
            break;
        case "unattended":
            let specificLocation = document.getElementById("location_of_incident_specific").value.toLowerCase();
            let checkIn = prompt("Check In Time [12:00 AM/PM]");
            let discoverName = prompt("Full name of RA who discovered violation");
            if (specificLocation != ""){
                element.value = `At approximately ${checkIn} on ${date}, ${hall} resident, ${resName}, signed in guest, ${guest}, to room ${roomNumber}. ${resLastName} was seen by RA ${discoverName} at the ${specificLocation} without their guest at approximately ${time}. This constitutes an unescorted guest violation.`
            }else{
                let location = prompt("Location that the violation was found");
                document.getElementById("location_of_incident_specific").value = location;
                element.value = `At approximately ${checkIn} on ${date}, ${hall} resident, ${resName}, signed in guest, ${guest}, to room ${roomNumber}. ${resLastName} was seen by RA ${discoverName} at the ${location.toLowerCase()} without their guest at approximately ${time}. This constitutes an unescorted guest violation.`
            }
            break;
        case "overnight":
            let checkInTime = prompt("Check In Time [12:00 AM/PM]");
            let checkInDate = prompt("Check In Date [MM/DD/YYYY]");
            element.value = `At approximately ${checkInTime} on ${checkInDate}, ${hall} resident, ${resName}, signed in guest, ${guest}, to room ${roomNumber}. ${resLastName} signed out their guest at ${time} on ${date} and did not have an overnight guest form on file. This constitutes an overnight guest violation.`
            break;
        default:
            element.value = `Could not autocomplete.`
            
    }
}