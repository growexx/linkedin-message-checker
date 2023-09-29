/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* global chrome*/
import {
  dateConfig,
  declinedTextArr,
  endNumber,
  messageConfig,
  messages,
  numbers,
  searchStringForNotification
} from '../utils/constants';

let mapContent = {};
let scrollHeight;

// Page loading event for getting window's scrollHeight
document.addEventListener('DOMContentLoaded', () => {
  scrollHeight = document.body.scrollHeight;
});
const scrapeSkillFunction = async () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: numbers.ZERO,
    behavior: 'smooth'
  });
  const outerDiv = document.querySelectorAll(
    '.display-flex.flex-column.full-width.align-self-center'
  );
  const skillFinalArr = [];
  let topSkills = '';
  for (const singleOuterDiv of outerDiv) {
    const skillDivs = singleOuterDiv.querySelector(
      '.display-flex.align-items-center.mr1.hoverable-link-text.t-bold'
    );
    const skillName = skillDivs
      .querySelector('span.visually-hidden')
      .textContent.trim();
    let numOfEndorsement = numbers.ZERO;
    const isEndorse = singleOuterDiv.querySelector(
      '.hoverable-link-text.display-flex.align-items-center.t-14.t-normal.t-black'
    );
    if (isEndorse) {
      const endorseText = isEndorse.textContent.trim();
      const match = endorseText.match(/\d+/); // Regular expression to match one or more digits
      if (match) {
        const number = match[numbers.ZERO];
        numOfEndorsement = number;
      }
    }
    const obj = {
      skillName,
      numOfEndorsement
    };
    skillFinalArr.push(obj);
  }
  skillFinalArr.sort((a, b) => b.numOfEndorsement - a.numOfEndorsement);
  let skillNamesArray = skillFinalArr.map((skill) => skill.skillName);
  skillNamesArray = [...new Set(skillNamesArray)];
  const firstFiveSkills = skillNamesArray.slice(numbers.ZERO, numbers.FIVE);
  topSkills = firstFiveSkills.join(' | ');
  return topSkills;
};

const scrapePostFunction = async () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
  const recentPost = [];
  const postSections = document.querySelector('.artdeco-card.ember-view.pb3');
  const postList = postSections.querySelectorAll(
    '.profile-creator-shared-feed-update__container'
  );
  for (const list of postList) {
    const repostHtml = list.querySelector(
      '.update-components-header__text-wrapper'
    );
    if (repostHtml) {
      const repostData = repostHtml.querySelector(
        '.update-components-text-view.white-space-pre-wrap.break-words'
      );
      const repostDataText = repostData
        .querySelector('.update-components-text-view__mention')
        .nextSibling.textContent.trim();
      if (repostDataText && repostDataText.includes('reposted')) {
        break;
      }
    }
    const btnClass =
      '.feed-shared-inline-show-more-text__see-more-less-toggle.see-more.t-14.t-black--light.t-normal.hoverable-link-text';
    const isShowMoreButton = list.querySelector(btnClass);
    if (isShowMoreButton) {
      const commentaryDiv = list.querySelector(
        '.feed-shared-update-v2__commentary'
      );
      if (commentaryDiv) {
        const extractedTextArray = [];
        // Function to recursively extract text from nodes
        // eslint-disable-next-line no-inner-declarations
        function extractTextFromNode (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            extractedTextArray.push(node.textContent.trim());
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const childNode of node.childNodes) {
              extractTextFromNode(childNode);
            }
          }
        }
        extractTextFromNode(commentaryDiv);
        const extractedText = extractedTextArray.join(' ');
        recentPost.push(extractedText);
      }
    }
  }
  const concatenatedString = recentPost.join(' | ');

  return concatenatedString;
};

