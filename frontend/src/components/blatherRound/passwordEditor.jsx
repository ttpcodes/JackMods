import React from 'react';

const PasswordEditor = (props) => {
  if (props.entry === null) {
    return <p>Please select a password to edit.</p>;
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
        <div>
          <p>You are now editing: {props.entry.password}</p>
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
                {props.entry.alternateSpellings.map((entry) => (
                  <div>{entry}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'grid',
                grid: 'auto auto auto / 140px 1fr',
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
                {props.entry.forbiddenWords.map((entry) => (
                  <div>{entry}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
          {props.entry.tailoredWords.map((tailoredWord) => (
            <>
              <div>{tailoredWord.word}</div>
              <div>{tailoredWord.list.replace('<', '').replace('>', '')}</div>
            </>
          ))}
          <div>White</div>
          <div>color-complex</div>
          <div>Cheese-filled</div>
          <div>taste-complex</div>
          <div>Nighttime</div>
          <div>period-of-time</div>
        </div>
      </div>
    </>
  );
};

export default PasswordEditor;
