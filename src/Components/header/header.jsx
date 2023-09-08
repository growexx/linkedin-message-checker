/* global chrome */
import React from 'react';
import classes from './Header.module.css';
import { useEffect, useState } from 'react';
import { messages } from '../../utils/enum';
import Connections from '../connections/connections';
import UserList from '../connections/UserList';
import { Card, List, Tabs } from "antd";

const { TabPane } = Tabs;

function Header() {
    const [tabDetails, setTabDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const executeLoader = (loadingFlag) => {
        setLoading(loadingFlag);
    };
    const getTabDetails = async () => {
        const res = await chrome.runtime.sendMessage({ message: messages.TAB_DETAILS });
        setTabDetails(res);
        
    };
    const [lastVisitedUrl, setLastVisitedUrl] = useState([]);
    const getLastVisitedUrl = async () => {
        if (chrome.history) {
            const urlArray = [];
            chrome.history.search({ text: "", maxResults: 5 }, function (data) {
              data.forEach(function (page) {
                if (page.url.indexOf("https://www.linkedin.com") !== -1) {
                  urlArray.push(page.url.trim());
                }
              });
              setLastVisitedUrl(urlArray);
            });
          }
    }
    useEffect(() => 
    getLastVisitedUrl(),
    getTabDetails(), []);

    // if (!tabDetails.tab?.url.includes(messages.LINKEDIN_URL)) {
    //     return (
    //         <div>
    //             <PageNotFound />
    //         </div>
    //     )
    // }

    return (
        // <div className={classes.header}>
        //     <h2>LinkedIn Automation Window</h2>
        //     <Spin className={classes.popup} spinning={loading}>
        //         <Connection/>
        //     </Spin>
        // </div>

    <div className="App">
      <header className="App-header">
        {/* <ConnectionButton> */}
        <Tabs
          defaultActiveKey="1"
          style={{ background: "white", paddingLeft: "10px" }}
        >
          {/* <TabPane tab="Linkedin Url's" key="1" style={{ marginLeft: "10px" }}>
            <Card title="Last Visited Linkedin Url's">
              <List
                style={{
                  maxWidth: "600px",
                  overflow: "auto",
                  textAlign: "left",
                }}
                itemLayout="horizontal"
                dataSource={lastVisitedUrl}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Card>
          </TabPane> */}
          <TabPane tab="Connections" key="2">
            <Connections />
            {/* <ConnectionsHtmlParse /> */}
          </TabPane>
        </Tabs>
        {/* </ConnectionButton> */}
      </header>
    </div>
    );
}

export default Header;
