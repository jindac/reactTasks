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
  }

  render() {
    return (
      <div className='container'>
        <h2>{this.props.task}</h2>
        <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ (() => { this.props.deleteTask(this.props.taskID); console.log('taskID = ', this.props.taskID); }).bind(this) }></i>
      </div>
    );
  }
}

export default Task;