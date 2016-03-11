var $ = require('jquery');
var markdown = require('marked');
var Constants = require('./util/constants.js');
var ipcRenderer = require('electron').ipcRenderer;




exports.openFile = function(file) {
  createPanel();
  $(".editorFrame").text(file);
  $(".previewFrame").html(markdown(file));
  watchInput();

};

function createPanel() {
  $(".editor").html("<div class='mainWindowPane previewPane'><div class='previewHeader headline'>Preview</div><div class='previewFrame'></div></div><div class='mainWindowPane editorPane'><div class='editorHeader headline'>Editor</div><textarea class='editorFrame' name='name' rows='8' cols='40'></textarea></div>")
}

function watchInput() {
  $(".editorFrame").bind('input propertychange', function() {
    var self = this;
    $(".previewFrame").html(markdown(self.value));
    ipcRenderer.sendSync('setCurrentContent', self.value);
  });
}
