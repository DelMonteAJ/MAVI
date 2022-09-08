let autofill = document.getElementById("button1");
let improper = document.getElementById("button2");
let unattended = document.getElementById("button3");
let overnight = document.getElementById("button4");

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
    rfullName.value = "Fullest Fulling Name";

    rNumber = document.getElementById("reporters_phone_number");
    rNumber.value = "1249356353";

    rEmail = document.getElementById("reporters_email_address");
    rEmail.value = "reslife@uab.edu";

    rAddress = document.getElementById("reporters_physical_address");
    rAddress.value = "1720 University Blvd";

    vType = document.getElementById("urgency");
    vType.value = "ONLY INVOLVES Residence Life Visitation Policy Violation"
    
    vLocation = document.getElementById("location_of_incident");
    vLocation.value = "Gold Hall"

    rTitle = document.getElementById("reporters_title");
    rTitle.value = "RA " + vLocation.value;

    if (vLocation.value == "Gold Hall"){
        rAddress.value = "900 17th St S, Birmingham, AL 35205"
    }

    console.log("autofilled");
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
    console.log(`${element.value} - ${type}`);
    switch(type){
        case "improper":
            element.value = `At approximately ${time} on ${date}, ${hall} resident, ${resName}, signed in guest, GUEST_NAME, to room ${roomNumber}. ${resLastName} did not sign out their guest. This constitutes an improper checkout violation.`
            break;
        case "unattended":
            let specificLocation = document.getElementById("location_of_incident_specific").value.toLowerCase();
            if (specificLocation != ""){
                element.value = `At approximately CHECK_IN_TIME on ${date}, ${hall} resident, ${resName}, signed in guest, GUEST_NAME, to room ${roomNumber}. ${resLastName} was seen by RA DISCOVER_NAME in the ${specificLocation} without their guest at approximately ${time}. This constitutes an unescorted guest violation.`
            }else{
                element.value = `At approximately CHECK_IN_TIME on ${date}, ${hall} resident, ${resName}, signed in guest, GUEST_NAME, to room ${roomNumber}. ${resLastName} was seen by RA DISCOVER_NAME in the LOCATION without their guest at approximately ${time}. This constitutes an unescorted guest violation.`
            }
            break;
        case "overnight":
            element.value = `At approximately CHECK_IN_DATE on CHECK_IN_DATE, ${hall} resident, ${resName}, signed in guest, GUEST_NAME, to room ${roomNumber}. ${resLastName} signed out their guest at ${time} on ${date} and did not have an overnight guest form on file. This constitutes an overnight guest violation.`
            break;
        default:
            element.value = `Could not autocomplete.`
            
    }
}