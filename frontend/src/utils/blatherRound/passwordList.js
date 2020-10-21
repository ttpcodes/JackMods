const Category = {
  // When useless is listed here, that means it does not come up
  // BlankyBlankWordLists when generating possible hints. It is possible these
  // subcategories are used eslewhere.
  Person: {
    value: 'person',
    subcategories: {
      Actor: { value: 'actor' },
      Artist: { value: 'artist' },
      Athlete: { value: 'athlete' },
      Author: { value: 'author' },
      Celebrities: { value: 'celebrities' }, // Useless
      Celebrity: { value: 'celebrity' },
      Famous: { value: 'famous' },
      Fictional: { value: 'fictional' },
      Game: { value: 'game' }, // Useless
      Historical: { value: 'historical' },
      Leader: { value: 'leader' }, // Not useless, but literally only Queen Elizabeth
      Mascot: { value: 'mascot' },
      Musican: { value: 'musican' }, // Useless
      Musician: { value: 'musician' },
      None: { value: '' },
    },
  },
  Place: {
    value: 'place',
    subcategories: {
      Brand: { value: 'brand' },
      City: { value: 'city' },
      Country: { value: 'country' },
      Cultural: { value: 'cultural' },
      Fictional: { value: 'fictional' },
      Nature: { value: 'nature' },
      None: { value: '' },
      State: { value: 'state' },
      Water: { value: 'water' },
      Watery: { value: 'watery' }, // Useless, contains 3 places
    },
  },
  Story: {
    value: 'story',
    subcategories: {
      Animation: { value: 'animation' },
      Book: { value: 'book' },
      Boove: { value: 'boove' }, // Useless
      Boovie: { value: 'boovie' },
      Comic: { value: 'comic' },
      Movie: { value: 'movie' },
      Musical: { value: 'musical' },
      Myth: { value: 'myth' },
      None: { value: '' },
      Play: { value: 'play' },
      Tv: { value: 'tv' },
    },
  },
  Thing: {
    value: 'thing',
    subcategories: {
      Animal: { value: 'animal' },
      Edible: { value: 'edible' },
      Game: { value: 'game' },
      None: { value: '' },
      Thing: { value: 'thing' }, // Useless
      Toy: { value: 'toy' },
      Websites: { value: 'websites' }, // Useless
    },
  },
};

const Difficulty = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
};

// Need to strip of spaces when importing
const validWordLists = [
  '<abstract-concept>',
  '<age>',
  '<age-complex>',
  '<alive-dead>',
  '<are-in-relation-to>',
  '<are-known-for>',
  '<area>',
  '<bad>',
  '<bad-complex>',
  '<body>',
  '<body-complex>',
  '<building>',
  '<building-complex>',
  '<color>',
  '<color-complex>',
  '<creature>',
  '<creature-complex>',
  '<emotion-bad>',
  '<emotion-bad-complex>',
  '<emotion-good>',
  '<emotion-good-complex>',
  '<event>',
  '<event-complex>',
  '<family-role>',
  '<food>',
  '<general-adjective-dump>',
  '<general-career-sector>',
  '<general-career-status>',
  '<general-noun-dump>',
  '<general-verb-dump>',
  '<general-verb-dump-story-end>',
  '<genre>',
  '<gerund>',
  '<gets-something-bad>',
  '<gets-something-good>',
  '<good>',
  '<good-complex>',
  '<group>',
  '<hates>',
  '<idea>',
  '<idea-complex>',
  '<is>',
  '<is-in-relation-to>',
  '<issues>',
  '<land>',
  '<loves>',
  '<material>',
  '<material-complex>',
  '<media-sensation>',
  '<media-style-adjective>',
  '<media-type>',
  '<nature-places>',
  '<normal-weird>',
  '<parts-of-body>',
  '<people-types>',
  '<period-of-time>',
  '<person>',
  '<person-complex>',
  '<place>',
  '<place-complex>',
  '<place-dislike-simple>',
  '<place-feel-emotional-simple>',
  '<place-feel-simple>',
  '<place-general-verb-dump>',
  '<place-go-towards-simple>',
  '<place-like-simple>',
  '<place-meet-simple>',
  '<place-see-simple>',
  '<place-talk-to-simple>',
  '<place-touch-simple>',
  '<problem>',
  '<problem-complex>',
  '<protagonist>',
  '<shape>',
  '<shape-complex>',
  '<size>',
  '<size-complex>',
  '<society>',
  '<symbolizes>',
  '<taste>',
  '<taste-complex>',
  '<texture>',
  '<texture-complex>',
  '<thing>',
  '<tool>',
  '<tool-complex>',
  '<villain>',
  '<wants>',
];

