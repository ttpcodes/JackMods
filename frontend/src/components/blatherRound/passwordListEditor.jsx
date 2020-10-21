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
          {props.data.content.map((entry, i) => {
            return (
              <PasswordEntry
                entry={entry}
                selected={entry === props.selectedEntry}
                onSelect={props.onSelectEntry}
                key={i}
              />
            );
          })}
        </div>
        <div style={{ gridArea: '1 / 2 / 3 / 3' }}>
          <PasswordEditor
            entry={props.selectedEntry}
            onSetCategory={props.onSetCategory}
            onSetDifficulty={props.onSetDifficulty}
            onSetSubcategory={props.onSetSubcategory}
            categories={props.categories}
            difficulties={props.difficulties}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordListEditor;
