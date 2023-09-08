/* global chrome */
import React, { useState } from 'react';
import Papa from 'papaparse';
import { message } from 'antd';
import TableView from '../../repeatableCards/TableView';
import { messages, numbers } from '../../utils/enum';

/**
    * @desc This function is being used read CSV data
    * @author Growexx
    * @since 18/08/2023
    * @param {Object} req.prop request prop
*/
function CSVReader(prop) {
    const { onTabDetails, loadingHandler } = prop;

    const [csvData, setCSVData] = useState([]);
    const [profileDetails, setProfileDetails] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleCSVFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                setCSVData(result.data);
            },
            header: true // Set to true if your CSV file has headers
        });
    };

    const navigateToProfiles = async (tabId, profile) => {
        let obj = {};
        try {
            await chrome.tabs.sendMessage(tabId, { message: messages.OPEN_PROFILE, url: profile });
            await delay(numbers.TEN_THOUSAND);
            await chrome.tabs.sendMessage(tabId, { message: messages.SCRAPE_DETAILS, url: profile });
            const response = await chrome.tabs.sendMessage(tabId, { message: messages.GET_FROM_LS });
            obj = { ...response };
            if (response.skills?.url) {
                const newTab = await chrome.tabs.create({ url: response.skills.url });
                await delay(numbers.FIVE_THOUSAND);
                const skillDetails = await chrome.tabs.sendMessage(newTab.id, { message: messages.SCRAPE_SKILLS, userInfo: response });
                obj.skills.skills = skillDetails;

                await chrome.tabs.remove(newTab.id);
            }
            if (response.post) {
                const newTab = await chrome.tabs.create({ url: response.post });
                await delay(numbers.FIVE_THOUSAND);
                const postDetailsArr = await chrome.tabs.sendMessage(newTab.id, { message: messages.SCRAPE_POST });
                obj.recentPost = postDetailsArr;
                await delay(numbers.TWO_THOUSAND);
                await chrome.tabs.remove(newTab.id);
            }
            return obj;

        } catch (error) {
            console.log(error)

        }
    };

    const handleFetchURLs = async () => {
        let isError = null;
        try {
            loadingHandler(true);
            const tabId = onTabDetails.tab.id;
            const finalProfiles = [];
            if (csvData.length > 0 && tabId) {
                for (const row of csvData) {
                    if (row.ProfileUrls) {
                        const profileObj = await navigateToProfiles(tabId, row.ProfileUrls);
                        finalProfiles.push(profileObj)
                    }
                    else {
                        isError = {
                            type: 'error',
                            content: messages.CSV_NOT_CONTAIN_FIELD,
                            duration: 1
                        }
                    }
                }
            }
            isError && messageApi.open(isError);

            setProfileDetails((prevState) => finalProfiles);
        } catch (error) {
            console.log(error);
        } finally {
            loadingHandler(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <div>
                <input type="file" onChange={handleCSVFileChange} />
                <button onClick={handleFetchURLs}>Scrape Data</button>
            </div>
            <div>
                <TableView data={profileDetails} loadingHandler={loadingHandler} />
            </div>
        </div>
    );
}

export default CSVReader;
