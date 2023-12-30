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