import * as vscode from "vscode";
import "./helpers/utils";
import { quickPick } from "./helpers/utils";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("filesnippets.CreateFiles", async () => {
      createWorkspacePicker();
    })
  );
}

function createWorkspacePicker(){
  let ws = vscode.workspace.workspaceFolders;
  if(!ws) {return;};
  if(ws.length === 1){

  } ;
  let wsPaths : vscode.QuickPickItem[] = ws.map(obj => ({label : obj.uri.fsPath}));
  let workspacePicker = quickPick(wsPaths,(e) => {
    vscode.window.showInformationMessage(e[0].label);
  });
  workspacePicker.show();
}
function createLanguagePicker(path:string){
  
}

export function deactivate() {}
