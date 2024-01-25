let autofill = document.getElementById("button1");
// let improper = document.getElementById("button2");
// let unattended = document.getElementById("button3");
// let overnight = document.getElementById("button4");
let mercury = document.getElementById("button5");
let settings = document.getElementById("settings");
let scan = document.getElementById("button6");

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

// Used for manual usage
// 
// improper.addEventListener("click", async () =>{
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
//     if (tab.url.includes("cm.maxient.com/reportingform")){
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: writeup,
//             args: ["improper"]
//         });
//     }else{
//         alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
//     }
// });

// unattended.addEventListener("click", async () =>{
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
//     if (tab.url.includes("cm.maxient.com/reportingform")){
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: writeup,
//             args: ["unattended"]
//         });
//     }else{
//         alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
//     }
// });

// overnight.addEventListener("click", async () =>{
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
//     if (tab.url.includes("cm.maxient.com/reportingform")){
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: writeup,
//             args: ["overnight"]
//         });
//     }else{
//         alert("Maxient is not detected. Feature is only active when Maxient is currently on-screen.");
//     }
// });

settings.addEventListener("click", async () =>{
    chrome.tabs.create({'url': "../html/options.html" });
});


scan.addEventListener("click", async () =>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("rmsapp.ad.uab.edu")){
        var url = chrome.runtime.getURL('images/MAVI.png');
        console.log(url)
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scanner
        });
    }else{
        alert("Mercury is not detected. Feature is only active when Mercury is currently on-screen.");
    }
});

mercury.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tab.url.includes("rmsapp.ad.uab.edu")){
        var url = chrome.runtime.getURL('images/MAVI.png');
        console.log(url)
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: mercuryRebuild
        });
    }else{
        alert("Mercury is not detected. Feature is only active when Mercury is currently on-screen.");
    }
})

function scanner(){
    let rows = document.getElementsByClassName('userParentRow')
    console.log(`Iterating through ${rows.length} rows`)

    function countHoursBetweenMidnightAnd8AM(startDate, endDate) {
        // Convert dates to milliseconds
        var start = startDate.getTime();
        var end = endDate.getTime();
        
        // Calculate the time difference in milliseconds
        var timeDiff = Math.abs(end - start);
        
        // Convert time difference to hours
        var hoursDiff = timeDiff / (1000 * 3600); // 1 hour = 1000 milliseconds * 60 seconds * 60 minutes
        
        // Initialize count for hours between midnight and 8 AM
        var count = 0;
        
        // Iterate over each hour and count the ones between midnight and 8 AM
        for (var i = start; i < end; i += 3600 * 1000) {
            var hour = new Date(i).getHours();
            if (hour >= 0 && hour < 8) {
                var nextHour = i + 3600 * 1000;
                var hourDiff = Math.min((nextHour - i) / (3600 * 1000), (end - i) / (3600 * 1000));
                count += hourDiff;
            }
        }
        
        return count;
    }
    var count = 0;
    for (var row of rows){
        var startDate = new Date(row.children[7].innerText);
        var endDate = new Date(row.children[9].innerText);
        var note = row.children[10].innerText;
        if (countHoursBetweenMidnightAnd8AM(startDate, endDate) > 5 && row.children[8].innerText == "No"){
            console.log(`Date Start: ${startDate}`)
            console.log(`Date End: ${endDate}`)
            row.bgColor = 'Orange'
            row.style = ""
            count++
        }else if (note.toLowerCase().includes("improper")){
            row.bgColor = 'Orange'
            row.style = ""
            count++
        }
        else if (note.toLowerCase().includes("unescorted")){
            row.bgColor = 'Orange'
            row.style = ""
            count++
        }

        if (note.toLowerCase().includes("filed")){
            row.bgColor = 'Lime'
            row.style = ""
            count--
            
        }
    }
    if (count > 0){
        alert(count > 1 ? `There are ${count} violations.` : `There is only 1 violation.`)
    }else{
        alert("There are no violations.")
    }

}

