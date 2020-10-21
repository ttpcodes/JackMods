import React from 'react';

class PasswordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelect() {
    this.props.onSelect(this.props.entry);
  }

  render() {
    return (
      <div onClick={this.onSelect.bind(this)}>
        <p>{this.props.entry.password}</p>
      </div>
    );
  }
}
export default PasswordEntry;
