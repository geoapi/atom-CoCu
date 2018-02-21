'use babel';

import GetCodeView from './get-code-view';
import { CompositeDisposable } from 'atom';
var request = require('request');
//const cheerio = require('cheerio');

export default {

  getCodeView: null,
  modalPanel: null,
  subscriptions: null,
//activate is the most important part which contains any work needed to be addModalPanel

  activate(state) {
    this.getCodeView = new GetCodeView(state.getCodeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getCodeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'get-code:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.getCodeView.destroy();
  },

  serialize() {
    return {
      getCodeViewState: this.getCodeView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const selection = editor.getSelectedText().replace(/(^\s+|\s+$)/g, "");
      // remove white spaces
      console.log(selection);

  //    this.getCodeView.setCount(selection);
  //    this.modalPanel.show();
       url = 'http://localhost:3000/code/methods/' + selection;
       console.log(url);
       request(
         { headers:
            {
              'Accept':'application/json; charset=utf-8',
              'User-Agent': 'RandomHeader'
            },
            uri: url,
            method: 'GET',
            gzip: 'true'
          }, function(error, response, body) {
     //   console.log('error:', error); // Print the error if one occurred
     //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            pbody = JSON.parse(body);
            console.log(pbody);
            if (pbody.answers.length) {
              console.log(pbody.answers[0].code); // Print the HTML for the Google homepage.
              editor.insertText(pbody.answers[0].code.toString());
          }
      }
     )
   }
  }

  //  boxJWT.AdminToken

//openssl genrsa -aes256 -out private_key.pem 2048

  // toggle() {
  //   console.log('GetCode was toggled!');
  //   return (
  //     this.modalPanel.isVisible() ?
  //     this.modalPanel.hide() :
  //     this.modalPanel.show()
  //   );
  // }
//This example about how to get word counted and siplayed in a modalPanel
  // toggle() {
  //   if (this.modalPanel.isVisible()) {
  //     this.modalPanel.hide();
  //   } else {
  //     const editor = atom.workspace.getActiveTextEditor();
  //     const words = editor.getText().split(/\s+/).length;
  //     this.getCodeView.setCount(words);
  //     this.modalPanel.show();
  //   }
  // }
}
