

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

    if (tab && tab.pendingUrl && !tab.pendingUrl.includes("maxient")){
      return
    }
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
  
        populateFormFields();
      },
    });
  
})


  // Add a listener for tab updates
  // chrome.tabs.onUpdated.addListener(onTabUpdated); 


// WORKS FOR SERVICE WORKER VIEW ON EXTENSIONS PAGE 
// Could not think of a way to utilize this, so it is currently dead, reactivate the following code in manifest
// "contentScriptFunc": {
//     "suggested_key": "Ctrl+Shift+I",
//     "description" : "Custom Function"
// },
chrome.commands.onCommand.addListener((command) => {
    console.log("Hello world");
});


