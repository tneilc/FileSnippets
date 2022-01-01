export const data = {
  languages: {
    javascriptcss: {
      files: [".js", ".css"],
      import: 'import "./{0}"',
    },
    typescriptcss: {
      files: [".ts", ".css"],
      import: 'import "./{0}"',
    },
    cpp:{
      files: [".cpp",".h"],
      import : "#include \"{0}.h\""
    },
    html:{
      files: [".html",".css"],
      import : '<!DOCTYPE html>\n<html>\n  <head>\n    <link rel=\"stylesheet\" href=\"{0}.css\" />\n  </head>\n  <body>\n    <h1>FileSnippets Says Hello!</h1>\n  </body>\n</html>\n'
    }
  },
};