// Checks if the given element is a list
const isListElement = (listElement) => {
  if (
    listElement.tagName === 'UL' ||
    listElement.tagName === 'OL' ||
    listElement.tagName === 'MENU' ||
    listElement.tagName === 'DL'
  ) {
    return true;
  } else if (
    (listElement.tagName === 'DIV' ||
      listElement.tagName === 'ARTICLE' ||
      listElement.tagName === 'SECTION') &&
    checkListAttributes(listElement)
  ) {
    return true;
  }
  return false;
};

// second condition for list check
const checkListAttributes = (listElement) => {
  const listAttributes = ['list', 'list-type', 'data-list', 'data-list-type'];

  for (const attribute of listElement.attributes) {
    if (
      listAttributes.includes(attribute.name) ||
      attribute.value.includes('list')
    ) {
      return true;
    }
  }

  return false;
};

// Function to find all possible list components/elements in the web page
const getListElements = () => {
  // get all elements from the body
  const allElements = document.querySelectorAll('*');

  allElements.forEach((element, index) => {
    if (isListElement(element)) {
      const input = document.createElement('button');
      input.name = 'list';
      input.setAttribute('list-selected', false);
      input.style.border = '1px solid #000';
      input.style.display = 'block';
      input.style.padding = '0px';
      input.style.width = '0px';
      input.style.height = '0px';
      input.style.width = '20px';
      input.style.height = '20px';
      input.style.borderRadius = '20px';
      input.style.zIndex = '999';
      input.style.background = 'transparent';
      element.style.background = '#F2EE9D';
      input.style.position = 'absolute';
      element.prepend(input);
      input.onclick = (e) => {
        e.target.style.backgroundColor = '#7895CB';
        localStorage.setItem(
          'selectedList',
          JSON.stringify({
            classList: Array.from(element.classList),
            attributes: element.attributes
          })
        );
      };
      element.setAttribute('list-id', index);
    }
  });
};

const msgScrapeFunction = async (url, csvData) => {
  // get message connections
  const msgDivs = document.querySelectorAll(
    'div.msg-conversation-card__row.align-items-center.display-flex'
  );
  const msgConnections = {};
  msgDivs.forEach((element, index) => {
    let date = document
      .querySelectorAll('time.msg-overlay-list-bubble-item__time-stamp')
      [index].textContent.trim();
    if (isNaN(Date.parse(date))) {
      date = new Date();
    }
    if (!/\d{4}/.test(date)) {
      const currentYear = new Date().getFullYear();
      date = date + ' ' + currentYear;
    }
    msgConnections[index] = {
      name: document
        .querySelectorAll(
          'h3.msg-conversation-listitem__participant-names.msg-conversation-card__participant-names'
        )
        [index].textContent.trim(),
      time: date,
      img: document.querySelectorAll(
        'div.msg-selectable-entity.msg-selectable-entity--3 img'
      )[index].src,
      profile_index: index
    };
  });
  localStorage.setItem('msgConnections', JSON.stringify({ msgConnections }));
  return filterMessageConnections(csvData);
};

const filterMessageConnections = async (csvData) => {
  let msgConnections = JSON.parse(
    localStorage.getItem('msgConnections')
  ).msgConnections;
  msgConnections = Object.values(msgConnections);
  const currentDate = new Date();
  const pastDay = new Date(currentDate);
  pastDay.setDate(currentDate.getDate() - dateConfig.PAST_DAYS);
  const totalFilteredArray = msgConnections.filter((element) => {
    const date = new Date(element.time);
    return date < pastDay; // Filtering past days
  });
  const matchConnection = totalFilteredArray.filter((obj1) =>
    csvData.some((obj2) => obj1.name === obj2.name)
  );
  let filteredArray = totalFilteredArray.slice(
    0,
    messageConfig.TOTAL_CONNECTIONS
  );
  if (matchConnection.length > 0) {
    if (matchConnection.length < messageConfig.TOTAL_CONNECTIONS) {
      matchConnection.concat(totalFilteredArray);
      const mergedArray = matchConnection.concat(
        totalFilteredArray.filter((item) => !matchConnection.includes(item))
      );
      filteredArray = mergedArray.slice(0, messageConfig.TOTAL_CONNECTIONS);
    }

    if (matchConnection.length >= messageConfig.TOTAL_CONNECTIONS) {
      filteredArray = matchConnection.slice(0, messageConfig.TOTAL_CONNECTIONS);
    }
  }

  localStorage.setItem(
    'TotalfilterConnection',
    JSON.stringify({ totalFilteredArray })
  );
  localStorage.setItem('matchConnection', JSON.stringify({ matchConnection }));
  localStorage.setItem('filterConnection', JSON.stringify({ filteredArray }));
  return filteredArray;
};

