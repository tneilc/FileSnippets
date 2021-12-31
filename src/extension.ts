import * as vscode from "vscode";
import "./helpers/utils";
import { quickPick } from "./helpers/utils";
import { data } from "./templates/templates";
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("filesnippets.CreateFiles", async () => {
      createWorkspacePicker();
    })
  );
}

function createWorkspacePicker() {
  let ws = vscode.workspace.workspaceFolders;
  if (!ws) {
    return;
  }
  if (ws.length === 1) {
    createLanguagePicker(ws[0].uri.fsPath);
    return;
  }
  let wsPaths: vscode.QuickPickItem[] = ws.map((obj) => ({
    label: obj.uri.fsPath,
  }));
  let workspacePicker = quickPick(wsPaths, (e) => {
    createLanguagePicker(e[0].label);
  });
  workspacePicker.show();
}
function createLanguagePicker(path: string) {
  const languageNames: vscode.QuickPickItem[] = Object.keys(data.languages).map(
    (key) => ({ label: key })
  );
  let languagePicker = quickPick(languageNames, (e) => {
    vscode.window.showInformationMessage(path+e[0].label);
  });
  languagePicker.show();
}

export function deactivate(): void {}
