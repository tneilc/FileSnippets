import * as vscode from "vscode";
import { startSelections } from "./helpers/utils_file";
import { selectProjectType } from "./helpers/utils_project";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("filesnippets.CreateFiles", (e) => {
      if (e === undefined) {
        startSelections();
      } else {
        startSelections(e.fsPath);
      }
    }),
    vscode.commands.registerCommand("filesnippets.CreateProject", (e) => {
      selectProjectType();
    })
  );
}

export function deactivate(): void {}
