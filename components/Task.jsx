import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      edit: ''
    };
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  editTask() {
    if (this.state.edit.length > 0) {
      this.props.editTask(this.props.taskID, this.state.edit);
    }
    this.toggleEdit();
  }

  deleteTask() {
    this.props.deleteTask(this.props.taskID);
  }

  handleInputChange(e) {
    this.setState({
      edit: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.toggleEdit();
    } else if (e.key === 'Enter') {
      this.editTask();
    }
  }

  render() {
    const isEditing = this.state.editing;
    if (isEditing) {
      return (
        <div className='taskContainer'>
          <input autoFocus type='text' defaultValue={this.props.task} onChange={this.handleInputChange.bind(this)} onKeyDown={(e) => { this.handleKeyDown(e); }}></input>
          <ButtonToolbar className='buttons'>
            <Button onClick={this.editTask.bind(this)}>
              <i className="fa fa-floppy-o fa-2x" aria-hidden="true"></i>
            </Button>
            <Button onClick={this.toggleEdit.bind(this)}>
              <i className="fa fa-times fa-2x" aria-hidden="true"></i>
            </Button>
          </ButtonToolbar>
        </div>
      );
    } else {
      return (
        <div className='taskContainer'>
          <h3>{this.props.task}</h3>
          <ButtonToolbar className='buttons'>
            <Button onClick={this.toggleEdit.bind(this)}>
              <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
            </Button>
            <Button onClick={this.deleteTask.bind(this)}>
              <i className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
            </Button>
          </ButtonToolbar>
        </div>
      );
    }
  }
}

export default Task;