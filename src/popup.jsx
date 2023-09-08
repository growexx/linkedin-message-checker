import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import classes from './popup.module.css';
import { Spin } from 'antd';
import Header from './Components/header/header';

const Popup = () => {
    const [loading, setLoading] = useState(false);
    return (
        <Spin className={classes.popup} spinning={loading}>
            <Header/>
        </Spin>
    );
};

const root = createRoot(document.getElementById('popup-root'));
root.render(<Popup />);
