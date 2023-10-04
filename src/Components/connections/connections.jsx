/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { LINKDIN_MSG_URL, messages } from '../../utils/constants';
import { CheckCircleOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { Button, message } from 'antd';
import './connection.css';
import { orderBy } from 'lodash';

function Connections () {
  const [tabDetails, setTabDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [msgConnection, setMsgConnection] = useState([]);
  const [countData, setCountData] = useState({});
  const [sortKey, setSortKey] = useState(null);
  const getTabDetails = async () => {
    const res = await chrome.runtime.sendMessage({
      message: messages.TAB_DETAILS
    });
    setTabDetails(res);
  };
  useEffect(() => {
    getTabDetails();
  }, []);

const openMessageBox = async (profile) => {
  return await chrome.tabs.sendMessage(tabDetails.tab.id, {
    message: messages.OPEN_PROFILE,
    url: profile
  });
};

  const extractMessageConnections = async () => {
    try {
      const profileNavigateResponse = await chrome.tabs.sendMessage(
        tabDetails.tab.id,
        {
          message: messages.OPEN_PROFILE,
          url: LINKDIN_MSG_URL
        }
      );
      if (profileNavigateResponse.status === 'OK') {
        await new Promise((resolve) => setTimeout(resolve, 7000));
        await chrome.tabs.sendMessage(tabDetails.tab.id, {
            message: messages.SETPROCESSFLAG
          }
        );
        // eslint-disable-next-line no-unused-vars
        const scrollResponse = await chrome.tabs.sendMessage(tabDetails.tab.id, {
          message: messages.SCROLLMSGCONNECTION
        });
        while (true) {
          let processStatus = await chrome.tabs.sendMessage(tabDetails.tab.id, {
            message: messages.CHECKPROCESSFLAG
          });
          if (processStatus.processStatus == 'true') {
            const extractMsgConnection = await chrome.tabs.sendMessage(
              tabDetails.tab.id,
              {
                message: messages.EXTRACTMSGCONNECTION
              }
            );
            if (extractMsgConnection) {
              setMsgConnection(extractMsgConnection.data.finalMsgConnections);
              setCountData(extractMsgConnection.countData);
              setLoading(false);
            }
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      setLoading(false);
      setMsgConnection([]);
      message.error(error.message);
    }
  };

  const extractFromPageRange = async () => {
    chrome.tabs.sendMessage(tabDetails.tab.id, {
      message: messages.REMOVE_EXISTING_DATA
    });
    setLoading(true);
    await extractMessageConnections();
  };

  const customSort = (rows, selector, direction) => {
    if (sortKey === 'date') {
      return rows.sort((rowA, rowB) => {
        const aDate = new Date(selector(rowA));
        const bDate = new Date(selector(rowB));
        let comparison = 0;
        if (aDate > bDate) {
          comparison = 1;
        } else if (aDate < bDate) {
          comparison = -1;
        }
        return direction === 'desc' ? comparison * -1 : comparison;
      });
    }
    return orderBy(rows, selector, direction);
  };

  const handleSortKey = (key) => {
    setSortKey(key.id);
  };

  const convertMsg = (value) => {
    return value.includes(':') ? value.split(':')[1] : value;
  };

  const msgConnectionTableColumns = [
    {
      name: 'Name',
      id: 'name',
      selector: (row) => row.name,
      width: '160px',
      sortable: true
    },
    {
      name: 'Last Message',
      id: 'lastMsg',
      selector: (row) => row.msg,
      format: (row) => <span>{convertMsg(row.msg)}</span>,
      width: '350px',
      sortable: true
    },
    {
      name: 'Read',
      id: 'read',
      selector: (row) => row.isRead,
      format: (row) => (
        <span>
          {row.isRead ? (
            <CheckCircleOutlined style={{ color: 'green' }} />
          ) : (
            '-'
          )}
        </span>
      ),
      width: '120px',
      sortable: true
    },
    {
      name: 'Date',
      id: 'date',
      selector: (row) => row.time,
      format: (row) => moment(row.time).format('MMM DD, YYYY'),
      width: '160px',
      sortable: true
    },
    {
      name: 'Action',
      selector: (row) => (
        <Button size="small" onClick={() => openMessageBox(row.msgLink)}>
          Message
        </Button>
      ),
      width: '120px'
    }
  ];

  if (msgConnection.length === 0 && !loading) {
    return (
      <div>
        <div>
          <Button onClick={extractFromPageRange}>Scrape Data</Button>
        </div>
      </div>
    );
  } else if (msgConnection.length > 0 && !loading) {
    return (
      <div id="root">
        <div className="container pt-5">
          <div className="row align-items-stretch box">
            <div className="c-dashboardInfo col-lg-3 col-md-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Scrapped Messages
                </h4>
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {countData?.totalMsgCount}
                </span>
              </div>
            </div>
            <div className="c-dashboardInfo col-lg-3 col-md-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Not Replied Messages
                </h4>
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {countData?.finalMsgCount}
                </span>
              </div>
            </div>
            <div className="c-dashboardInfo col-lg-3 col-md-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Unread Messages
                </h4>
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {countData?.falseCount}
                </span>
              </div>
            </div>
            <div className="c-dashboardInfo col-lg-3 col-md-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Read Messages
                </h4>
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {countData?.trueCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          columns={msgConnectionTableColumns}
          data={msgConnection}
          responsive
          pagination
          sortFunction={customSort}
          onSort={handleSortKey}
        />
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
}

export default Connections;
