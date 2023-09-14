/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { LINKDIN_MSG_URL, messages } from '../../utils/constants';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import moment from 'moment';

function Connections () {
  const [tabDetails, setTabDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [UserList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgConnection, setMsgConnection] = useState([]);
  const getTabDetails = async () => {
    const res = await chrome.runtime.sendMessage({
      message: messages.TAB_DETAILS
    });
    setTabDetails(res);
  };
  useEffect(() => {
    getTabDetails();
  }, []);
  // const defaultImageSrc = 'img/default-user-image.png';

  // const openMessageBox = async (profile) => {
  //   return await chrome.tabs.sendMessage(tabDetails.tab.id, {
  //     message: messages.OPEN_PROFILE,
  //     profile: profile
  //   });
  // };

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
      // eslint-disable-next-line no-unused-vars
      const scrollResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, {
        message: messages.SCROLLMSGCONNECTION
      });
      await new Promise((resolve) => setTimeout(resolve, 30000));
      const extractMsgConnection = await chrome.tabs.sendMessage(
        tabDetails.tab.id,
        {
          message: messages.EXTRACTMSGCONNECTION
        }
      );
      if (extractMsgConnection) {
        setMsgConnection(extractMsgConnection.data.finalMsgConnections);
        setLoading(false);
      }
    }
  };

  const extractFromPageRange = async () => {
    setLoading(true);
    await extractMessageConnections();
  };

  const convertMsg = (value) => {
    return value.includes(':') ? value.split(':')[1] : value;
  };

  const msgConnectionTableColumns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '160px'
    },
    {
      name: 'Last Message',
      selector: (row) => <span>{convertMsg(row.msg)}</span>,
      width: '350px'
    },
    {
      name: 'Is Read',
      selector: (row) => (
        <span>
          {row.isRead ? (
            <CheckCircleOutlined style={{ color: 'green' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red' }} />
          )}
        </span>
      ),
      width: '120px'
    },
    {
      name: 'Time',
      selector: (row) => moment(row.time).format('MMM DD, YYYY'),
      width: '120px'
    }
    // {
    //   name: 'Action',
    //   selector: (row) => (
    //     <button onClick={() => openMessageBox(row.profile_index)}>
    //       Message
    //     </button>
    //   ),
    //   width: '120px'
    // }
  ];

  if (msgConnection.length === 0 && !loading) {
    return (
      <div>
        <div>
          <button onClick={extractFromPageRange}>Scrape Data</button>
        </div>
      </div>
    );
  } else if (msgConnection.length > 0 && !loading) {
    return (
      <div>
        <DataTable
          columns={msgConnectionTableColumns}
          data={msgConnection}
          responsive
          pagination
        />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
}

export default Connections;
