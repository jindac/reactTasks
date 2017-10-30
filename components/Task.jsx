import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{this.props.task}</h2>
      </div>
    );
  }
}

export default Task;