function mercuryRebuild(url){

    for (const row of document.getElementsByClassName("k-window-title")){

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
        
        let hostElem = document.getElementById("dlgGVInnerDialog").children[0].children[0].children[0].children[1].innerText
        building += " " + document.getElementById("BAECRConferenceBookingDisplay").innerText.split(":")[0].substring(3)


        let checkOutNote = document.getElementById("txtdlgGVCheckOutNote").value

        let checkInDate = document.getElementById("dlgGVCheckIn").value.split(" ")[0]
        let checkOutDate = document.getElementById("dlgGVCheckOut").value.split(" ")[0]
        let checkInTime = (document.getElementById("dlgGVCheckIn").value.split(" ")[1] + " " + document.getElementById("dlgGVCheckIn").value.split(" ")[2]).replace(":","%3A").replace(" ", "%20")
        let checkOutTime = (document.getElementById("dlgGVCheckOut").value.split(" ")[1] + " " + document.getElementById("dlgGVCheckOut").value.split(" ")[2]).replace(":","%3A").replace(" ", "%20")
        let month = checkOutDate.split("/")[0]
        if (month.length == 1) month = "0"+month
        let day = checkOutDate.split("/")[1]
        if (day.length == 1) day = "0"+day
        let year = checkOutDate.split("/")[2]
        let date = year+"%2D"+month+"%2D"+day
        let template = ""
        let firstName = hostElem.split(", ")[1].split(" ")[0]
        let lastName = hostElem.split(",")[0]
        let guestFirstName = document.getElementById("DisplayText").value.split(", ")[1].split(" ")[0]
        let guestLastName = document.getElementById("DisplayText").value.split(",")[0]
        let roomNumber = document.getElementById("BAECRConferenceBookingDisplay").innerText.split(":")[0]
        let name = firstName + " " + lastName
        let guestName = guestFirstName + " " + guestLastName
        if (checkOutNote.toLowerCase().includes("improper")) {
            template = `At approximately ${checkInTime} on ${checkInDate}, ${building.split(" ",2).join(" ")} resident, ${name}, signed in guest, ${guestName}, to room ${roomNumber}. Resident ${lastName} did not sign out their guest. This constitutes an improper checkout violation. `
            violationType = "improper"
            console.log(violationType)
        }else if(checkOutNote.toLowerCase().includes("overnight")){
            template = `At approximately ${checkInTime} on ${checkInDate}, ${building.split(" ",2).join(" ")} resident, ${name}, signed in guest, ${guestName}, to room ${roomNumber}. Resident ${lastName} signed out their guest at ${checkOutTime} on ${checkOutDate} and did not have an overnight guest form on file. This constitutes an overnight guest violation.`.replace(" ", "%20").replace(",", "%2C")
            violationType = "overnight"
            console.log(violationType)
        }else if(checkOutNote.toLowerCase().includes("unescorted")){
            template = `At approximately ${checkInTime} on ${checkInDate}, ${building.split(" ",2).join(" ")} resident, ${name}, signed in guest, ${guestName}, to room ${roomNumber}. Resident ${lastName} was seen without their guest at approximately TIME. This constitutes an unescorted guest violation. `
            checkOutTime = ""
            violationType = "unescorted"
            console.log(violationType)
        }

        link = `https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&location_of_incident_specific=${building.replace(" ", "%20")}&location_of_incident=${building.split(" ",2).join(" ").replace(" ", "%20")}&search_firstname=${hostElem.split(", ")[1].split(" ")[0]}&search_lastname=${hostElem.split(",")[0]}&search_housing_room_num=${parseInt(document.getElementById("BAECRConferenceBookingDisplay").innerText.split(":")[0].substring(3))}&date_of_incident=${date}&time_of_incident=${checkOutTime}&aq[1][answer]=${template}`
        chrome.runtime.sendMessage({ link });
    }
}

// Background or Popup Script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.link) {
      // Handle the result here
      chrome.tabs.create({ url: message.link })
      // You can do whatever you need with the result
    }
  });
  



function autofiller(){
    console.log("[MAVI] Start autofill");

    rfullName = document.getElementById("reporters_full_name");


    rNumber = document.getElementById("reporters_phone_number");


    rEmail = document.getElementById("reporters_email_address");


    rAddress = document.getElementById("reporters_physical_address");


    vType = document.getElementById("urgency");
    vType.value = "ONLY INVOLVES Residence Life Visitation Policy Violation"
    
    vLocation = document.getElementById("location_of_incident");
    // vLocation.value = "Gold Hall"

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

    chrome.storage.sync.get("hall", ({ hall }) => {
        if (hall == ""){
            vLocation.value = "Blazer Hall";
        }else{
            vLocation.value = hall;
        }
    });

    vLocation.value = document.getElementById("location_of_incident_specific").value.split(" ",2).join(" ")
    console.log(vLocation)
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

    rTitle = document.getElementById("reporters_title");
    rTitle.value = vLocation.value + " Resident Assistant";


    let role = document.getElementById("role_0");
    if (role.value == "" || role.value == null){
        role.value = "Alleged (Student)";
    }

    console.log("[MAVI] Autofill complete!");
}

/*


USED FOR MANUAL USAGE

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

*/