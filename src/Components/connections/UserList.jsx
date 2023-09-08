// import { Table, Button, message, Row, Modal, Empty, Segmented } from 'antd';
// import React from 'react';
// import { useState } from 'react';
// import { messages, labels, numbers, csv_headers, columns_title, columns_name } from '../utils/enum';

const UserList = (prop) => {
    const { data } = prop;
    return (
        <div class="user-list">
        {
        data.map(user => (
            <div class="user">
            <h2>{user.name}</h2>
            <button>Message Me</button>
            </div>
        ))
        }
    </div>
    );
};

export default UserList;
