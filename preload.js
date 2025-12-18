const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  list: () => ipcRenderer.invoke('leads:list'),
  create: (lead) => ipcRenderer.invoke('leads:create', lead),
  delete: (id) => ipcRenderer.invoke('leads:delete', id),
  exportCsv: () => ipcRenderer.invoke('leads:exportCsv')
});
