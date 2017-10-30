import React from 'react';
import { createStore } from 'redux';
import axios from 'axios';

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

const style = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'black'
};

class Tasklist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      openNewTask: false
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
      tasks: newTasks
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

  render() {
    return (
      <div style={style}>
        <h1>Tasks</h1>
        <button onClick={this.openNewTask.bind(this)}>
          Add Task
        </button>
        <button onClick={this.onSave.bind(this)}>
          Save
        </button>
        <NewTask isOpen={this.state.openNewTask} onNewTask={this.onNewTask.bind(this)} closeNewTask={this.closeNewTask.bind(this)} />
        <ul style={style}>
        {this.state.tasks.map((task, taskID) => (
          <Task task={task} key={taskID} />
        ))}
        </ul>
      </div>
    );
  }
}

export default Tasklist;