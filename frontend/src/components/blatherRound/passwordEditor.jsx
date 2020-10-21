import React from 'react';

const PasswordEditor = (props) => {
  if (props.entry === null) {
    return (
      <p style={{ textAlign: 'center' }}>Please select a password to edit.</p>
    );
  }
  const selectedCategory = Object.keys(props.categories)
    .map((key) => props.categories[key])
    .find((category) => category.value === props.entry.category);
  const validSubcategories = Object.keys(selectedCategory.subcategories).map(
    (key) => selectedCategory.subcategories[key],
  );
  const selectedSubcategory = validSubcategories.find(
    (subcategory) => subcategory.value === props.entry.subcategory,
  );
  return (
    <>
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>{props.entry.password}</h1>
        </div>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <button onClick={() => props.onRemovePassword(props.entry.password)}>
            Delete {props.entry.password}
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            grid: 'auto / 1fr 1fr',
            columnGap: '10px',
            maxWidth: '800px',
            textAlign: 'left',
            margin: '0 auto',
          }}
        >
          <div>
            <div
              style={{
                display: 'grid',
                grid: 'auto auto auto / 140px 1fr',
                rowGap: '10px',
                columnGap: '4px',
                textAlign: 'left',
              }}
            >
              <div>Category</div>
              <div>
                {Object.keys(props.categories).map((key) => (
                  <div
                    onClick={() =>
                      props.onSetCategory(props.categories[key].value)
                    }
                  >
                    {props.entry.category === props.categories[key].value ? (
                      <u>
                        <b>{props.categories[key].value}</b>
                      </u>
                    ) : (
                      <>{props.categories[key].value}</>
                    )}
                  </div>
                ))}
              </div>
              <div>Difficulty</div>
              <div>
                {Object.keys(props.difficulties).map((key) => (
                  <div
                    onClick={() =>
                      props.onSetDifficulty(props.difficulties[key])
                    }
                  >
                    {props.entry.difficulty === props.difficulties[key] ? (
                      <u>
                        <b>{props.difficulties[key]}</b>
                      </u>
                    ) : (
                      <>{props.difficulties[key]}</>
                    )}
                  </div>
                ))}
              </div>
              <div>Alternate Spellings</div>
              <div>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      props.alternateSpellingCallbacks.onAdd(
                        e.target.querySelector('input').value,
                      );
                      e.target.querySelector('input').value = '';
                    }}
                  >
                    <input type="text" />
                    <button>Add</button>
                  </form>
                </div>
                {props.entry.alternateSpellings.map((entry) => (
                  <div>
                    <button
                      onClick={() =>
                        props.alternateSpellingCallbacks.onRemove(entry)
                      }
                      style={{ marginRight: '4px' }}
                    >
                      x
                    </button>
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'grid',
                grid: 'auto auto auto / 140px 1fr',
                rowGap: '10px',
                columnGap: '4px',
                textAlign: 'left',
              }}
            >
              <div>Subcategory</div>
              <div>
                {validSubcategories.map((subcategory) => (
                  <div
                    onClick={() => props.onSetSubcategory(subcategory.value)}
                  >
                    {subcategory === selectedSubcategory ? (
                      <u>
                        <b>
                          {subcategory.value === ''
                            ? 'none'
                            : subcategory.value}
                        </b>
                      </u>
                    ) : (
                      <>
                        {subcategory.value === '' ? 'none' : subcategory.value}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div>Forbidden Words</div>
              <div>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      props.forbiddenWordCallbacks.onAdd(
                        e.target.querySelector('input').value,
                      );
                      e.target.querySelector('input').value = '';
                    }}
                  >
                    <input type="text" />
                    <button>Add</button>
                  </form>
                </div>
                {props.entry.forbiddenWords.map((entry) => (
                  <div>
                    <button
                      onClick={() =>
                        props.forbiddenWordCallbacks.onRemove(entry)
                      }
                      style={{ marginRight: '4px' }}
                    >
                      x
                    </button>
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div
        style={{
          display: 'grid',
          grid: 'auto / 140px auto',
          columnGap: '4px',
          maxWidth: '800px',
          textAlign: 'left',
          margin: '0 auto',
        }}
      >
        <div>Tailored Words</div>
        <div
          style={{
            display: 'grid',
            grid: 'auto-flow auto / 1fr 1fr',
            columnGap: '4px',
            textAlign: 'left',
          }}
        >
          <div style={{ gridArea: '1 / 1 / 2 / 3' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.tailoredWordCallbacks.onAdd(
                  e.target.querySelector('input[type="text"]').value,
                  `<${e.target.querySelector('input[list]').value}>`,
                );
                e.target.querySelector('input[type="text"]').value = '';
                e.target.querySelector('input[list]').value = '';
              }}
            >
              <input type="text" />
              <input list="tailoredWordListDataList" />
              <datalist id="tailoredWordListDataList">
                {props.validWordLists.map((wordList) => (
                  <option value={wordList.replace('<', '').replace('>', '')} />
                ))}
                <option value="tool" />
                <option value="is" />
                <option value="gerund" />
              </datalist>
              <button>Add</button>
            </form>
          </div>
          {props.entry.tailoredWords.map((tailoredWord) => (
            <>
              <div>
                <button
                  onClick={() =>
                    props.tailoredWordCallbacks.onRemove(tailoredWord.word)
                  }
                  style={{ marginRight: '4px' }}
                >
                  x
                </button>
                {tailoredWord.word}
              </div>
              <div>{tailoredWord.list.replace('<', '').replace('>', '')}</div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PasswordEditor;
