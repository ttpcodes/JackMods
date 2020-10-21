import React from 'react';
import PasswordListEditor from '../components/blatherRound/passwordListEditor';
import PasswordList from '../utils/blatherRound/passwordList';

class BlatherRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordListData: new PasswordList(),
    };
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.loadPasswordList(e.target.result);
    };
    reader.onerror = (e) => {
      console.error(`Error occured while reading ${file.name}`, error);
    };
    reader.readAsText(file);
  }

  loadPasswordList(jetText) {
    this.setState({
      passwordListData: PasswordList.fromObject(JSON.parse(jetText)),
    });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onFileSelect.bind(this)} />
        <PasswordListEditor data={this.state.passwordListData} />
      </div>
    );
  }
}

export default BlatherRound;