const navigateToProfile = (profile) => {
  window.location = profile;
  // scrollToBottom();
};

// For manual delays
function delay (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Function for highlight and markups for datapoints
const highLightListElements = (listElement, listId) => {
  for (const element of listElement) {
    if (element.nodeType !== Node.TEXT_NODE && element.children.length > 0) {
      if (element.tagName === 'A') {
        element.style.textDecoration = 'underline';
        element.style.textDecorationStyle = 'double';
        const infoTag = document.createElement('button');
        const text = document.createTextNode('i');
        infoTag.appendChild(text);
        infoTag.style.padding = '10px';
        infoTag.style.color = 'blue';
        infoTag.style.height = '20px';
        infoTag.style.width = '20px';
        infoTag.style.display = 'flex';
        infoTag.style.justifyContent = 'center';
        infoTag.style.alignItems = 'center';
        infoTag.style.border = '1px solid #000';
        infoTag.style.borderRadius = '20px';
        infoTag.style.margin = '1px';
        infoTag.className = 'info-url';
        infoTag.setAttribute('data-url', element.href);
        element.prepend(infoTag);
      } else if (element.tagName === 'P') {
        element.style.border = '1px solid red';
      } else if (element.tagName === 'DIV' && element.textContent) {
        element.style.textDecoration = 'underline';
      } else if (element.tagName === 'IMG') {
        element.style.border = '1px solid #444';
      }
      Array.from(element.children).forEach((el, i) => {
        const datapoint = `${element.getAttribute('data-point')},${i}`;
        el.setAttribute('data-point', datapoint);
      });
      highLightListElements(element.children, listId);
    } else if (
      element.textContent.trim() !== '' &&
      element.parentElement.tagName !== 'BUTTON'
    ) {
      if (element.tagName !== 'BUTTON') {
        element.style.background = 'yellow';
        element.style.color = 'red';
      }
    }

    element.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.style.color = 'black';
      mapContent = {
        dataPoint: e.target.getAttribute('data-point'),
        content: e.target.textContent.trim()
      };
      chrome.runtime.sendMessage({ message: 'mapped', mapContent });
      return false;
    };
  }
};

// Function for highlighting and mapping the light elements
const inspectList = () => {
  const listElement = document.querySelector(
    `.${JSON.parse(localStorage.getItem('selectedList')).classList.join('.')}`
  );
  Array.from(listElement.children).forEach((el, i) => {
    el.setAttribute('data-point', i);
  });
  const listItems = findMajorityTagNames(listElement.children);
  if (listItems) {
    highLightListElements(
      listItems,
      Number(listElement.getAttribute('list-id'))
    );
  } else {
    highLightListElements(
      listElement.children,
      Number(listElement.getAttribute('list-id'))
    );
  }
  detectPagination();
};

