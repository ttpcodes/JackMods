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

  onAddAlternateSpelling(alternateSpelling) {
    this.state.selectedEntry.addAlternateSpelling(alternateSpelling);
    this.forceUpdate();
  }

  onRemoveAlternateSpelling(alternateSpelling) {
    this.state.selectedEntry.removeAlternateSpelling(alternateSpelling);
    this.forceUpdate();
  }

  onSetCategory(category) {
    this.state.selectedEntry.setCategory(category);
    this.forceUpdate();
  }

  onSetDifficulty(difficulty) {
    this.state.selectedEntry.setDifficulty(difficulty);
    this.forceUpdate();
  }

  onAddForbiddenWord(forbiddenWord) {
    this.state.selectedEntry.addForbiddenWord(forbiddenWord);
    this.forceUpdate();
  }

  onRemoveForbiddenWord(forbiddenWord) {
    this.state.selectedEntry.removeForbiddenWord(forbiddenWord);
    this.forceUpdate();
  }

  onSetSubcategory(subcategory) {
    this.state.selectedEntry.setSubcategory(subcategory);
    this.forceUpdate();
  }

  onAddTailoredWord(word, list) {
    this.state.selectedEntry.addTailoredWord(word, list);
    this.forceUpdate();
  }

  onRemoveTailoredWord(word) {
    this.state.selectedEntry.removeTailoredWord(word);
    this.forceUpdate();
  }

  onAddPassword(password) {
    this.state.passwordList.addEntry(password);
    this.forceUpdate();
  }

  onRemovePassword(password) {
    this.state.passwordList.removeEntry(password);
    if (password === this.state.selectedEntry.password) {
      this.setState({ selectedEntry: null });
    } else {
      this.forceUpdate();
    }
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

  onExport() {
    const link = document.createElement('a');
    link.setAttribute('download', 'BlankyBlankPasswords.jet');
    link.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(
        JSON.stringify(this.state.passwordList),
      )}`,
    );
    link.click();
  }

  loadPasswordList(jetText) {
    this.setState({
      passwordList: PasswordList.fromObject(JSON.parse(jetText)),
    });
  }

  render() {
    return (
      <div>
        <div style={{ display: 'block', margin: '0 auto' }}>
          <input type="file" onChange={this.onFileSelect.bind(this)} />
          <button onClick={this.onExport.bind(this)}>Export</button>
        </div>
        <PasswordListEditor
          data={this.state.passwordList}
          selectedEntry={this.state.selectedEntry}
          onAddPassword={this.onAddPassword.bind(this)}
          onRemovePassword={this.onRemovePassword.bind(this)}
          onSelectEntry={this.onSelectEntry.bind(this)}
          alternateSpellingCallbacks={{
            onAdd: this.onAddAlternateSpelling.bind(this),
            onRemove: this.onRemoveAlternateSpelling.bind(this),
          }}
          onSetCategory={this.onSetCategory.bind(this)}
          onSetDifficulty={this.onSetDifficulty.bind(this)}
          forbiddenWordCallbacks={{
            onAdd: this.onAddForbiddenWord.bind(this),
            onRemove: this.onRemoveForbiddenWord.bind(this),
          }}
          onSetSubcategory={this.onSetSubcategory.bind(this)}
          tailoredWordCallbacks={{
            onAdd: this.onAddTailoredWord.bind(this),
            onRemove: this.onRemoveTailoredWord.bind(this),
          }}
          categories={PasswordList.Category}
          difficulties={PasswordList.Difficulty}
          validWordLists={PasswordList.validWordLists}
        />
      </div>
    );
  }
}

export default BlatherRound;
