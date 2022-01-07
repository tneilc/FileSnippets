import { Console } from "console";
import path = require("path");
import {
  commands,
  OpenDialogOptions,
  Position,
  Uri,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";
import { data } from "../templates/templates";
import { quickPick } from "./utils_global";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export function selectProjectType() {
  const projects: QuickPickItemRedesigned[] = Object.keys(
    data.projectTypes
  ).map((project) => {
    return {
      label: data.projectTypes[project as keyof typeof data.projectTypes].name,
      value: project,
    };
  });
  let projectPicker = quickPick(projects, (e) => {
    selectProjectPath(e[0].value as keyof typeof data.projectTypes);
  });
  projectPicker.show();
}

function selectProjectPath(projectType: keyof typeof data.projectTypes) {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select Project Folder",
    canSelectFiles: false,
    canSelectFolders: true,
  };

  window.showOpenDialog(options).then((fileUri) => {
    if (fileUri && fileUri[0]) {
      initializeProject(fileUri[0].fsPath, projectType);
    }
  });
}

function initializeProject(
  projectPath: string,
  projectType: keyof typeof data.projectTypes
) {
  commands.executeCommand("vscode.openFolder", Uri.file(projectPath));
  const wsedit = new WorkspaceEdit();
  data.projectTypes[projectType].dirs.map((x) => {
    if (!existsSync(projectPath + x)) {
      mkdirSync(projectPath + x);
    }
  });

  Object.keys(data.projectTypes[projectType].files).map((key) => {
    const files = data.projectTypes[projectType].files;
    Object.keys(data.projectTypes[projectType].files).map((key) => {
      const file =
        data.projectTypes[projectType].files[key as keyof typeof files];
      const filePath = Uri.file(projectPath + file.path + file.name);
      wsedit.createFile(filePath, { ignoreIfExists: true });
      if (file.contents) {
        writeFileSync(filePath.fsPath, file.contents);
      }
    });
  });

  workspace.applyEdit(wsedit);
}
