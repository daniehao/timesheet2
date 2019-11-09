import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     login: {...},
 *   },
 *   worker: {
 *     id: 1,
 *     name: "alice",
 *     email: "alice@acme.com",
 *     timesheets: [...]
 *   }
 *   
 * }
 */


function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}


function timesheet_new(st0 = {date: "", tasks: [], status: "Waiting", worker_id: null, errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_TIMESHEET':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    login,
    timesheet_new,
  });
  return reducer(st0, action);
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function worker(st0 = {name: "", email: "", timesheets: []}, action) {
  switch(action.type) {
    case 'UPDATE_WORKER':
      return action.data;
    default:
      return st0;
  }
}

function manager(st0 = {name: "", email: "", workers: []}, action) {
  switch(action.type) {
    case 'UPDATE_MANAGER':
      return action.data;
    default:
      return st0;
  }
}

function jobs(st0 = new Array(), action) {
  switch (action.type) {
    case 'UPDATE_JOBS':
      return action.data;
    default:
      return st0;
  }
}

function timesheet(st0 = {id: null, worker_name:"", date:"", tasks:[], status:""}, action) {
  switch (action.type) {
    case 'UPDATE_TIMESHEET':
      return action.data;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    session,
    worker,
    jobs,
    timesheet,
    manager,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
