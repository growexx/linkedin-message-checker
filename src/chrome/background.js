
/* global chrome */
import { backgroundMessages } from '../utils/enum';
let tabDetails = {};

// ON installation Event
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == backgroundMessages.INSTALL) {
        console.log('This is a first install!');
    } else if (details.reason == 'update') {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log(
            'Updated from ' + details.previousVersion + ' to ' + thisVersion + '!'
        );
    }
});


chrome.action.onClicked.addListener(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.windows.create({
        tabId: tab.id,
        url: 'popup.html',
        width: 1000,
        height: 800,
        type: 'popup',
        left: 350,
        top: 100
    });

    tabDetails = tab;
});

// For recieving messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === backgroundMessages.TABDETAILS) {
        sendResponse({ tab: tabDetails });
    }
    return true;
});
