let autofill = document.getElementById("button1");
let improper = document.getElementById("button2");
let unattended = document.getElementById("button3");
let overnight = document.getElementById("button4");
let mercury = document.getElementById("button5");
let settings = document.getElementById("settings");

// chrome.storage.sync.get("color", ({ color }) => {
//     changeColor.style.color = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page




autofill.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("cm.maxient.com/reportingform")){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: autofiller,
        });
    }else{
        alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
    }
});

improper.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("cm.maxient.com/reportingform")){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: writeup,
            args: ["improper"]
        });
    }else{
        alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
    }
});

unattended.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("cm.maxient.com/reportingform")){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: writeup,
            args: ["unattended"]
        });
    }else{
        alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
    }
});

overnight.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("cm.maxient.com/reportingform")){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: writeup,
            args: ["overnight"]
        });
    }else{
        alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
    }
});

settings.addEventListener("click", async () =>{
    chrome.tabs.create({'url': "../html/options.html" });
});


mercury.addEventListener("click", async () =>{

    function findElementByCriteria(rootElement, attributeName, attributeValue) {
        var elements = rootElement.querySelectorAll('*'); // Select all elements within the root

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.getAttribute(attributeName) === attributeValue) {
                return element; // Return the first element that matches the criteria
            }
        }

        return null; // Return null if no matching element is found
    }

    function findElementByClassName(rootElement, className) {
        if (rootElement.classList && rootElement.classList.contains(className)) {
            return rootElement; // Return the element if it has the desired class
        }

        var children = rootElement.children;
        for (var i = 0; i < children.length; i++) {
            var childResult = findElementByClassName(children[i], className);
            if (childResult) {
                return childResult; // If a child found the element, return it
            }
        }

        return null; // Return null if no matching element is found
    }

    // var desiredClass = "targetClass";
    // var desiredElement = findElementByClassName(document.body, desiredClass);

    // if (desiredElement) {
    //     console.log('Found the element with class', desiredClass, ':', desiredElement);
    // } else {
    //     console.log('Element with class', desiredClass, 'not found.');
    // }

    // var desiredInputElement = findElementByCriteria(document.getElementById('myForm'), 'name', 'username');
    
    // if (desiredInputElement) {
    //     console.log('Found the desired input element:', desiredInputElement);
    // } else {
    //     console.log('Desired input element not found.');
    // }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("rmsapp.ad.uab.edu")){
        // tab.
        // const body = document.getElementsByTagName("body")[0]
        // console.log(`Body: ${body}`)
        // console.log(body)
        // console.log(body.length);
        // const elem = findElementByClassName(body, "pageTable")
        // console.log(elem)
        // for (const row of elem.children){
        //     console.log(row);
        // }
        var url = chrome.runtime.getURL('images/MAVI.png');
        console.log(url)
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: mercuryRebuild,
            args: [url]
        });
    }else{
        alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
    }
});

