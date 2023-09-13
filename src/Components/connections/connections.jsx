/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { LINKDIN_MSG_URL, messages } from '../../utils/constants';

function Connections () {
  const [tabDetails, setTabDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [UserList, setUserList] = useState([]);
  const getTabDetails = async () => {
    const res = await chrome.runtime.sendMessage({
      message: messages.TAB_DETAILS
    });
    setTabDetails(res);
  };
  useEffect(() => {
    getTabDetails();
  }, []);
  const defaultImageSrc = 'img/default-user-image.png';

  const openMessageBox = async (profile) => {
    return await chrome.tabs.sendMessage(tabDetails.tab.id, {
      message: messages.OPEN_PROFILE,
      profile: profile
    });
  };

  const extractMessageConnections = async () => {
    const profileNavigateResponse = await chrome.tabs.sendMessage(
      tabDetails.tab.id,
      {
        message: messages.OPEN_PROFILE,
        url: LINKDIN_MSG_URL
      }
    );
    if (profileNavigateResponse.status === 'OK') {
      await new Promise((resolve) => setTimeout(resolve, 7000));
      const scrollResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, {
        message: messages.SCROLLMSGCONNECTION
      });
      if (scrollResponse?.status === 'OK' && scrollResponse !== undefined) {
        return await chrome.tabs.sendMessage(tabDetails.tab.id, {
          message: messages.EXTRACTMSGCONNECTION
        });
      }
    }
  };

  const extractFromPageRange = async () => {
    await extractMessageConnections();
  };

  if (UserList.length === 0) {
    return (
      <div>
        <div>
          <button onClick={extractFromPageRange}>Scrape Data</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="user-list">
          {UserList.map((user, index) => (
            <div className="user" style={{ display: 'flex' }} key={index}>
              <div className="left">
                {user.img ? (
                  <img
                    src={user.img}
                    alt={user.name}
                    style={{ width: '50px' }}
                  />
                ) : (
                  <img
                    src={defaultImageSrc}
                    alt="Default"
                    style={{
                      width: '50px'
                    }}
                  />
                )}
              </div>
              <div className="right">
                <label>{user.name}</label>
                <button
                  style={{
                    background: 'lightskyblue',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => openMessageBox(user.profile_index)}
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Connections;
