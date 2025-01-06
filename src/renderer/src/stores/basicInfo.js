import { ref } from "vue";
import { defineStore } from "pinia";
import { ScrollShiftCalc } from "../utils/ScrollShiftCal";

export const useWinBasicStore = defineStore("win-title-store", () => {
  const TitleVal = ref("Kraken");
  const FolderPath = ref();
  const onEditor = ref(false);
  const CodeEditorTab = ref([]);
  const ActiveCodeEditorTab = ref(0);
  const isMiddleBar = ref(true);
  const isSidebar = ref(false);
  const isFileXSideBar = ref(true);
  const CurrentScreenWindow = ref(0);
  const ScreenWindowTabs = ref([]);
  const ScroolShiftPos = ref();

  const ChangeScroolShiftPos = () => {
    ScroolShiftPos.value = ScrollShiftCalc(
      ScreenWindowTabs.value,
      CurrentScreenWindow.value
    );
  };

  const ChangeCurrentScreenWindow = (val) => {
    if (val >= 0 && val <= ScreenWindowTabs.value.length - 1) {
      CurrentScreenWindow.value = val;
      ChangeScroolShiftPos();
    }
  };

  const NextCurrentScreenWindow = () => {
    console.log(ScreenWindowTabs.value, "<----asd--->");

    if (CurrentScreenWindow.value !== ScreenWindowTabs.value.length - 1) {
      CurrentScreenWindow.value = CurrentScreenWindow.value + 1;
      ChangeScroolShiftPos();
    }
  };

  const PrevCurrentScreenWindow = () => {
    if (CurrentScreenWindow.value !== 0) {
      CurrentScreenWindow.value = CurrentScreenWindow.value - 1;
      ChangeScroolShiftPos();
    }
  };

  const ChangeScreenWindowTabs = (val) => {
    ScreenWindowTabs.value = val;
    console.log(ScreenWindowTabs.value, "<----asd--->");
  };

  const closeCodeTab = (prop) => {
    const index = CodeEditorTab.value.findIndex(
      (item) => item.name === prop.name && item.path === prop.path
    );
    var list = CodeEditorTab.value;
    if (index >= 0 && index < list.length) {
      list.splice(index, 1); // Remove 1 element at the specified index
    }
    ChangeCodeEditorTab(list);
  };

  const switchToCodeTab = (prop) => {
    const index = CodeEditorTab.value.findIndex(
      (item) => item.name === prop.name && item.path === prop.path
    );

    ChangeActiveCodeEditorTab(index);
  };

  const ChangeActiveCodeEditorTab = (val) => {
    ActiveCodeEditorTab.value = val;
  };

  const ChangeCodeEditorTab = (val) => {
    CodeEditorTab.value = val;
  };

  const ChangeIsFileXSideBar = (val) => {
    isFileXSideBar.value = val;
  };

  const ChangeIsSideBar = (val) => {
    isSidebar.value = val;
  };

  const ChangeIsMiddleBar = (val) => {
    isMiddleBar.value = val;
  };

  const ChangeOnEditor = (val) => {
    onEditor.value = val;
  };

  const ChangeTitle = (text) => {
    TitleVal.value = text;
  };
  const ChangeFolder = (text) => {
    FolderPath.value = text;
  };
  return {
    TitleVal,
    ChangeTitle,
    FolderPath,
    ChangeFolder,
    onEditor,
    ChangeOnEditor,
    isMiddleBar,
    ChangeIsMiddleBar,
    isSidebar,
    ChangeIsSideBar,
    isFileXSideBar,
    ChangeIsFileXSideBar,
    CodeEditorTab,
    ChangeCodeEditorTab,
    ActiveCodeEditorTab,
    ChangeActiveCodeEditorTab,
    switchToCodeTab,
    closeCodeTab,
    CurrentScreenWindow,
    ChangeCurrentScreenWindow,
    NextCurrentScreenWindow,
    PrevCurrentScreenWindow,
    ScreenWindowTabs,
    ChangeScreenWindowTabs,
    ScroolShiftPos,
  };
});
