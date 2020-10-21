import React from 'react';
import PasswordEditor from './passwordEditor';
import PasswordEntry from './passwordEntry';

class PasswordListEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
    };
  }

  onSelectEntry(entry) {
    this.setState({ selectedEntry: entry });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'grid',
            grid: '40px auto / 300px 1fr',
          }}
        >
          <div
            style={{
              gridArea: '1 / 1 / 2 / 2',
              height: '90vh',
              overflow: 'overlay',
            }}
          >
            <input type="text" />
            <button>Add new password</button>
          </div>
          <div
            style={{
              gridArea: '2 / 1 / 3 / 2',
              height: '90vh',
              overflow: 'overlay',
            }}
          >
            {this.props.data.content.map((entry, i) => {
              return (
                <PasswordEntry
                  entry={entry}
                  key={i}
                  onSelect={this.onSelectEntry.bind(this)}
                />
              );
            })}
          </div>
          <div style={{ gridArea: '1 / 2 / 3 / 3' }}>
            <PasswordEditor entry={this.state.selectedEntry} />
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordListEditor;
