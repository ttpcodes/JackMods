import React from 'react';
import PasswordEditor from './passwordEditor';
import PasswordEntry from './passwordEntry';

const PasswordListEditor = (props) => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          grid: '40px auto / 300px 1fr',
          columnGap: '10px',
        }}
      >
        <div
          style={{
            gridArea: '1 / 1 / 2 / 2',
            height: '90vh',
            overflow: 'overlay',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onAddPassword(e.target.querySelector('input').value);
              e.target.querySelector('input').value = '';
            }}
          >
            <input type="text" />
            <button>Add new password</button>
          </form>
        </div>
        <div
          style={{
            gridArea: '2 / 1 / 3 / 2',
            height: '90vh',
            overflow: 'overlay',
          }}
        >
          {props.data.content.map((entry, i) => {
            return (
              <PasswordEntry
                entry={entry}
                selected={entry === props.selectedEntry}
                onSelect={props.onSelectEntry}
                onRemovePassword={props.onRemovePassword}
                key={i}
              />
            );
          })}
        </div>
        <div style={{ gridArea: '1 / 2 / 3 / 3' }}>
          <PasswordEditor
            entry={props.selectedEntry}
            onRemovePassword={props.onRemovePassword}
            alternateSpellingCallbacks={props.alternateSpellingCallbacks}
            onSetCategory={props.onSetCategory}
            onSetDifficulty={props.onSetDifficulty}
            forbiddenWordCallbacks={props.forbiddenWordCallbacks}
            onSetSubcategory={props.onSetSubcategory}
            tailoredWordCallbacks={props.tailoredWordCallbacks}
            categories={props.categories}
            difficulties={props.difficulties}
            validWordLists={props.validWordLists}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordListEditor;
