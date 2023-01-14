const fs = require("fs");

const allTemplates = document.querySelectorAll("div[temp]");

allTemplates.forEach((temp: Element) => {
  const fileName = temp.innerHTML.replace(/@/gi, "");
  if (fileName) {
    fs.readFile(`${__dirname}/gui/${fileName}.html`, function read(err: any, data: any) {
      if (err) {
        throw err;
      }
      temp.innerHTML = data;
    });
  }
});
