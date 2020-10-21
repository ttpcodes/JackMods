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
            ? {
                backgroundColor: 'deepskyblue',
                padding: '4px',
                textAlign: 'left',
              }
            : { padding: '4px', textAlign: 'left' }
        }
      >
        <button
          onClick={() => this.props.onRemovePassword(this.props.entry.password)}
          style={{ marginRight: '4px' }}
        >
          x
        </button>
        {this.props.selected ? (
          <u>
            <b>{this.props.entry.password}</b>
          </u>
        ) : (
          <>{this.props.entry.password}</>
        )}
      </div>
    );
  }
}
export default PasswordEntry;
