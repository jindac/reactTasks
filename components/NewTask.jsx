import React from 'react';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      task: ''
    };
  }
  // close(e) {
  //   e.preventDefault();

  //   if (this.props.onClose) {
  //     this.props.onClose();
  //   }
  // }

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
        <div style={modalStyle}>
          <input type='text' placeholder={'Type your task here.'} onChange={(e) => { this.setState({task: e.target.value}); }}></input>
          <input type='button' value='Save' onClick={() => { this.props.onNewTask(this.state.task); this.props.closeNewTask(); }}></input>
        </div>
      </div>
    );
  }
}

export default NewTask;