function mercuryRebuild(url){
    let index = 0
    // let pencilArray = document.getElementsByClassName("BOSubLinkContainerStaticProcessGuestVisitAddEditXf3e7add93b564e2d9f9e853f1b7108df")
    for (const row of document.getElementsByClassName("k-window-title")){
        // for (const row of document.getElementsByTagName("tbody")[37].children){
        const newElem = document.createElement('a')
        console.log(row)
        // newElem.href = "https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&reporters_full_name=5"
        newElem.target = "_blank";
        newElem.value = index
        newElem.onclick = function(){
            let booking = document.getElementById("BAECRConferenceBookingDisplay").innerText
            let building = ""
            if (booking.includes("CH")){
                building = "Camp Hall";
            }else if (booking.includes("BZ")){
                building = "Blazer Hall"
            }else if (booking.includes("RH")){
                building = "Rast Hall"
            }else if (booking.includes("MM")){
                building = "McMahon Hall"
            }else if (booking.includes("GO")){
                building = "Gold Hall"
            }else if (booking.includes("BL")){
                building = "Blount Hall"
            }
            
            building += " " + document.getElementById("BAECRConferenceBookingDisplay").innerText.split(":")[0].substring(3)
            let hostElem = document.getElementById("dlgGVInnerDialog").children[0].children[0].children[0].children[1].innerText
            // link = `https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&reporters_full_name=${hostElem.split(",")[0]}`
            console.log(building.split(" ",2).join(" ").replace(" ", "%20"))
            newElem.href = `https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&location_of_incident_specific=${building.replace(" ", "%20")}&location_of_incident=${building.split(" ",2).join(" ").replace(" ", "%20")}&search_firstname=${hostElem.split(", ")[1].split(" ")[0]}&search_lastname=${hostElem.split(",")[0]}&search_housing_room_num=${parseInt(document.getElementById("BAECRConferenceBookingDisplay").innerText.split(":")[0].substring(3))}`
            console.log(hostElem)
            // chrome.tabs.create({ url: link, active: false });
        }
        image = document.createElement("img")

        image.src = "https://github.com/DelMonteAJ/MAVI/blob/main/images/MAVI_clean_20x20.png?raw=true";
        newElem.appendChild(image)
        // row.children[0].children[0].children[0].appendChild(newElem)
        row.appendChild(newElem);
        index++;
    }
    // pencilArray[0].click()
}



// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    })
}


function autofiller(){
    console.log("[MAVI] Start autofill");
    // setTimeout(async()=>console.log(
    //     await parent.navigator.clipboard.readText()), 3000)
    
    /*
    string = "335	n	Janiyah Gross	Arielle Sillmon	uabcc	9/15/2022	0	9/15/2022	11:48 PM	NC	9/16/2022	12:08 AM	SB														"
    array = string.split("\t")
    for (i = 0; i < array.length; i++){
        if (array[i] == "") {
            continue;
        }
        switch (i){
            case 0:
                console.log(`Room number: ${array[i]}`);


        }
    }
    */
/*
function excelExtract(rowNumber){
    chrome.storage.sync.get("excel", ({ excel }) => {
        if (excel){
            excelStatus = true;
            string = prompt("Insert Excel Row")//"335	n	Janiyah Gross	Arielle Sillmon	uabcc	9/15/2022	0	9/15/2022	11:48 PM	NC	9/16/2022	12:08 AM	SB"
            array = string.split("\t")
            console.log(`Room number: ${array[0]}`);
            console.log(`Resident Name: ${array[2]}`);
            console.log(`Guest Name: ${array[3]}`);
            guest = array[3];
            let checkInDate = array[7];
            console.log(`Check In Date: ${array[7]}`);
            let checkInTime = array[8];
            console.log(`Check In Time: ${array[8]}`);
            console.log(`Check Out Date: ${array[10]}`);
            console.log(`Check Out Time: ${array[11]}`);

    })
}
*/

    var excelRow = "";
    var getExcel = false;
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
            // document.getElementById("search_firstname").value = "DS";
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

    // chrome.storage.sync.get("excel", ({ excel }) =>{
    //     console.log(excel);
    // });

    // grabExcel()
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


    console.log("[MAVI] Autofill complete!");
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
    let role = document.getElementById("role_0");
    if (role.value == "" || role.value == null){
        role.value = "Alleged (Student)";
    }
    let guest = prompt("Guest Name");
    switch(type){
        case "improper":
            element.value = `At approximately ${time} on ${date}, ${hall} resident, ${resName}, signed in guest, ${guest}, to room ${roomNumber}. ${resLastName} did not sign out their guest. This constitutes an improper checkout violation.`
            document.getElementById("location_of_incident_specific").value = hall + " " + roomNumber;
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
            document.getElementById("location_of_incident_specific").value = hall + " " + roomNumber;
            break;
        default:
            element.value = `Could not autocomplete.`
            
    }
}