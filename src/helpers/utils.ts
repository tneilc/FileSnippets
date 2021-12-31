import { QuickPickItem } from "vscode";
import { window } from "vscode";

export function quickPick(
  items: QuickPickItem[],
  onChangeSelection = (e: any) => {
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
