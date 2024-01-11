// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getMetaDetails") {
        chrome.tabs.sendMessage(sender.tab.id, {
            action: "getMetaDetails"
        }, function (response) {
            sendResponse(response);
        });
        return true; // Required for sendResponse to work asynchronously
    }
});
chrome.commands.onCommand.addListener(function (command) {
    if (command === "_execute_action") {
        // (e.g., open the popup window or trigger the relevant functionality)
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "getMetaDetails"
            });
        });
    }
});