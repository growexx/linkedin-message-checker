import { Table, Button, message, Row, Modal, Empty, Segmented } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getFinalPromptData } from '../utils/common';
import textGeneratorChatGpt from '../openAI/chatGpt';
import Papa from 'papaparse';
import { messages, labels, numbers, csv_headers, columns_title, columns_name } from '../utils/enum';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const manageProfileDetails = async (profileDetails) => {
    const finalArr = [];
    for (let profile of profileDetails) {
        const obj = {
            name: profile.name,
            linkedInUrl: profile.linkedInUrl,
            about: profile.about,
            experience: profile.experience,
            skills: profile.skills.skills,
            post: profile.recentPost
        }
        finalArr.push(obj);
    }
    return finalArr;
};

/**
    * @desc This function is being used to show scrape data in table format
    * @author Growexx
    * @since 21/08/2023
    * @param {Object} req.prop request prop
*/
const TableView = (prop) => {
    const { data, loadingHandler } = prop;
    const [selectedData, setSelectedData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [enableChatGPT, setEnableChatGPT] = useState('withoutChatGPT');

    if (!data || data.length === numbers.ZERO) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
    // mapping data
    const dataSource = data.map((candidate, index) => {
        return {
            index,
            ...candidate
        };
    });

    // For information popup messages
    const info = (text) => {
        messageApi.info(text);
    };

    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedData(selectedRows);
        }
    };

    // Function for exporting data
    const exportData = () => {
        if (selectedData.length === 0) {
            info(messages.NO_DATA_SELECTED);
        } else {
            setIsModalOpen(true);
        }
    };

    const generateCSV = async (resultArr) => {
        const finaData = resultArr.finalArr;
        const isGptData = resultArr.isGptData;
        let csvHeaders = csv_headers.CSV_HEADER1;
        if (isGptData) {
            csvHeaders = csv_headers.CSV_HEADER2;
        }
        let csvData = [];
        finaData.forEach(item => {
            if (isGptData) {
                csvData.push(
                    [
                        item.name,
                        item.linkedInUrl,
                        item.about,
                        item.experience,
                        item.skills,
                        item.post,
                        item.prompt1_reply1,
                        item.prompt1_reply2,
                        item.prompt1_reply3,
                        item.prompt2_reply1,
                        item.prompt2_reply2,
                        item.prompt2_reply3,
                        item.prompt3_reply1,
                        item.prompt3_reply2,
                        item.prompt3_reply3
                    ]
                );
            } else {
                csvData.push(
                    [
                        item.name,
                        item.linkedInUrl,
                        item.about,
                        item.experience,
                        item.skills,
                        item.post
                    ]
                );
            }
        });
        const csvContent = Papa.unparse({
            fields: csvHeaders,
            data: csvData
        });
        const blob = new Blob([csvContent], { type: messages.TEXT_CSV });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = messages.OUTPUT_FILE_NAME;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleOk = async () => {
        try {
            loadingHandler(true)
            const dataArr = await manageProfileDetails(selectedData)
            const resultArr = await extractData(dataArr);
            await generateCSV(resultArr);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        } finally {
            loadingHandler(false);
        }
    };

    // For cancelling export
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: columns_title.NAME,
            dataIndex: columns_name.NAME,
            key: columns_name.NAME,
        },
        {
            title: columns_title.ABOUT,
            dataIndex: columns_name.ABOUT,
            render: (about) => <p>{about?.length > numbers.FIFTY ? about.slice(numbers.ZERO, numbers.FIFTY) + '...' : about}</p>
        },
        {
            title: columns_title.EXPERIENCE,
            dataIndex: columns_name.EXPERIENCE,
            render: (experience) => <p>{experience?.length > numbers.FIFTY ? experience.slice(numbers.ZERO, numbers.FIFTY) + '...' : experience}</p>
        },
        {
            title: columns_title.SKILLS,
            dataIndex: columns_name.SKILLS,
            render: (record) => <p>{record?.skills?.length > numbers.FIFTY ? record.skills.slice(numbers.ZERO, numbers.FIFTY) + '...' : record.skills}</p>

        },
        {
            title: columns_title.POST,
            dataIndex: columns_name.RECENT_POST,
            render: (recentPost) => <p>{recentPost?.length > numbers.FIFTY ? recentPost.slice(numbers.ZERO, numbers.FIFTY) + '...' : recentPost}</p>

        },
    ];

    const extractData = async (dataArr) => {
        const finalArr = [];
        let isGptData = false;
        if (enableChatGPT === messages.WITH_CHATGPT) {
            isGptData = true;
            for (let profile of dataArr) {
                const obj = {
                    name: profile.name,
                    linkedInUrl: profile.linkedInUrl,
                    about: profile.about,
                    experience: profile.experience,
                    skills: profile.skills,
                    post: profile.post
                }
                const promptArr = await getFinalPromptData(obj);
                let chatGptTextArr = [];
                for (let prompt of promptArr) {
                    await delay(numbers.SEVEN_THOUSAND);
                    const chatGptText = await textGeneratorChatGpt(prompt);
                    chatGptTextArr.push(chatGptText)
                };
                if (chatGptTextArr.length) {
                    let textPrompt1 = [];
                    let textPrompt2 = [];
                    let textPrompt3 = [];
                    textPrompt1 = chatGptTextArr[numbers.ZERO];
                    textPrompt2 = chatGptTextArr[numbers.ONE];
                    textPrompt3 = chatGptTextArr[numbers.TWO];

                    const prompt1_res_array = textPrompt1.split(messages.MESSAGE);
                    const prompt2_res_array = textPrompt2.split(messages.MESSAGE);
                    const prompt3_res_array = textPrompt3.split(messages.MESSAGE);

                    obj.prompt1_reply1 = (prompt1_res_array[1] || '').replace(/[0-9:]/g, '');
                    obj.prompt1_reply2 = (prompt1_res_array[2] || '').replace(/[0-9:]/g, '');
                    obj.prompt1_reply3 = (prompt1_res_array[3] || '').replace(/[0-9:]/g, '');
                    obj.prompt2_reply1 = (prompt2_res_array[1] || '').replace(/[0-9:]/g, '');
                    obj.prompt2_reply2 = (prompt2_res_array[2] || '').replace(/[0-9:]/g, '');
                    obj.prompt2_reply3 = (prompt2_res_array[3] || '').replace(/[0-9:]/g, '');
                    obj.prompt3_reply1 = (prompt3_res_array[1] || '').replace(/[0-9:]/g, '');
                    obj.prompt3_reply2 = (prompt3_res_array[2] || '').replace(/[0-9:]/g, '');
                    obj.prompt3_reply3 = (prompt3_res_array[3] || '').replace(/[0-9:]/g, '');
                };
                finalArr.push(obj);
            };

        } else {
            for (let profile of dataArr) {
                const obj = {
                    name: profile.name,
                    linkedInUrl: profile.linkedInUrl,
                    about: profile.about,
                    experience: profile.experience,
                    skills: profile.skills,
                    post: profile.post
                }
                finalArr.push(obj);
            }
        }
        return { finalArr, isGptData };
    }

    const handleSegmentChange = async (e) => {
        setEnableChatGPT(e);
    };

    return (
        <div>
            {contextHolder}
            <Row justify="end">
                <Button
                    icon={<DownloadOutlined />}
                    style={{ marginBottom: '10px' }}
                    onClick={exportData}
                >
                    Export
                </Button>
            </Row>
            <Table
                rowSelection={rowSelection}
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record.index}
                pagination={false}
            />
            <Modal
                title="Select the option which you require for export"
                open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
            >
                <Segmented
                    options={[
                        {
                            label: labels.WITH_CHATGPT,
                            value: messages.WITH_CHATGPT
                        },
                        {
                            label: labels.WITHOUT_CHATGPT,
                            value: messages.WITHOUT_CHATGPT
                        }]}
                    value={enableChatGPT}
                    onChange={handleSegmentChange}
                />
            </Modal>
        </div>
    );
};

export default TableView;
