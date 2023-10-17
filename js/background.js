

chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        let internalUrl = chrome.runtime.getURL("html/options.html");
        chrome.tabs.create({ url: internalUrl }, function (tab) {
            
        });
    }
    // console.log("Following along with https://developer.chrome.com/docs/extensions/mv3/getstarted/");
});

chrome.tabs.onCreated.addListener(function (tab) {
    // Check if the tab is fully loaded (you can adjust this condition as needed)
    console.log("dsf")
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        // Function to process URL query parameters and autopopulate form fields
        function populateFormFields() {
          console.log(`${window.location.hostname}`);
          const urlParams = new URLSearchParams(window.location.search);
          const formFields = document.querySelectorAll('input, textarea');
          
          formFields.forEach((field) => {
            const paramName = field.name;
            const paramValue = urlParams.get(paramName);
            
            if (paramValue !== null) {
              field.value = paramValue;
            }
          });
        }
  
        if (tab.url.includes("maxient")) populateFormFields();
      },
    });
  
})

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  // Check if the URL being navigated to is a hyperlink (http/https)
  if (details.url.includes("cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham")) {
    // Open the link in a new tab
    // chrome.tabs.create({ url: details.url, active: false });
  }
});

function mercuryRebuild(url){
    let index = 0
    // let pencilArray = document.getElementsByClassName("BOSubLinkContainerStaticProcessGuestVisitAddEditXf3e7add93b564e2d9f9e853f1b7108df")
    for (const row of document.getElementsByClassName("userParentRow")){
        // for (const row of document.getElementsByTagName("tbody")[37].children){
            const newElem = document.createElement('img')
            // newElem.href = "https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&reporters_full_name=5"
            // newElem.target = "_blank";
            newElem.value = index
            newElem.onclick = function(){
                let pencilArray = document.getElementsByClassName("BOSubLinkContainerStaticProcessGuestVisitAddEditXf3e7add93b564e2d9f9e853f1b7108df")
                pencilArray[this.value].click()
                let hostElem = document.getElementById("dlgGVInnerDialog").children[0].children[0].children[0].children[1].innerText
                link = `https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&reporters_full_name=${hostElem.split(",")[0]}`
                // newElem.href = `https://cm.maxient.com/reportingform.php?UnivofAlabamaBirmingham&layout_id=0&reporters_full_name=${hostElem.split(",")[0]}`
                console.log(hostElem)
                chrome.tabs.create({ url: link, active: false });
            }
        image = document.createElement("img")

        image.src = "https://github.com/DelMonteAJ/MAVI/blob/main/images/MAVI_clean_20x20.png?raw=true";
        newElem.appendChild(image)
        // row.children[0].children[0].children[0].appendChild(newElem)
        row.children[0].children[0].appendChild(newElem);
        index++;
    }
    // pencilArray[0].click()
}

function onTabUpdated(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes("rmsapp.ad.uab.edu")) {
      // Your code to execute here
      console.log("URL changed to:", tab.url);
      
      var url = chrome.runtime.getURL('images/MAVI.png');
      console.log(url)
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: mercuryRebuild,
          args: [url]
      });
      // You can also send a message to content scripts or perform other actions here
    }
  }
  
  // Add a listener for tab updates
  chrome.tabs.onUpdated.addListener(onTabUpdated);


// WORKS FOR SERVICE WORKER VIEW ON EXTENSIONS PAGE 
// Could not think of a way to utilize this, so it is currently dead, reactivate the following code in manifest
// "contentScriptFunc": {
//     "suggested_key": "Ctrl+Shift+I",
//     "description" : "Custom Function"
// },
chrome.commands.onCommand.addListener((command) => {
    console.log("Hello world");
});


// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: toggleDark
//     });
// });

// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command: ${command}`);
// });

// function toggleDark () {
//     if (!document.body.getAttribute('data-ext-dark')) {
//         document.body.setAttribute('data-ext-dark', true);
//         document.body.style.backgroundColor = '#000';
//         document.body.style.color = '#fff';
//     } else {
//         document.body.setAttribute('data-ext-dark', false);
//         document.body.style.backgroundColor = '#fff';
//         document.body.style.color = '#000';
//     }
// }
// chrome.contextMenus.create ({
//     "title": "View Top Posts From This Subreddit",
//     "contexts": ["selection"],
//     "onclick": openTab()
// });

// function openTab(){
//     return function(info, tab){
//         let text = info.selectionText;
//         let redditLink = "https://www.reddit.com/" + format(text) +     
//         "/top/?t=all"
//         chrome.tabs.create ({index: tab.index + 1, url: redditLink, 
//         selected: true});
//     }
// };

// function format(subName){
//     if (subName[0] === "r" && subName[1] === "/"){
//         return subName
//     }
//     else {
//         return "r/" + subName
//     }
// };

