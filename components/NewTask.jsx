import React from 'react';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      task: ''
    };
  }

  addNewTask() {
    if (this.state.task !== '') {
      this.props.onNewTask(this.state.task);
      this.props.closeNewTask();
    }
  }

  handleKeyDown(e) {
    console.log('e.key = ', e.key);
    if (e.key === 'Escape') {
      this.props.closeNewTask();
    }
  }

  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    };

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    };

    return (
      <div>
        <form style={modalStyle} onSubmit={this.addNewTask.bind(this)}>
          <input autoFocus type='text' placeholder={'Type your task here.'} onChange={(e) => { this.setState({task: e.target.value}); }} onKeyDown={(e) => { this.handleKeyDown(e); }}></input>
          <input type='button' value='Add' onClick={this.addNewTask.bind(this)}></input>
          <input type='button' value='Cancel' onClick={() => { this.props.closeNewTask(); }}></input>
        </form>
        <div style={backdropStyle} onClick={() => { this.props.closeNewTask(); }}></div>
      </div>
    );
  }
}

export default NewTask;