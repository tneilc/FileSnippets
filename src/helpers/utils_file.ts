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
import { quickPick } from "./utils_global";

export function startSelections(path: string | undefined = undefined) {
  createWorkspacePicker(path);
}

function createWorkspacePicker(path: string | undefined = undefined) {
  if (path !== undefined) {
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
  let wsPaths: QuickPickItemRedesigned[] = ws.map((obj) => ({
    label: obj.uri.fsPath,
  }));
  let workspacePicker = quickPick(wsPaths, (e) => {
    createLanguagePicker(e[0].label);
  });
  workspacePicker.show();
}

function createLanguagePicker(path: string) {
  const languages: QuickPickItemRedesigned[] = Object.keys(data.languages).map(
    (language) => {
      return ({ label: data.languages[language as keyof typeof data.languages].name, value: language });
    }
  );
  let languagePicker = quickPick(languages, (e) => {
    createNamePicker(path, e[0].value as keyof typeof data.languages);
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
