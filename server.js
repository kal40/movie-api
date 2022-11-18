const http = require("http"),
  url = require("url"),
  fs = require("fs");

http
  .createServer((request, response) => {
    let filePath = "";
    const myURL = new URL(request.url, `http://${request.headers.host}`); // https://nodejs.org/api/http.html#messageurl

    fs.appendFile(
      "log.txt",
      `URL: ${myURL.href}\nTimestamp: ${new Date()}\n\n`,
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Added to log.");
        }
      }
    );

    if (myURL.pathname.includes("documentation")) {
      filePath = `${__dirname}/documentation.html`;
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        throw error;
      }
      response.writeHead(200, { "Content-type": "text/plain" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
