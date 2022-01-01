/* eslint-disable @typescript-eslint/naming-convention */
export const data = {
  languages: {
    JavascriptCss: {
      files: [".js", ".css"],
      import: 'import "./{0}.css";',
    },
    TypescriptCss: {
      files: [".ts", ".css"],
      import: 'import "./{0}.css";',
    },
    Cpp:{
      files: [".cpp",".h"],
      import : "#include \"{0}.h\""
    },
    Html:{
      files: [".html",".css"],
      import : '<!DOCTYPE html>\n<html>\n  <head>\n    <link rel=\"stylesheet\" href=\"{0}.css\" />\n  </head>\n  <body>\n    <h1>FileSnippets Says Hello!</h1>\n  </body>\n</html>\n'
    }
  },
};
