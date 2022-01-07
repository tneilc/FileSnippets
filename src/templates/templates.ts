/* eslint-disable @typescript-eslint/naming-convention */
export const data = {
  languages: {
    JavascriptCss: {
      files: [".js", ".css"],
      import: 'import "./{0}.css";',
      name: "Javascript - Css",
    },
    TypescriptCss: {
      files: [".ts", ".css"],
      import: 'import "./{0}.css";',
      name: "Typescript - Css",
    },
    Cpp: {
      files: [".cpp", ".h"],
      import: '#include "{0}.h"',
      name: "Cpp - H",
    },
    C: {
      files: [".c", ".h"],
      import: '#include "{0}.h"',
      name: "C - H",
    },
    Html: {
      files: [".html", ".css"],
      import:
        '<!DOCTYPE html>\n<html>\n  <head>\n    <link rel="stylesheet" href="{0}.css" />\n  </head>\n  <body>\n    <h1>FileSnippets Says Hello!</h1>\n  </body>\n</html>\n',
      name: "HTML - Css",
    },
  },
  projectTypes: {
    Cpp: {
      dirs:["/src/","/include/"],
      files:{
        main:{
          name:"main.cpp",
          path:"/",
          contents:"int main(int argc, char *argv[])\n{\n \n}"
        },
        makefile:{
          name:"makefile",
          path:"/",
          contents:"files := $(wildcard src/*.cpp) main.cpp \noutput : $(files)\n\tg++ -o output $(files)"
        }
      },
      name:"Cpp Make Project"
    },
    C: {
      dirs:["/src/","/include/"],
      files:{
        main:{
          name:"main.c",
          path:"/",
          contents:"int main(int argc, char *argv[])\n{\n \n}"
        },
        makefile:{
          name:"makefile",
          path:"/",
          contents:"files := $(wildcard src/*.c) main.c \noutput : $(files)\n\tgcc -o output $(files)"
        }
      },
      name:"C Make Project"
    },
  },
};
