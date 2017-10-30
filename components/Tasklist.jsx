import React from 'react';
import { createStore } from 'redux';
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
      tasks: [
        'buy milk',
        'walk the dog',
        'task'
      ],
      openNewTask: false
    };
  }

  componentWillMount() {

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

  render() {
    return (
      <div style={style}>
        <h1>Tasks</h1>
        <button onClick={this.openNewTask.bind(this)}>
          Add Task
        </button>
        <NewTask isOpen={this.state.openNewTask} onNewTask={this.onNewTask.bind(this)} closeNewTask={this.closeNewTask.bind(this)} />
        <ul style={style}>
        {this.state.tasks.map((task) => (
          <Task task={task} />
        ))}
        </ul>
      </div>
    );
  }
}

export default Tasklist;