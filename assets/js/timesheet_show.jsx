import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { get_timesheet, update_timesheet } from './ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, timesheet: state.timesheet, is_manager: state.session.is_manager};
}

class TimesheetShow extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  back(ev){
    this.redirect("/");
  }

  handleApprove(ev){
    let {id} = this.props;
    console.log("approve timesheet");
    let attr = {status: "Approved"};
    update_timesheet(id, attr, this);
  }
	
  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    
    let {id, timesheet, is_manager} = this.props;
//    if (timesheet.id != id){
//      console.log("getting timesheet");
      get_timesheet(id);
//    }
    let approve = <div></div>;
    if (is_manager && timesheet.status == "Waiting"){
      approve = <button type="button" className = "btn btn-primary" onClick={this.handleApprove.bind(this)}>Approve</button>
    }
    
    let hourlist = timesheet.tasks.map((task, index) => <p>hour{index+1}: {task}</p>)
    return (
      <div>
        <h1>Show Timesheet</h1>
	<p>Name: {timesheet.worker_name}</p>
	<p>Date: {timesheet.date}</p>
	<p>Status: {timesheet.status}</p>
	<h2>Tasks</h2>
	{hourlist}
	{approve}<br></br>
	<button type="button" className="btn btn-link" onClick = {this.back.bind(this)}>Back</button>
      </div>
    );
  }
}
export default connect(state2props)(TimesheetShow);
