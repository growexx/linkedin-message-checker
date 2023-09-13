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
  CSV_HEADER1: [
    'Name',
    'LinkedIn-Url',
    'About',
    'Experience',
    'Skills',
    'Posts'
  ],
  CSV_HEADER2: [
    'Name',
    'LinkedIn-Url',
    'About',
    'Experience',
    'Skills',
    'Posts',
    'prompt1_reply1',
    'prompt1_reply2',
    'prompt1_reply3',
    'prompt2_reply1',
    'prompt2_reply2',
    'prompt2_reply3',
    'prompt3_reply1',
    'prompt3_reply2',
    'prompt3_reply3'
  ]
};

const columns_title = {
  NAME: 'Name',
  ABOUT: 'About',
  EXPERIENCE: 'Experience',
  SKILLS: 'Skills',
  POST: 'Post'
};



export {
  backgroundMessages,
  labels,
  numbers,
  csv_headers,
  columns_title,
};
