import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { get_manager_with_workers } from './ajax';

function state2props(state) {
  return {session: state.session, manager: state.manager};
}

class Manager extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  handleView(ev) {
    let id = ev.target.parentElement.id;
    this.redirect("/timesheet/"+id.toString());
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let {session, manager} = this.props;
    let user_name = session.user_name;
    let email = session.email;
//    if (manager.email == '' || manager.email != email){
//      console.log("getting manager");
    get_manager_with_workers(email);
//    }
    let workers = manager.workers;
    
    let itemsList = workers.map((worker) => {
              let tslist = worker.timesheets.map((timesheet) => 
		  <tr><td>{timesheet.date}</td>
        	  <td>{timesheet.status}</td>
        	  <td id={timesheet.id}>
        	  <button type="button" className="btn btn-link" onClick={this.handleView.bind(this)}>view</button></td></tr>);
	      return (
		<div>
	          <h2>Worker: {worker.id}</h2>
		  <table className="table">
                    <thead>
	              <tr>
	                <th>Date</th>
	                <th>Status</th>
	                <th></th>
	              </tr>
                    </thead>
		    <tbody>
		      {tslist}
		    </tbody>
		  </table>
		</div>
	      );
	    });
    
    return (
      <div>
        <h1>Manager: {user_name}</h1>
	<h1>Timesheets List</h1>
	{itemsList}
      </div>
    );
  }
}

export default connect(state2props)(Manager);

