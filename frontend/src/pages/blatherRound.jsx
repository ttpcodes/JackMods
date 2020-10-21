import React from 'react';
import PasswordListEditor from '../components/blatherRound/passwordListEditor';
import PasswordList from '../utils/blatherRound/passwordList';

class BlatherRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordList: new PasswordList(),
      selectedEntry: null,
    };
  }

  onSetCategory(category) {
    this.state.selectedEntry.setCategory(category);
    this.forceUpdate();
  }

  onSetDifficulty(difficulty) {
    this.state.selectedEntry.setDifficulty(difficulty);
    this.forceUpdate();
  }

  onSetSubcategory(subcategory) {
    this.state.selectedEntry.setSubcategory(subcategory);
    this.forceUpdate();
  }

  onSelectEntry(entry) {
    this.setState({ selectedEntry: entry });
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
      passwordList: PasswordList.fromObject(JSON.parse(jetText)),
    });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onFileSelect.bind(this)} />
        <PasswordListEditor
          data={this.state.passwordList}
          selectedEntry={this.state.selectedEntry}
          onSelectEntry={this.onSelectEntry.bind(this)}
          onSetCategory={this.onSetCategory.bind(this)}
          onSetDifficulty={this.onSetDifficulty.bind(this)}
          onSetSubcategory={this.onSetSubcategory.bind(this)}
          categories={PasswordList.Category}
          difficulties={PasswordList.Difficulty}
        />
      </div>
    );
  }
}

export default BlatherRound;
