import fs from "fs";

loadTemplates();
function loadTemplates(): void {
  const allTemplates = document.querySelectorAll("div[temp]");
  allTemplates.forEach((temp: Element, index, array) => {
    const fileName = temp.innerHTML.replace(/@/gi, "");
    if (fileName) {
      fs.readFile(
        `${__dirname}/gui/${fileName}/${fileName}.html`,
        function read(err: any, data: any) {
          if (err) throw err;
          temp.innerHTML = data;
          temp.removeAttribute("temp");
        }
      );
    }
  });
  setTimeout(loadTemplates, 50);
}
