
// Mapping file extensions to Monaco languages
const extensionToLanguageMap = {
    abap: 'abap',
    apex: 'apex',
    azcli: 'azcli',
    bat: 'bat',
    bicep: 'bicep',
    c: 'cpp', // C files usually map to C++
    cpp: 'cpp',
    cs: 'csharp', // C# shorthand
    csharp: 'csharp',
    css: 'css',
    dart: 'dart',
    dockerfile: 'dockerfile',
    go: 'go',
    graphql: 'graphql',
    html: 'html',
    ini: 'ini',
    java: 'java',
    js: 'javascript', // Map js to javascript
    jsx: 'javascript', // JSX should map to javascript
    json: 'json',
    julia: 'julia',
    kt: 'kotlin', // Kotlin shorthand
    kotlin: 'kotlin',
    lua: 'lua',
    md: 'markdown', // Markdown shorthand
    markdown: 'markdown',
    mdx: 'mdx',
    php: 'php',
    ps1: 'powershell', // PowerShell shorthand
    powershell: 'powershell',
    proto: 'protobuf', // Protobuf shorthand
    protobuf: 'protobuf',
    py: 'python', // Python shorthand
    python: 'python',
    r: 'r',
    rb: 'ruby', // Ruby shorthand
    ruby: 'ruby',
    rs: 'rust', // Rust shorthand
    rust: 'rust',
    scala: 'scala',
    scss: 'scss',
    sh: 'shell', // Shell shorthand
    shell: 'shell',
    sql: 'sql',
    swift: 'swift',
    ts: 'typescript', // TypeScript shorthand
    tsx: 'typescript', // TypeScript with JSX
    typescript: 'typescript',
    xml: 'xml',
    yaml: 'yaml',
    yml: 'yaml', // YAML shorthand
    // Add more mappings if needed
  };
  

// Function to set the Monaco Editor's language based on the file name or extension
export function GetEditorLanguage(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const language = extensionToLanguageMap[fileExtension] || 'plaintext'; // Default to 'plaintext'
    // confirm(language)
    return language

}

// Create the Monaco Editor
// const editor = monaco.editor.create(document.getElementById('container'), {
//     value: '',
//     language: 'plaintext', // Default language
// });

// // Example usage: Dynamically change language when opening a new file
// setEditorLanguage('example.go'); // Sets language to Go
// setEditorLanguage('style.css'); // Sets language to CSS
// setEditorLanguage('script.py'); // Sets language to Python
