import React from 'react';

const style = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  fontFamily: 'Lato',
};

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
    return (
      <div className='container'>
        {this.state.editing ? <input autoFocus type='text' defaultValue={this.props.task} onChange={this.handleInputChange.bind(this)} onKeyDown={(e) => { this.handleKeyDown(e); }}></input> : <h2>{this.props.task}</h2>}
        {this.state.editing ? <i className="fa fa-floppy-o fa-2x" aria-hidden="true" onClick={this.editTask.bind(this)}></i> : <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true" onClick={this.toggleEdit.bind(this)}></i>}
        <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={this.deleteTask.bind(this)}></i>
      </div>
    );
  }
}

export default Task;