// Function to detect pagination on the webpage
function detectPagination () {
  const allElements = document.querySelectorAll('*');
  const paginationLinks = [];
  const paginationContainers = [];

  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    if (isPaginationLink(element)) {
      paginationLinks.push(element);
    } else if (isPaginationContainer(element)) {
      paginationContainers.push(element);
    }
  }

  const pageBtnDetails = [];
  paginationLinks.forEach((link) => {
    link.style.textDecoration = 'underline';
    link.style.textDecorationStyle = 'double';
    link.style.backgroundColor = '#F2EE9D';
    const attributeObject = {};
    for (let i = 0; i < link.attributes.length; i++) {
      const { name, value } = link.attributes[i];
      attributeObject[name] = value;
    }
    pageBtnDetails.push({
      parentElement: link.parentElement.className,
      textContent: link.textContent,
      tagName: link.tagName,
      attributes: attributeObject
    });
  });
  localStorage.setItem('pageBtnDetails', JSON.stringify(pageBtnDetails));
}

// Function to retrieve pagination link/buttonss
function isPaginationLink (element) {
  // Check for <a>, <button>, or <input> elements with appropriate attributes
  if (
    ((element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT') &&
      (element.getAttribute('rel') === 'next' ||
        element.getAttribute('rel') === 'prev' ||
        element.getAttribute('data-page') ||
        element.getAttribute('href')?.includes('page=') ||
        element.getAttribute('data-page-number') ||
        element.textContent.toLowerCase().includes('next') ||
        element.textContent.toLowerCase().includes('prev'))) ||
    /^\d+$/.test(element.textContent.trim())
  ) {
    return true;
  }
  return false;
}

// Function to check if an element looks like a pagination container
function isPaginationContainer (element) {
  // Check for <ul>, <ol>, <div>, <nav>, etc., with appropriate classes or attributes
  if (
    (element.tagName === 'UL' ||
      element.tagName === 'OL' ||
      element.tagName === 'DIV' ||
      element.tagName === 'NAV') &&
    (element.classList.contains('pagination') ||
      element.classList.contains('pager') ||
      element.classList.contains('pages') ||
      element.getAttribute('data-pagination') ||
      element.getAttribute('data-pager'))
  ) {
    return true;
  }
  return false;
}

const findMajorityTagNames = (elements) => {
  const tagNames = Array.from(elements, (element) => element.tagName);
  const tagCounts = tagNames.reduce((acc, tagName) => {
    acc[tagName] = (acc[tagName] || 0) + 1;
    return acc;
  }, {});

  let majorityTagName = null;
  let maxCount = 0;
  for (const tagName in tagCounts) {
    if (tagCounts[tagName] > maxCount) {
      majorityTagName = tagName;
      maxCount = tagCounts[tagName];
    }
  }
  const listItems = [];
  for (const element of elements) {
    if (element.tagName === majorityTagName) {
      listItems.push(element);
    }
  }
  return listItems;
};

// Function for extracting user selected data points from list
const currentPageMapping = async () => {
  await delay(1000);
  const list = document.querySelectorAll('.entity-result__title-text a > span');
  const data = [];
  // const fieldValueElements = element.querySelectorAll('span.entity-result__title-text.t-16');
  for (const fieldValueElement of list) {
    const name = fieldValueElement.querySelector('span').textContent.trim();
    data.push(name);
    // return data;
  }
  localStorage.setItem('extractedData', JSON.stringify(data));
  return data;
};

// Function for page navigation using webpage
const navigateToPage = async (request) => {
  const pageBtns = JSON.parse(localStorage.getItem('pageBtnDetails'));
  pageBtns.forEach(({ textContent, parentElement }) => {
    if (textContent.trim() == request.pageNumber) {
      triggerClickOnPageBtn(parentElement, request.pageNumber);
    }
  });
};

// Function for pagination button click
const triggerClickOnPageBtn = (parentElement, pageNumber) => {
  Array.from(document.getElementsByClassName(parentElement)).forEach(
    (element) => {
      for (const child of element.children) {
        if (child.textContent.trim() == pageNumber) {
          child.click();
        }
      }
    }
  );
};

// Function for scolling the full page
const scrollToBottom = async () => {
  window.scrollTo({ top: scrollHeight, left: 0, behavior: 'smooth' });
};

// extract total pages
const extractPageNumber = async () => {
  //  scrollToBottom();
  //  await delay(1000);
  const pageFrom = 1;
  const pageTo = document.querySelectorAll(
    '.artdeco-pagination__indicator'
  ).length;
  return [pageFrom, pageTo];
};

const isClassVisible = () => {
  const element = document.getElementsByClassName(
    'block mlA mrA artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view'
  );
  if (element.length > 0) {
    const rect = element[0].getBoundingClientRect();
    // Check if the element is within the viewport
    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      return true; // The element with the specified class is currently visible
    }
  }
  return false; // The element with the specified class is not visible
};

