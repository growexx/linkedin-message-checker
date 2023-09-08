const messages = {
    WITH_CHATGPT: 'withChatGPT',
    WITHOUT_CHATGPT: 'withoutChatGPT',
    OPEN_PROFILE: 'openProfile',
    SCRAPE_DETAILS: 'scrapeDetails',
    GET_FROM_LS: 'getFromLS',
    SCRAPE_SKILLS: 'scrapeSkills',
    SCRAPE_POST: 'scrapePost',
    CSV_NOT_CONTAIN_FIELD: 'Csv not contain ProfileUrls field.',
    MESSAGE: 'Message',
    NO_DATA_SELECTED: 'No data selected',
    OUTPUT_FILE_NAME: 'linkedUserData.csv',
    TEXT_CSV: 'text/csv',
    TAB_DETAILS: 'tabDetails',
    LINKEDIN_URL: 'linkedin.com',
    OK: 'OK',
    PROFILE_DETAILS: 'profileDetails',
    MY_CONNECTION: 'My Connection',
    MY_MESSEGING: 'My Messaging',
    CURRENTPAGEMAPPING: 'currentPageMapping',
    FETCHALLLIST: 'fetchAllList',
    MSG_SCRAPE_DETAILS: 'msgScrapeDetails',
    MAPDATA: 'mapData',
    NAVIGATE: 'navigate',
    EXTRACTFROMUSERPAGE: 'extractFromUserPage',
    SCROLL: 'scroll',
    EXTRACTPAGENUMBER: 'extractPageNumber',
    SCROLLMSGCONNECTION: 'scrollMsgConnection',
    LOADMOREMSGCONNECTION: 'loadMoreMsgConnection',
    EXTRACTMSGCONNECTION: 'extractMsgConnection'
};

const labels = {
    WITH_CHATGPT: 'With ChatGPT',
    WITHOUT_CHATGPT: 'Without ChatGPT',
    MY_CONNECTION: 'My Connection',
    MY_MESSEGING: 'My Messaging'
};

const backgroundMessages = {
    INSTALL: 'install',
    TABDETAILS: 'tabDetails'
};

const numbers = {
    ONE_THOUSAND: 1000,
    TWO_THOUSAND: 2000,
    FIVE_THOUSAND: 5000,
    SEVEN_THOUSAND: 7000,
    TEN_THOUSAND: 10000,
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FIVE: 5,
    FIFTY: 50
};

const csv_headers = {
    CSV_HEADER1: ["Name", "LinkedIn-Url", "About", "Experience", "Skills", "Posts"],
    CSV_HEADER2: ["Name", "LinkedIn-Url", "About", "Experience", "Skills", "Posts", 'prompt1_reply1', 'prompt1_reply2', 'prompt1_reply3',
        'prompt2_reply1', 'prompt2_reply2', 'prompt2_reply3', 'prompt3_reply1', 'prompt3_reply2', 'prompt3_reply3']
}

const columns_title = {
    NAME: 'Name',
    ABOUT: 'About',
    EXPERIENCE: 'Experience',
    SKILLS: 'Skills',
    POST: 'Post',

};

const columns_name = {
    NAME: 'name',
    ABOUT: 'about',
    EXPERIENCE: 'experience',
    SKILLS: 'skills',
    RECENT_POST: 'recentPost',
    ACTIVITY: 'activity',
    POST: 'post',
};

const date_config = {
    PAST_DAYS: 30
}

const message_config = {
    TOTAL_CONNECTIONS: 15
}

export { messages, backgroundMessages, labels, numbers, csv_headers, columns_title, columns_name, date_config, message_config};
