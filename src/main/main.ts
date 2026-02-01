import { app, BrowserWindow } from "electron";
import path from "path";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#0f0f12",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  const isDev = !app.isPackaged;
  const devServerUrl =
    process.env.VITE_DEV_SERVER_URL ?? "http://localhost:5173";
  const rendererPath = path.join(
    app.getAppPath(),
    "dist",
    "renderer",
    "index.html"
  );

  if (isDev) {
    void mainWindow.loadURL(devServerUrl);
  } else {
    void mainWindow.loadFile(rendererPath);
  }
};

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
