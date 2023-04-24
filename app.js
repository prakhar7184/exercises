const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/wordCount", async (req, res) => {
  try {
    function countString(str, letter) {
      const re = new RegExp("\\b" + letter + "\\b", "ig");
      if (str.match(re) != null) {
        const count = str.match(re).length;
        return count;
      }
    }
    async function funcName(url) {
      const response = await fetch(url);
      var data = await response.text();
      const a = data.toLowerCase();
      const b = a.replace(/[^a-zA-Z0-9']/g, " ");
      const c = b.split(" ");
      const d = Array();
      const output = Array();
      const result = Array();
      c.forEach((val) => {
        if (d.indexOf(val) == -1) {
          d.push(val);
        }
      });
      d.forEach((value) => {
        if (value != "") {
          const dataCount = countString(a, value);
          const result = { word: value, count: dataCount };
          output.push(result);
        }
      });
      output.sort((a, b) => b.count - a.count);
      for (let i = 0; i < 10; i++) {
        result.push(output[i]);
      }
      return res.json(result);
    }

    const urlForWordCount = "http://norvig.com/big.txt";
    funcName(urlForWordCount);
  } catch (error) {
    return res.send(error.message);
  }
});
app.get("/randomUsers", async (req, res) => {
  try {
    const a = Array();
    (async function move() {
      let count = 0;
      const id = setInterval(frame, 100);
      async function frame() {
        if (count == 10) {
          clearInterval(id);
        } else {
          count++;
          const urlForRandomUser = "https://randomuser.me/api/";
          await fetch(urlForRandomUser)
            .then((response) => response.text())
            .then((jsonResponse) => {
              var newData = JSON.parse(jsonResponse);
              var result = {
                Name:
                  newData.results[0].name.title +
                  " " +
                  newData.results[0].name.first +
                  " " +
                  newData.results[0].name.last,
                DOB: newData.results[0].dob.date.substring(0, 10),
                email: newData.results[0].email,
              };
              a.push(result);
            });
        }
      }
    })();
    setInterval(() => {
      res.send(a);
    }, 2000);
  } catch (error) {
    return res.send(error.message);
  }
});

app.listen(3000, () => {
  console.clear();
  console.log(`Connected to 3000`);
});
