import { QuickPickItem, window } from "vscode";

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
  interface QuickPickItemRedesigned extends QuickPickItem {
      value? : string ;
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



export function quickPick(
  items: QuickPickItemRedesigned[],
  onChangeSelection = (e: readonly QuickPickItemRedesigned[]) => {
    e;
  },
  title: string | undefined = undefined
) {
  const quickPick = window.createQuickPick<QuickPickItemRedesigned>();
  quickPick.items = items;
  quickPick.title = title;
  quickPick.onDidChangeSelection((e) => {
    onChangeSelection(e);
    quickPick.hide();
  });
  quickPick.onDidHide(() => quickPick.dispose());
  return quickPick;
}

