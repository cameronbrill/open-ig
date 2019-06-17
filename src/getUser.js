import axios from 'axios';

const usernameURL = (e) => `https://www.instagram.com/${e}/?__a=1`;

export const getUser = (username, end_cursor) => {
  let endpoint = usernameURL(username);
  if(end_cursor) {
    endpoint += `&max_id=${end_cursor}`;
  }
  return axios.get(endpoint);
};

export const getMoreUser = (userID, end_cursor) => {
  const queryID = 17888483320059182;
  let endpoint = `https://www.instagram.com/graphql/query/?query_id=${queryID}&id=${userID}&first=12&after=${end_cursor}`;

  return axios.get(endpoint);
};