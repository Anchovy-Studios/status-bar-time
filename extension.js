const vscode = require("vscode");
const moment = require("moment");

function getDefaultLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

moment.locale(getDefaultLocale());

var interval, item;
var show = false;

function toggleImplementation() {
  if (show) {
    if (item) {
      item.hide();
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  } else {
    if (!item) item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -100);
    item.show();
    interval = setInterval(() => (item.text = moment().format("Do MMMM YYYY, HH:mm:ss")), 1000);
  }
  show = !show;
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log("status-bar-time extensions activated...");

  let toggle = vscode.commands.registerCommand("status-bar-time.toggle", toggleImplementation);

  context.subscriptions.push(toggle);

  toggleImplementation();
}
exports.activate = activate;

function deactivate() {
  if (interval) {
    clearInterval(interval);
  }
}

module.exports = {
  activate,
  deactivate,
};
