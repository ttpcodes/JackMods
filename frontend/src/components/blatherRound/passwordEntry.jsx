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
      <div
        onClick={this.onSelect.bind(this)}
        style={
          this.props.selected
            ? { backgroundColor: 'deepskyblue', padding: '6px' }
            : {}
        }
      >
        <p>
          {this.props.selected ? (
            <u>
              <b>{this.props.entry.password}</b>
            </u>
          ) : (
            <>{this.props.entry.password}</>
          )}
        </p>
      </div>
    );
  }
}
export default PasswordEntry;
