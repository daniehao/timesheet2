import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { get_worker_with_timesheets, delete_timesheet } from './ajax';

function state2props(state) {
  return {session: state.session, worker: state.worker};
}

class Worker extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  toNewTimesheet(ev){
    this.setState({redirect: "/timesheets/new"})
  }
  
  handleDelete(ev) {
    let id = ev.target.parentElement.parentElement.id;
    delete_timesheet(id);
  }

  handleView(ev) {
    let id = ev.target.parentElement.parentElement.id;
    this.redirect("/timesheet/"+id.toString());
  }

  render() { 
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let {session, worker} = this.props;
    let user_name = session.user_name;
    let email = session.email;
 //   if (worker.email == '' || worker.email != email){
 //     console.log("getting worker");
      get_worker_with_timesheets(email);
  //  }
    let timesheets = worker.timesheets;
    let listItems = timesheets.map((timesheet) => <tr><td>{timesheet.date}</td>
	  <td>{timesheet.status}</td>
	  <td id={timesheet.id}>
	  <div className="row"><button type="button" className="btn btn-link" onClick={this.handleView.bind(this)}>view</button>
	  <button type="button" className="btn btn-link" onClick={this.handleDelete.bind(this)}>delete</button></div></td></tr>);

    return (
      <div>
        <h1>Your Timesheets</h1>
	<h1>Worker: {user_name}</h1>
	<table className="table">
	  <thead>
	    <tr>
	      <th>Date</th>
	      <th>Status</th>
	      <th></th>
	    </tr>
	  </thead>
          <tbody>
            {listItems}     
          </tbody>
        </table>
	<button type="button" className="btn btn-primary" onClick = {this.toNewTimesheet.bind(this)}>New Timesheet</button>
      </div>
    );
  }
}
export default connect(state2props)(Worker);

