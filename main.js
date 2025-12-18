const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// 🔥 caminho REAL fora do app.asar
const backendPath = app.isPackaged
  ? path.join(process.resourcesPath, 'app.asar.unpacked', 'backend', 'leads.service.js')
  : path.join(__dirname, 'backend', 'leads.service.js');

const {
  initDb,
  listLeads,
  createLead,
  updateLead,
  deleteLead,
  exportCsv,
  importCsv
} = require(backendPath);

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0b1220',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
}

app.whenReady().then(() => {
  initDb(app.getPath('userData'));
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC - CRUD
ipcMain.handle('leads:list', async () => listLeads());
ipcMain.handle('leads:create', async (_e, lead) => createLead(lead));
ipcMain.handle('leads:update', async (_e, lead) => updateLead(lead));
ipcMain.handle('leads:delete', async (_e, id) => deleteLead(id));

// Export / Import (MVP bônus)
ipcMain.handle('leads:exportCsv', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Exportar Leads (CSV)',
    defaultPath: 'leads.csv',
    filters: [{ name: 'CSV', extensions: ['csv'] }]
  });
  if (canceled || !filePath) return { ok: false, reason: 'canceled' };
  exportCsv(filePath);
  return { ok: true, filePath };
});

ipcMain.handle('leads:importCsv', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Importar Leads (CSV)',
    properties: ['openFile'],
    filters: [{ name: 'CSV', extensions: ['csv'] }]
  });
  if (canceled || !filePaths?.[0]) return { ok: false, reason: 'canceled' };
  const result = importCsv(filePaths[0]);
  return { ok: true, ...result };
});
