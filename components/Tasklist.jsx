import React from 'react';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Task from './Task.jsx';

class Tasklist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
      addingNewTask: false,
      canSave: false
    };
  }

  componentDidMount() {
    axios.get('http://cfassignment.herokuapp.com/derrickchan/tasks')
      .then(res => {
        if (res.data.tasks.tasks) {
          const tasks = res.data.tasks.tasks;
          this.setState({ tasks }, () => {
            this.msg.success('Successfully loaded saved tasks.');
          });
        } else {
          this.msg.show('No previously saved tasks.');
        }
      })
      .catch((error) => {
        this.msg.error('' + error);
      });
  }

  openNewTask() {
    this.setState({
      addingNewTask: true
    });
  }

  closeNewTask() {
    this.setState({
      addingNewTask: false
    });
  }

  onNewTask(task) {
    if (this.state.newTask.length > 0) {
      let newTasks = this.state.tasks;
      newTasks.unshift(task);
      this.setState({
        task: '',
        tasks: newTasks,
        canSave: true,
        addingNewTask: false,
      });
    } else {
      this.closeNewTask();
    }
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
    axios.post('http://cfassignment.herokuapp.com/derrickchan/tasks', newSave)
    .then((response) => {
      this.setState({
        canSave: false
      }, () => {
        this.msg.success('Successfully saved tasks.');
      });
    })
    .catch((error) => {
      this.msg.error('' + error);
    });
  }

  handleInputChange(e) {
    this.setState({
      newTask: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeNewTask();
    } else if (e.key === 'Enter') {
      this.onNewTask(this.state.newTask);
    }
  }

  render() {
    const alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 5000,
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
        <div className='taskListContainer'>
        {this.state.addingNewTask &&
          <div className='taskContainer'>
            <input autoFocus={this.state.addingNewTask} type='text' placeholder={'Describe your task here.'} onChange={this.handleInputChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}></input>
            <ButtonToolbar className='buttons'>
              <Button onClick={(() => { this.onNewTask(this.state.newTask); } ).bind(this)}>
                <i className="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
              </Button>
              <Button onClick={this.closeNewTask.bind(this)}>
                <i className="fa fa-times fa-2x" aria-hidden="true"></i>
              </Button>
            </ButtonToolbar>
          </div>}
        {this.state.tasks.map((task, taskID, taskArray) => (
          <Task task={task} taskID={taskID} key={taskID} deleteTask={this.deleteTask.bind(this)} editTask={this.editTask.bind(this)} />
        ))}
        </div>
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
      </div>
    );
  }
}

export default Tasklist;
