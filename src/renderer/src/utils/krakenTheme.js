import { EditorView } from "@codemirror/view";

import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

// Color Palette based on the provided CSS
const bg0 = "#1e1e2e",
  bg1 = "#7f849c",
  bg4 = "#6c7086",
  fg = "#cdd6f4",
  fg3 = "#a6adc8",
  gray = "#bac2de",
  blue = "#89b4fa",
  yellow = "#f9e2af",
  aqua = "#89b4fa",
  orange = "#fab387",
  primaryBg = "#1C1C2A",
  currentLine = "#313244",
  selection = "#585b70",
  atom = "#b4befe",
  cursor = "#7f849c",
  keyword = "#D31F6B",
  operator = "#89dceb",
  number = "#fab387",
  definition = "#89b4fa",
  string = "#a6e3a1";

// The editor theme styles
export const ctpMochaTheme = EditorView.theme({
  "&": {
    color: fg,
    backgroundColor: primaryBg
  },

  ".cm-content": {
    caretColor: cursor
  },

  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: cursor
  },
  
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: selection
  },

  ".cm-panels": {
    backgroundColor: primaryBg,
    color: fg3
  },

  ".cm-panels.cm-panels-top": {
    borderBottom: "2px solid black"
  },

  ".cm-panels.cm-panels-bottom": {
    borderTop: "2px solid black"
  },

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },

  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  ".cm-activeLine": {
    backgroundColor: currentLine
  },

  ".cm-selectionMatch": {
    backgroundColor: "#FF5F5F35"
  },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: selection
  },

  ".cm-gutters": {
    backgroundColor: primaryBg,
    color: '#9DA1D3',
    borderRight: "1px solid #9DA1D3"
  },

  ".cm-activeLineGutter": {
    backgroundColor: currentLine
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: "#353a42"
  },

  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },

  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: "#353a42",
    borderBottomColor: "#353a42"
  },

  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: "#2c313a",
      color: fg
    }
  }
}, { dark: true });
const coral = "#f38ba8";
// Highlighting Style for Code
export const ctpMochaHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: keyword },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: coral },
  { tag: [t.function(t.variableName), t.labelName], color: aqua },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: yellow },
  { tag: [t.definition(t.name), t.separator], color: fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: blue },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: operator },
  { tag: [t.meta, t.comment], color: gray },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: gray, textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: coral },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: orange },
  { tag: [t.processingInstruction, t.string, t.inserted], color: string },
  { tag: t.invalid, color: "#ffffff" }
]);

// Extension to enable the CTP Mocha theme
export const ctpMocha = [ctpMochaTheme, syntaxHighlighting(ctpMochaHighlightStyle)];
