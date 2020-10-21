import React from 'react';

const PasswordEditor = (props) => {
  return (
    <div>
      <p>You are now editing: {props.entry?.password}</p>
      <p>
        Alternate Spellings: {`[${props.entry?.alternateSpellings.join(', ')}]`}
      </p>
      <p>Category: {props.entry?.category}</p>
      <p>Difficulty: {props.entry?.difficulty}</p>
      <p>Forbidden Words: {`[${props.entry?.forbiddenWords.join(', ')}]`}</p>
      <p>Subcategory: {props.entry?.subcategory}</p>
      <div
        style={{
          display: 'grid',
          grid: 'auto-flow auto / auto 1fr 1fr',
          columnGap: '10px',
          maxWidth: '600px',
          textAlign: 'left',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            gridColumn: '1',
            gridRow: '1 / 500',
          }}
        >
          Tailored Words:
        </div>
        {props.entry?.tailoredWords.map((tailoredWord) => (
          <>
            <div>{tailoredWord.word}</div>
            <div>{tailoredWord.list}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PasswordEditor;
