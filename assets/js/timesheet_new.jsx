import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { list_jobs, get_worker_with_timesheets, submit_new_timesheet } from './ajax';

function state2props(state) {
  return {email: state.session.email, jobs: state.jobs, worker: state.worker, errors: state.forms.timesheet_new.errors};
}

class TimesheetNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
      row: ["hour1"],
    };
    this.form = {date: "",
                 hour1: "",
                 hour2: "",
                 hour3: "",
                 hour4: "",
                 hour5: "",
                 hour6: "",
                 hour7: "",
                 hour8: "",
                 };
  }

  redirect(path) {
    this.setState(oldState => ({redirect: path}));
  }

  back(ev){
    this.redirect("/");
  }

  increaseRow(ev){
    if (this.state.row.length < 8){
      let row = this.state.row;
      row.push("hour"+(row.length+1).toString());
      this.setState(oldState => ({row: row}));
    }
  }

  decreaseRow(ev){
   if (this.state.row.length > 1){
     let row = this.state.row;
     let temp = row.pop();
     this.form[temp] = '';
     this.setState(oldState => ({row: row}));
   }
  }

  submit(ev){
    let {worker} = this.props;
    let form_temp = {date: this.form.date, tasks:[], status:"Waiting", worker_id: worker.id};
    for (let i=0; i < this.state.row.length; i++){
      if (this.form["hour"+(i+1).toString()] != ''){
        form_temp.tasks.push(this.form["hour"+(i+1).toString()]);
      }
    }
    this.props.dispatch({
      type: "CHANGE_TIMESHEET",
      data: form_temp,
    });
    submit_new_timesheet(this);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let {email, jobs, worker, dispatch, errors} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }
    if (worker.email == ''){
      console.log("getting worker");
      get_worker_with_timesheets(email);
    }
    if (jobs.length == 0){
      console.log("getting jobs");
      list_jobs();
    }
    let options = jobs.map((job) => <option>{job.job_code}</option>);
	  
    let taskItems = this.state.row.map((label)=> <Form.Group controlId={label}>
                                                   <Form.Label>{label}</Form.Label>
                                                   <Form.Control as="select" 
	                                            onChange={(ev) => {this.form[label] = ev.target.value;
						                       console.log(this.form)}}>
	                                             <option></option>
	                                             {options}
	                                           </Form.Control>
                                                 </Form.Group>
    );
    return (
      <div>
        <h1>New Timesheet</h1>
	{ error_msg }
	<Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" onChange={(ev) => {this.form.date = ev.target.value}}/>
        </Form.Group>
	{taskItems}
        <div className="row">
	  <button type="button" className="btn btn-secondary" onClick={this.increaseRow.bind(this)}>+</button>
	  <button type="button" className="btn btn-secondary" onClick={this.decreaseRow.bind(this)}>-</button>
	</div>
	<br></br>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={this.submit.bind(this)}>
            Submit</Button>
        </Form.Group>                                           
	<button type="button" className="btn btn-link" onClick = {this.back.bind(this)}>Back</button>
      </div>
    );
  }
}

export default connect(state2props)(TimesheetNew);
