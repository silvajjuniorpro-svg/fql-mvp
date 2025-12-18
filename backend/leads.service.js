const fs = require('fs');
const path = require('path');

let dataFile;

function initDb(userDataPath) {
  dataFile = path.join(userDataPath, 'leads.json');
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
}

function read() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function write(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

function listLeads() {
  return read();
}

function createLead(lead) {
  const data = read();
  data.push(lead);
  write(data);
}

function updateLead(lead) {
  const data = read().map(l => l.id === lead.id ? lead : l);
  write(data);
}

function deleteLead(id) {
  const data = read().filter(l => l.id !== id);
  write(data);
}

function exportCsv(filePath) {
  const leads = read();
  const header = 'id,name,phone,status\n';
  const rows = leads.map(l =>
    `${l.id},${l.name},${l.phone},${l.status}`
  ).join('\n');
  fs.writeFileSync(filePath, header + rows);
}

function importCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').slice(1);
  let count = 0;
  const data = read();

  for (const line of lines) {
    if (!line.trim()) continue;
    const [id, name, phone, status] = line.split(',');
    data.push({ id, name, phone, status });
    count++;
  }

  write(data);
  return { imported: count };
}

module.exports = {
  initDb,
  listLeads,
  createLead,
  updateLead,
  deleteLead,
  exportCsv,
  importCsv
};