const scrollMsgConnection = async () => {
  const element = document.getElementsByClassName(
    'msg-conversations-container__conversations-list'
  )[0];
  let index = 0;
  let count = 0;
  let filteredMsg = {};
  if (element) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const name = element.getElementsByClassName('msg-conversation-listitem__participant-names msg-conversation-card__participant-names')[index].innerText;
      let date = element.getElementsByClassName('msg-conversation-listitem__time-stamp')[index].innerText;
      const msgNode = element.getElementsByClassName('msg-conversation-card__row msg-conversation-card__body-row')[index].innerText;
      const isRead = !msgNode.includes(searchStringForNotification);
      const msgLink = element.getElementsByClassName('msg-conversation-listitem__link msg-conversations-container__convo-item-link')[index].getAttribute('href');
      const output = declinedTextArr.some((word) => msgNode.toLowerCase().includes(word.toLowerCase()));
      if (isNaN(Date.parse(date))) {
        date = new Date();
      }
      if (!/\d{4}/.test(date)) {
        const currentYear = new Date().getFullYear();
        date = date + ' ' + currentYear;
      }
      if (output === false) {
        count = count + 1;
        filteredMsg[count] = {
          name: name,
          time: date,
          msg: msgNode,
          isRead: isRead,
          msgLink: msgLink
        };
      }
      const isSpecificClassVisible = isClassVisible();
      const isScrollAtEnd =
        element.scrollTop >= element.scrollHeight - element.clientHeight;
      if (!isSpecificClassVisible && !isScrollAtEnd && count <= endNumber) {
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
      } else if (
        ((isSpecificClassVisible && isScrollAtEnd) ||
        (isSpecificClassVisible && !isScrollAtEnd)) && count <= endNumber) {
          const element = document.getElementsByClassName(
            'block mlA mrA artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view'
          )[0];
          element.click();
      } else if (count > endNumber) {
        extractMsgConnection(filteredMsg);
        return true;
      }
      index++;
      await delay(180);
    }
  } else {
    console.error('Element is not loaded successfully!');
  }
};

const loadNextMsgConnection = async () => {
  const element = document.getElementsByClassName(
    'block mlA mrA artdeco-button artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view'
  )[0];
  element.click();
  await delay(1000);
  return scrollMsgConnection();
};

const filterMessages = (arr) => {
  const resultArr = Object.values(arr).filter((message) => {
    const msgText = message.msg.toLowerCase();
    const isExcluded = declinedTextArr.some((word) =>
      msgText.includes(word.toLowerCase())
    );
    return !isExcluded;
  });
  return resultArr;
};

