import fs from "fs";


loadTemplates();

function loadTemplates() {
  const allTemplates = document.querySelectorAll("div[temp]");

  allTemplates.forEach((temp: Element, index, array) => {
    const fileName = temp.innerHTML.replace(/@/gi, "");
    if (fileName) {
      fs.readFile(
        `${__dirname}/gui/${fileName}.html`,
        function read(err: any, data: any) {
          if (err) {
            throw err;
          }
          temp.innerHTML = data;
          temp.removeAttribute("temp");
        }
      );
      fs.readFile(
        `${__dirname}/controllers/${fileName}.js`,
        function read(err: any, data: any) {
          if (!err) {
            const script = document.createElement("script");
            script.src = `${__dirname}/controllers/${fileName}.js`;
            document.head.appendChild(script);
          }
        }
      );
    }
    if (array.length === index + 1)
      setTimeout((t: any) => {
        loadTemplates();
        clearTimeout(t);
      }, 50);
  });
}
