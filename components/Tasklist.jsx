import React from 'react';
import { createStore } from 'redux';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Task from './Task.jsx';
import NewTask from './NewTask.jsx';

// const reducer = () => {
//   if (action.type === 'INC') {
//     return state + 1;
//   }
// };

// const store = createStore(reducer, 0);

// store.subscribe(() => {
//   console.log('store changed', store.getState());
// });

class Tasklist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      openNewTask: false,
      canSave: false
    };
  }

  componentDidMount() {
    axios.get('http://cfassignment.herokuapp.com/derrickchan/tasks')
      .then(res => {
        if (res.data.tasks.tasks) {
          const tasks = res.data.tasks.tasks;
          console.log(tasks);
          this.setState({ tasks });
        } else {
          console.log('No previously saved tasks.');
        }
      });
  }

  openNewTask() {
    this.setState({
      openNewTask: true
    });
  }

  closeNewTask() {
    this.setState({
      openNewTask: false
    });
  }

  onNewTask(task) {
    let newTasks = this.state.tasks;
    newTasks.unshift(task);
    this.setState({
      tasks: newTasks,
      canSave: true
    });
  }

  editTask(taskID, edit) {
    let newTasks = this.state.tasks;
    newTasks[taskID] = edit;
    this.setState({
      tasks: newTasks,
      canSave: true
    });
  }

  deleteTask(taskID) {
    let newTasks = this.state.tasks.slice(0, taskID).concat(this.state.tasks.slice(taskID + 1));
    console.log(newTasks);
    this.setState({
      tasks: newTasks,
      canSave: true
    });
  }

  onSave() {
    let newSave = {
      tasks: {
        tasks: this.state.tasks
      }
    };

    console.log('newSave = ', newSave);
    axios.post('http://cfassignment.herokuapp.com/derrickchan/tasks', newSave)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  showAlert(message) {
    this.msg.show(message, {
      time: 0,
      type: 'success',
      icon: <img src="path/to/some/img/32x32.png" />
    });
  }

  confirmSave() {
    this.showAlert();
  }

  render() {
    const alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 0,
      transition: 'scale'
    };

    return (
      <div>
        <div className='panel'>
          <h1>Tasks</h1>
          <ButtonToolbar className='buttons'>
            <Button bsStyle='primary' onClick={this.openNewTask.bind(this)}>
              Add Task
            </Button>
            <Button bsStyle='success' onClick={this.onSave.bind(this)} disabled={!this.state.canSave}>
              Save
            </Button>
          </ButtonToolbar>
        </div>
        <NewTask isOpen={this.state.openNewTask} onNewTask={this.onNewTask.bind(this)} closeNewTask={this.closeNewTask.bind(this)} />
        <div className='taskListContainer'>
        {this.state.tasks.map((task, taskID, taskArray) => (
          <Task task={task} taskID={taskID} deleteTask={this.deleteTask.bind(this)} editTask={this.editTask.bind(this)} />
        ))}
        </div>
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
      </div>
    );
  }
}

export default Tasklist;