const extractMsgConnection = async (filteredMsg) => {
  const list = document.querySelectorAll(
    'div.msg-conversation-card__row.msg-conversation-card__title-row'
  );
  const msgConnections = {};

  list.forEach((element, index) => {
    let date = element
      .querySelector('time.msg-conversation-listitem__time-stamp')
      .textContent.trim();
    const name = element
      .querySelector(
        'h3.msg-conversation-listitem__participant-names.msg-conversation-card__participant-names'
      )
      .textContent.trim();
    const msg = element.nextElementSibling.innerText;
    const msgLink = document.querySelectorAll('.msg-conversation-card > a')[
      index
    ].href;
    const img = document
      .querySelectorAll('div.msg-selectable-entity--4')
      [index].querySelector('div > img')
      ? document
          .querySelectorAll('div.msg-selectable-entity--4')
          [index].querySelector('div > img').currentSrc
      : '';
    if (isNaN(Date.parse(date))) {
      date = new Date();
    }
    if (!/\d{4}/.test(date)) {
      const currentYear = new Date().getFullYear();
      date = date + ' ' + currentYear;
    }
    const isRead = !element.nextElementSibling.innerText.includes(
      searchStringForNotification
    );
    msgConnections[index] = {
      name: name,
      time: date,
      img: img,
      profile_index: index,
      msg: msg,
      isRead: isRead,
      msgLink: msgLink
    };
  });

  const messagesArray = Object.values(filteredMsg);
  const finalRecord = messagesArray.slice(0, endNumber);
  const totalMsgCount = Object.entries(msgConnections).length;
  const finalMsgConnections = filterMessages(finalRecord);
  const finalMsgCount = Object.entries(finalMsgConnections).length;
  let trueCount = 0;
  let falseCount = 0;
  finalMsgConnections.forEach((message) => {
    if (message.isRead) {
      trueCount++;
    } else {
      falseCount++;
    }
  });
  localStorage.setItem(
    'msgConnections',
    JSON.stringify({ finalMsgConnections })
  );
  localStorage.setItem(
    'counts',
    JSON.stringify({
      totalMsgCount,
      finalMsgCount,
      trueCount,
      falseCount
    })
  );
};

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.message) {
    case messages.OPEN_PROFILE: {
      navigateToProfile(request.url);
      sendResponse({ status: messages.OK });
      return true;
    }
    case messages.SCRAPE_DETAILS: {
      const data = await msgScrapeFunction(request.url, request.csvData);
      sendResponse(data);
      break;
    }
    case messages.GET_FROM_LS: {
      const data = JSON.parse(localStorage.getItem(messages.PROFILE_DETAILS));
      sendResponse(data);
      break;
    }
    case messages.SCRAPE_SKILLS: {
      const skillDetails = await scrapeSkillFunction();
      sendResponse(skillDetails);
      break;
    }
    case messages.SCRAPE_POST: {
      const recentPost = await scrapePostFunction();
      sendResponse(recentPost);
      break;
    }
    case messages.CURRENTPAGEMAPPING: {
      await currentPageMapping(request);
      break;
    }
    case messages.FETCHALLLIST: {
      getListElements();
      break;
    }
    case messages.NAVIGATE: {
      await delay(1000);
      navigateToPage(request);
      break;
    }
    case messages.SCROLL: {
      scrollToBottom();
      sendResponse({ status: 'OK' });
      return true;
    }
    case messages.MAPDATA: {
      await delay(1000);
      inspectList();
      break;
    }
    case messages.EXTRACTFROMUSERPAGE: {
      await currentPageMapping(request);
      break;
    }
    case messages.FETCHFROMLS: {
      const data = JSON.parse(localStorage.getItem('extractedData'));
      sendResponse({ pageNumber: request.pageNumber, data });
      break;
    }
    case messages.EXTRACTPAGENUMBER: {
      const pageData = await extractPageNumber(request);
      sendResponse({ pageData: pageData });
      break;
    }
    case messages.SCROLLMSGCONNECTION: {
      await scrollMsgConnection();
      break;
    }
    case messages.EXTRACTMSGCONNECTION: {
      const data = JSON.parse(localStorage.getItem('msgConnections'));
      const countData = JSON.parse(localStorage.getItem('counts'));
      sendResponse({ data: data, countData: countData });
      break;
    }
    case messages.LOADMOREMSGCONNECTION: {
      loadNextMsgConnection(request);
      sendResponse({ status: 'OK' });
      return true;
    }
    case messages.REMOVE_EXISTING_DATA: {
      localStorage.removeItem('msgConnections');
      localStorage.removeItem('counts');
      sendResponse({ status: messages.OK });
      break;
  }
    default:
      break;
  }
  return true;
});
