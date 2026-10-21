const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const fileDir = path.join(__dirname, "files");

// Make sure the "files" directory exists
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}

// Helper function to handle response headers and CORS
function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

http
  .createServer((req, res) => {
    // 1. Handle CORS Preflight Requests (Required for React frontend calls)
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const file = parsedUrl.searchParams.get("fname");
    const content = parsedUrl.searchParams.get("content");
    const filename = file ? path.join(fileDir, file) : "";

    // Route: /write (POST)
    if (pathname === "/write" && req.method.toUpperCase() === "POST") {
      if (!file || !content) {
        return sendResponse(res, 400, { error: "Both 'fname' and 'content' are required!" });
      }

      fs.writeFile(filename, content, (error) => {
        if (error) {
          return sendResponse(res, 500, { error: "Failed to write file" });
        }
        sendResponse(res, 201, { message: "File created successfully with content" });
      });
    }

    // Route: /read (GET)
    else if (pathname === "/read" && req.method.toUpperCase() === "GET") {
      if (!file) {
        return sendResponse(res, 400, { error: "file name is required!" });
      }

      fs.readFile(filename, "utf-8", (error, data) => {
        if (error) {
          return sendResponse(res, 404, { error: "file not found!" });
        }
        sendResponse(res, 200, { data: data });
      });
    }

    // Route: /append (POST)
    else if (pathname === "/append" && req.method.toUpperCase() === "POST") {
      if (!file || !content) {
        return sendResponse(res, 400, { error: "Both 'fname' and 'content' are required!" });
      }

      fs.appendFile(filename, content, (error) => {
        if (error) {
          return sendResponse(res, 500, { error: "Failed to append to file" });
        }
        sendResponse(res, 200, { message: "Content appended successfully" });
      });
    }

    // Route: /delete (DELETE)
    else if (pathname === "/delete" && req.method.toUpperCase() === "DELETE") {
      if (!file) {
        return sendResponse(res, 400, { error: "File name is required!" });
      }

      fs.unlink(filename, (error) => {
        if (error) {
          if (error.code === "ENOENT") {
            return sendResponse(res, 404, { error: "File not found!" });
          }
          return sendResponse(res, 500, { error: "Failed to delete file" });
        }
        sendResponse(res, 200, { message: "File deleted successfully" });
      });
    }

    // Route: /
    else if (pathname === "/") {
      sendResponse(res, 200, { message: "Welcome node js server 1" });
    }

    // Route: /about
    else if (pathname === "/about") {
      sendResponse(res, 200, { message: "This is about page 1 - in KIET" });
    }

    // 404 Fallback
    else {
      sendResponse(res, 404, { error: "404 Page Not Found" });
    }
  })
  .listen(3000, () => {
    console.log("Running... http://127.0.0.1:3000");
  });