const languageScript = require('./language-scripts.dgraph.json');

// add languages
const addLanguages = languageScript.queryLanguage.map((val) => {
  return {
    names: val.names,
    name_en: val.name_en,
  };
});
// add scripts

// add language_script

// link language-script
