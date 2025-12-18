const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

let db;

function initDb(userDataPath) {
  const dbPath = path.join(userDataPath, 'leads.db');
  db = new Database(dbPath);

  db.prepare(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT,
      phone TEXT,
      status TEXT,
      created_at TEXT
    )
  `).run();
}

function listLeads() {
  return db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
}

function createLead(lead) {
  db.prepare(`
    INSERT INTO leads (id, name, phone, status, created_at)
    VALUES (@id, @name, @phone, @status, @created_at)
  `).run(lead);
}

function updateLead(lead) {
  db.prepare(`
    UPDATE leads
    SET name=@name, phone=@phone, status=@status
    WHERE id=@id
  `).run(lead);
}

function deleteLead(id) {
  db.prepare(`DELETE FROM leads WHERE id = ?`).run(id);
}

function exportCsv(filePath) {
  const leads = listLeads();
  const header = 'id,name,phone,status,created_at\n';
  const rows = leads.map(l =>
    `${l.id},${l.name},${l.phone},${l.status},${l.created_at}`
  ).join('\n');
  fs.writeFileSync(filePath, header + rows);
}

function importCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').slice(1);
  let count = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const [id, name, phone, status, created_at] = line.split(',');
    createLead({ id, name, phone, status, created_at });
    count++;
  }

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
