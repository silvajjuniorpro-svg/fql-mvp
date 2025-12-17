# FQL Lead Score (MVP) — Windows Offline

Este projeto é um MVP de um sistema de Lead Score + Kanban, 100% offline, feito para rodar no Windows como um app desktop.

## Requisitos (para você gerar o .exe)
- Windows 10/11
- Node.js LTS instalado (recomendado 18+ ou 20+)
- Git (opcional)

## Rodar em modo dev
1) Abra o terminal na pasta do projeto
2) Rode:
   npm install
   npm start

## Gerar instalador .exe (Windows)
1) npm install
2) npm run dist
O instalador sai em: `dist/`

## Onde ficam os dados do cliente?
O banco SQLite fica na pasta padrão do app do usuário:
- `%APPDATA%/FQL Lead Score/fql.db` (caminho interno do Electron via app.getPath('userData'))

## Importar / Exportar
O MVP já tem botões de Importar/Exportar CSV.

## Próximos upgrades (v2)
- login/ativação por chave
- campos personalizados
- funil por etapas (novo, contato, visita, proposta, etc.)
- integrações (WhatsApp / CRM / Meta Leads)
