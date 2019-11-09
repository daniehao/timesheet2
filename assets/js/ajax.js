import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function put(path, body) {
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'put',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function delete_ajax(path, body) {
  let state = store.getState();
  let token = state.session.token;

  fetch('/ajax' + path, {
    method: 'delete',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function post_login(path, body) {
  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session.token;
  console.log("token", token);

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}


export function list_jobs() {
  get('/jobs')
    .then((resp) => {
      let data = JSON.parse(JSON.stringify(resp)).data;
      console.log("jobs");
      console.log(data);
      store.dispatch({
        type: 'UPDATE_JOBS',
        data: data,
      });
    });
}

export function get_worker_with_timesheets(email) {
  get('/workers/'+email)
    .then((resp) => {
      let data = JSON.parse(JSON.stringify(resp));
      console.log("worker");
      console.log(data);
      store.dispatch({
        type: 'UPDATE_WORKER',
        data: data,
      });
    });
}

export function get_manager_with_workers(email) {
  get('/managers/'+email)
    .then((resp) => {
      let data = JSON.parse(JSON.stringify(resp));
      console.log("manager");
      console.log(data);
      store.dispatch({
        type: 'UPDATE_MANAGER',
        data: data,
      });
    });
}


export function get_timesheet(id) {
  get('/timesheets/'+ id)
    .then((resp) => {
      let data = JSON.parse(JSON.stringify(resp)).data;
      console.log("timesheet");
      console.log(data);
      store.dispatch({
        type: 'UPDATE_TIMESHEET',
        data: data,
      });
    });
}

export function delete_timesheet(id) {
  let state = store.getState();
  get("/timesheets/delete/"+id);
//  delete_ajax("/timesheets", {id: id});
  get_worker_with_timesheets(state.session.email);
}

export function update_timesheet(id, attr, form){
  let state = store.getState();
  console.log("updating timesheet");
  post('/timesheeets/update', {
	 id: id,
	 timesheet: attr,
         }).then((resp) => {
		 console.log(resp);
		 if (resp.data) {
	           get_manager_with_workers(state.session.email);
		 }
               form.redirect("/");
	 });
//  get('/timesheets/approve/'+id).then((resp) => {
//		 console.log(resp);
//		 if (resp.data) {
//		   get_manager_with_workers(state.session.email);
//		 }
//                 form.redirect("/");
//	 });

}

export function submit_new_timesheet(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.timesheet_new;

  if (data.date == '' || data.tasks.length == 0) {
    store.dispatch({
          type: 'CHANGE_TIMESHEET',
          data: {errors: "Date or task is empty"},
        });
    return;
  }
  post('/timesheets', {
      timesheet: {
	date: data.date,
        tasks: data.tasks,
        status: data.status,
        worker_id: data.worker_id,
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.data) {
	get_worker_with_timesheets(state.session.email);
        store.dispatch({
          type: 'CHANGE_TIMESHEET',
          data: {date: "",
	         tasks: [],
		 status: "Waiting",
		 worker_id: null,
		 errors: "",
	  },
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_TIMESHEET',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });

}

export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;
  console.log("submit data:", data);

  post_login('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
