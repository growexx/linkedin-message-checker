import React, { useState, useEffect } from "react";
import axios from "axios";
import { messages, labels, numbers, csv_headers, columns_title, columns_name } from '../../utils/enum';
import { Table, Button, message, Row, Modal, Empty, Segmented } from 'antd';
import Papa from 'papaparse';

function Connections() {
  const [csvData, setCSVData] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [tabDetails, setTabDetails] = useState({});
  const [inputElements, setInputElements] = useState([]);
  const [UserList, setUserList] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [activeTab, setActiveTab] = useState('0');
  const [data, setData] = useState({});
  const getTabDetails = async () => {
    const res = await chrome.runtime.sendMessage({ message: messages.TAB_DETAILS });
    setTabDetails(res);
    console.log('res---', res);
    // await chrome.tabs.sendMessage(res.tab.id, { message: 'fetchAllList' });
  };
  useEffect(() => {
    console.log('useEffect'); 
    getTabDetails();
  }, []);
  const defaultImageSrc = 'img/default-user-image.png';
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

const handleFetchURLs = async () => {
  let isError = null;
  try {
      // loadingHandler(true);
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
      // loadingHandler(false);
  }
};
  const navigateToProfiles = async () => {
    console.log('navigateToProfiles');
    try {

        console.log('tabDetails--', tabDetails.tab.id);
        let profile = 'https://www.linkedin.com/search/results/people/?keywords=tech%20lead&origin=SWITCH_SEARCH_VERTICAL';
        const response = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.SCRAPE_DETAILS, url: profile, csvData: csvData });
        console.log('response---', response);
        if (response) {
          setUserList(response);
        }
    } catch (error) {
        console.log(error)

    }
};

const openMessageBox = async (profile) => {
  console.log('openMessageBox');
  const response = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.OPEN_PROFILE, profile: profile});
}

const navigateAndExtract = async ( pageNumber, extractedData) => {
  // loadingHandler(true);
  console.log('---navigateAndExtract---');
  try {
      await chrome.tabs.sendMessage(tabDetails.tab.id, {
          message: messages.NAVIGATE,
          pageNumber: pageNumber
      });
      // wait for the page to load
      await new Promise((resolve) => setTimeout(resolve, 7000));
      // scroll the whole page
      const scrollResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.SCROLL });
      if (scrollResponse.status === 'OK') {
          // map the data and highlight
          await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.MAPDATA });
          // extract and store it in LS of the webpage
          await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.EXTRACTFROMUSERPAGE, pageNumber });
          await new Promise((resolve) => setTimeout(resolve, 1500));
          // Get the Data from LS of the webpage
          const extractResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.FETCHFROMLS });
          extractedData.push(...extractResponse.data );
          console.log('extractedData---', extractedData);
          await new Promise((resolve) => setTimeout(resolve, 1000));
      }
  } catch (error) {
    console.log('error---', error);
      // messageApi.open({
      //     type: 'error',
      //     content: error,
      //     duration: 1
      // });
  } finally {
      // await loadingHandler(false);
      await setActiveTab('1');
  }
};

const extractMessageConnections = async() => {
  console.log('---extractMessages---');
  const profileNavigateResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, {
    message: messages.OPEN_PROFILE,
    url:  'https://www.linkedin.com/messaging'
  });
  console.log('profileNavigateResponse--', profileNavigateResponse);
  if (profileNavigateResponse.status === 'OK') {
    await new Promise((resolve) => setTimeout(resolve, 7000));
    const scrollResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.SCROLLMSGCONNECTION });
    alert('scrollResponse--');
    if (scrollResponse.status === 'OK') {
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // Get the Data from LS of the webpage
      // await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.LOADMOREMSGCONNECTION });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const extractMsgConnection = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.EXTRACTMSGCONNECTION });
      console.log('extractMsgConnection--', extractMsgConnection);
    }
  }
};

const extractFromPageRange = async () => {
  // console.log('---extractFromPageRange---');
  // const extractedData = [];
  // const pageData = await chrome.tabs.sendMessage(tabDetails.tab.id, { message: messages.EXTRACTPAGENUMBER });
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  // console.log('pageData---', pageData);
  // const pageRangeFrom = pageData.pageData[0];
  // const pageRangeTo = 2;//pageData.pageData[1];
  // console.log('from--', pageRangeFrom, 'to---', pageRangeTo);
  // for (let i = pageRangeFrom; i <= Number(pageRangeTo); i++) {
  //     await navigateAndExtract(i, extractedData);
  // }
  // setData({ page: `Extracted from ${pageRangeFrom} - ${pageRangeTo}`, data: extractedData });
  await extractMessageConnections();
};

if (UserList.length === 0) {
  return (
    <div>
      <div>
        {/* <input type="file" onChange={handleCSVFileChange} /> */}
        {/* <button onClick={navigateToProfiles}>Scrape Data</button> */}
        No of Days: <input type="text" id="name_of_days"/><br/>
        Total Result: <input type="text" id="total_result"/><br/>
        <button onClick={extractFromPageRange}>Scrape Data</button>
      </div>
      {/* <div class="user-list">
        <p>No users found.</p>
      </div> */}
    </div>
  );
}
else {
  return (
    <div>
      <div class="user-list">
      {
        UserList.map(user => (
          <div class="user" style={{
            display: "flex",
          }}>
            <div class="left">
              { user.img ? (
                <img
                  src={user.img}
                  alt={user.name}
                  style={{
                    width: "50px"
                  }}
                />
              ) : (
                <img src={defaultImageSrc} alt="Default" style={{
                  width: "50px"
                }}/>
              )}
            </div>
            <div class="right">
              <label  style={{
                fontWeight: "bold",
                padding: "10px"
              }}>{user.name}</label>
              <button style={{
                background: "lightskyblue",
                border: "none",
                padding: "5px",
                cursor: "pointer"
              }} 
              // onClick={openMessageBox(user.profile_index)}
              onClick={() => openMessageBox(user.profile_index)}
              >Message</button>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
}
}

export default Connections;
