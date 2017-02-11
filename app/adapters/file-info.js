import DS from 'ember-data';
const fs = require('fs');

export default DS.JSONAPIAdapter.extend({
  filePath: '',
  findAll() {
    let filePath = '/Users/MaxiMac/Documents/NoteDown/';
    let files = fs.readdirSync(filePath, 'utf8');
    let fileListWithStats = [];
    files.forEach(function (file) {
      let stats = fs.statSync(filePath + "/" + file);
      fileListWithStats.push({file, stats});
    });
    return {meta:'', data: fileListWithStats, errors: ''};
  },
  findRecord() {

  },

  serialize(snapshot) {
    console.log(snapshot);
  }
});
