LinkedIn Message Checker Extension
Overview
The LinkedIn Message Checker Extension is a tool that helps you keep track of your direct messages on LinkedIn and identify contacts you haven't replied to. It provides functionality to scrape message data, filter connections, and perform various actions on the LinkedIn platform.

Table of Contents
Installation
Usage
Functions
How it Works

Installation

Open the project and run command : 'yarn run build'

Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode by toggling the switch in the top right corner.

Click on "Load unpacked" and select the folder containing the extension files (dist folder).

The LinkedIn Message Checker Extension should now be installed and visible in your Chrome extensions.

Usage
Navigate to LinkedIn and log in to your account.

Click on the extension icon in the Chrome toolbar to open the extension.

Follow the instructions provided by the extension to perform various actions, such as scraping message data, filtering connections, and more.

Functions

1. Scraping Message Connections
This function extracts information about your message connections, including their name, message content, and whether the message has been read or not.

2. Checking Unreplied Messages
The extension checks for messages you haven't replied to and provides a summary of the count.

3. Page Navigation and Pagination
The extension allows you to navigate through pages on LinkedIn and handle pagination.

4. Extracting User-Selected Data Points
This function extracts specific data points from a list of elements on a webpage.

5. End Number
End number is where you want to stop your loop and it is in constant files

6.Filteration
Filter the common words - Happy Anniversary, Happy Work Anniversary

How it Works
The extension uses JavaScript and Chrome's extension APIs to interact with the LinkedIn website. It leverages DOM manipulation to extract and process data from various elements on the page.

