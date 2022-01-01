import {
  languages,
  Position,
  QuickPickItem,
  Uri,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";
import { data } from "../templates/templates";

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  };
}

export function startSelections(path : string | undefined = undefined) {
  createWorkspacePicker(path);
}

function quickPick(
  items: QuickPickItem[],
  onChangeSelection = (e: readonly QuickPickItem[]) => {
    e;
  },
  title: string | undefined = undefined
) {
  const quickPick = window.createQuickPick();
  quickPick.items = items;
  quickPick.title = title;
  quickPick.onDidChangeSelection((e) => {
    onChangeSelection(e);
    quickPick.hide();
  });
  quickPick.onDidHide(() => quickPick.dispose());
  return quickPick;
}

function createWorkspacePicker(path : string | undefined = undefined) {
  if(path !== undefined){
    createLanguagePicker(path);
    return;
  }
  
  let ws = workspace.workspaceFolders;
  if (!ws) {
    return;
  }
  if (ws.length === 1) {
    createLanguagePicker(ws[0].uri.fsPath);
    return;
  }
  let wsPaths: QuickPickItem[] = ws.map((obj) => ({
    label: obj.uri.fsPath,
  }));
  let workspacePicker = quickPick(wsPaths, (e) => {
    createLanguagePicker(e[0].label);
  });
  workspacePicker.show();
}

function createLanguagePicker(path: string) {
  const languageNames: QuickPickItem[] = Object.keys(data.languages).map(
    (key) => ({ label: key })
  );
  let languagePicker = quickPick(languageNames, (e) => {
    createNamePicker(path, e[0].label as keyof typeof data.languages);
  });
  languagePicker.show();
}

async function createNamePicker(
  path: string,
  language: keyof typeof data.languages
) {
  const searchQuery = await window.showInputBox({
    placeHolder: "File Name Selector",
    prompt: "Select File Name",
  });
  if (searchQuery === undefined) {
    return;
  }

  createFiles(path, language, searchQuery);
}

function createFiles(
  path: string,
  language: keyof typeof data.languages,
  fileName: string
) {
  const extensions = data.languages[language].files;
  const fileNameSplitted = fileName.split("/");
  const importLine = data.languages[language].import.format(
    fileNameSplitted[fileNameSplitted.length - 1]
  );

  const firstFilePath = Uri.file(path + "/" + fileName + extensions[0]);
  const secondFilePath = Uri.file(path + "/" + fileName + extensions[1]);

  const wsedit = new WorkspaceEdit();
  wsedit.createFile(firstFilePath, { ignoreIfExists: true });
  wsedit.insert(firstFilePath, new Position(0, 0), importLine);
  wsedit.createFile(secondFilePath, { ignoreIfExists: true });

  workspace.applyEdit(wsedit);
}
