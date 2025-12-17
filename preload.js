const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  listLeads: () => ipcRenderer.invoke('leads:list'),
  createLead: (lead) => ipcRenderer.invoke('leads:create', lead),
  updateLead: (lead) => ipcRenderer.invoke('leads:update', lead),
  deleteLead: (id) => ipcRenderer.invoke('leads:delete', id),
  exportCsv: () => ipcRenderer.invoke('leads:exportCsv'),
  importCsv: () => ipcRenderer.invoke('leads:importCsv'),
});
