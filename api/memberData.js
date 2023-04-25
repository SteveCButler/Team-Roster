import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const dbUrl = clientCredentials.databaseURL;
// GET ALL MEMBERS
const getMembers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// Create Member
const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${dbUrl}/members/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

// UPDATE Memeber
const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// DELETE MEMBER
const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getMembers,
  createMember,
  getSingleMember,
  updateMember,
  deleteMember,
};
