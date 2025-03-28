import { app, BrowserWindow } from 'electron';
import isdev from 'electron-is-dev';
import path from 'path';
import { fileURLToPath } from 'url'; // Import for ESM compatibility

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    title: "My App",        // Set custom title
    icon: path.join(__dirname, 'assets/icon.png')  // Set custom icon
  });

  // Remove the menu bar
  win.setMenu(null);            // Completely remove the menu
  // win.setMenuBarVisibility(false);  // Hide the menu but keep it accessible with Alt

  if (isdev) {
    win.loadURL('http://localhost:5173');
  } else {
    const indexPath = new URL(`file://${path.join(__dirname, 'builder', 'index.html')}`).href;
    win.loadURL(indexPath);
    
    
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