class PasswordEntry {
  constructor(password, id) {
    this.alternateSpellings = [];
    this.category = Category.Thing.value;
    this.difficulty = Difficulty.Easy;
    this.forbiddenWords = [];
    this.id = `${id}`;
    this.password = password;
    this.subcategory = Category.Thing.subcategories.None.value;
    this.tailoredWords = [];
    this.us = false;
  }

  addAlternateSpelling(altSpelling) {
    if (
      altSpelling.length === 0 ||
      this.containsAlternateSpelling(altSpelling)
    ) {
      return;
    }
    this.alternateSpellings.push(altSpelling);
  }

  containsAlternateSpelling(altSpelling) {
    return this.alternateSpellings.includes(altSpelling);
  }

  removeAlternateSpelling(altSpelling) {
    if (!this.containsAlternateSpelling(altSpelling)) {
      return;
    }
    this.alternateSpellings.splice(
      this.alternateSpellings.indexOf(altSpelling),
      1,
    );
  }

  setCategory(category) {
    this.category = category;
    this.subcategory = Category.Thing.subcategories.None.value;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  addForbiddenWord(forbiddenWord) {
    if (
      forbiddenWord === null || // Thanks Tyra Banks
      forbiddenWord.length === 0 ||
      this.containsForbiddenWord(forbiddenWord)
    ) {
      return;
    }
    this.forbiddenWords.push(forbiddenWord);
  }

  containsForbiddenWord(forbiddenWord) {
    return this.forbiddenWords.includes(forbiddenWord);
  }

  removeForbiddenWord(forbiddenWord) {
    if (!this.containsForbiddenWord(forbiddenWord)) {
      return;
    }
    this.forbiddenWords.splice(this.forbiddenWords.indexOf(forbiddenWord), 1);
  }

  setID(id) {
    this.id = id;
  }

  setSubcategory(subcategory) {
    this.subcategory = subcategory;
  }

  addTailoredWord(tailoredWord, wordList) {
    if (
      tailoredWord.length == 0 ||
      this.containsTailoredWord(tailoredWord) ||
      !validWordLists.includes(wordList)
    ) {
      return;
    }
    this.tailoredWords.push({ list: wordList, word: tailoredWord });
  }

  containsTailoredWord(tailoredWord) {
    return this.tailoredWords.some((entry) => entry.word === tailoredWord);
  }

  getTailoredWordEntry(tailoredWord) {
    return this.tailoredWords.find((entry) => entry.word === tailoredWord);
  }

  removeTailoredWord(tailoredWord) {
    if (!this.containsTailoredWord(tailoredWord)) {
      return;
    }
    const entry = this.getTailoredWordEntry(tailoredWord);
    this.tailoredWords.splice(this.tailoredWords.indexOf(entry), 1);
  }

  setUS(us) {
    this.us = us;
  }
}

class PasswordList {
  static Category = Category;
  static Difficulty = Difficulty;
  static validWordLists = validWordLists;

  static fromObject = (obj) => {
    const passwordList = new PasswordList();
    obj.content.forEach((entry) => {
      const newEntry = passwordList.addEntry(entry.password);
      entry.alternateSpellings.forEach((alternateSpelling) => {
        newEntry.addAlternateSpelling(alternateSpelling);
      });
      newEntry.setCategory(entry.category);
      newEntry.setDifficulty(entry.difficulty);
      entry.forbiddenWords.forEach((forbiddenWord) => {
        newEntry.addForbiddenWord(forbiddenWord);
      });
      newEntry.setID(entry.id);
      passwordList.nextID = Math.max(passwordList.nextID, entry.id + 1);
      newEntry.setSubcategory(entry.subcategory);
      entry.tailoredWords.forEach((tailoredWord) => {
        newEntry.addTailoredWord(tailoredWord.word, tailoredWord.list);
      });
      newEntry.setUS(entry.us);
    });
    return passwordList;
  };

  constructor() {
    this.content = [];
    this.nextID = 80000;
  }

  get length() {
    return this.content.length;
  }

  addEntry(password) {
    if (password.length === 0) {
      return;
    }
    if (this.containsEntry(password)) {
      return this.getEntry(password);
    }
    const newEntry = new PasswordEntry(password, this.nextID);
    this.content.push(newEntry);
    this.nextID++;
    this.content.sort((a, b) => {
      if (a.password.toLowerCase() < b.password.toLowerCase()) {
        return -1;
      }
      if (a.password.toLowerCase() > b.password.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return newEntry;
  }

  containsEntry(password) {
    return this.content.some((entry) => entry.password === password);
  }

  getEntry(password) {
    return this.content.find((entry) => entry.password === password);
  }

  removeEntry(password) {
    if (!this.containsEntry(password)) {
      return;
    }
    const entry = this.getEntry(password);
    this.content.splice(this.content.indexOf(entry), 1);
  }
}

export default PasswordList;
