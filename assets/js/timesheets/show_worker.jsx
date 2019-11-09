import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { get_worker_with_timesheets } from '../ajax';

function state2props(state) {
  return state.session;
}

function TimesheetsWorker(props) {

  return (
    <div><p>Hello</p></div>
  );
}

export default TimesheetsWorker;
//export default connect(state2props)(TimesheetsWorker);
//  if (email != worker.email) {
//    get_worker_with_timesheets(email);
//  }
//  let timesheets = worker.timesheets;
//  let listItems = timesheets.map((timesheet) => <tr><td>{timesheet.date}</td><td>{timesheet.status}</td><td>view delete</td></tr>);
//<tr><td>01/01/2020</td><td>status</td><td>view delete</td></tr>
//
