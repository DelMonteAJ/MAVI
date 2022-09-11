

chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        let internalUrl = chrome.runtime.getURL("html/options.html");
        chrome.tabs.create({ url: internalUrl }, function (tab) {
            
        });
    }
    // console.log("Following along with https://developer.chrome.com/docs/extensions/mv3/getstarted/");
});


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

