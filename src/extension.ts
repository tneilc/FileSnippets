import * as vscode from "vscode";
import "./helpers/utils";
import {startSelections} from "./helpers/utils";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("filesnippets.CreateFiles", (e) => {
      if(e === undefined){
        startSelections();
      }
      else {
        startSelections(e.fsPath);
      }
    })
  );
}




export function deactivate(): void {}
