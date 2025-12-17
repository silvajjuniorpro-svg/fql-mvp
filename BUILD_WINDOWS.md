# Gerar o instalador (.exe) do FQL (MVP) — Guia simples

Você tem **duas formas**:

## Opção A (mais fácil): Gerar o .exe pelo GitHub (sem instalar nada no PC do cliente)
1) Crie uma conta no GitHub (se não tiver).
2) Crie um repositório novo (ex: `fql-mvp`).
3) Envie os arquivos deste projeto para o repositório (upload pelo navegador funciona).
4) No GitHub, vá em **Actions**.
5) Se aparecer uma mensagem para habilitar, clique para habilitar Actions.
6) No menu da esquerda, selecione **Build Windows Installer**.
7) Clique em **Run workflow**.
8) Aguarde terminar (vai ficar verde).
9) Clique no job finalizado e baixe o **Artifact** chamado **FQL-Installer**.
10) Dentro do artifact vai estar o instalador do Windows (NSIS), na pasta `dist/`.

Depois disso, você manda esse **.exe** para o cliente (Drive/WhatsApp/Email).

---

## Opção B: Gerar o .exe no seu Windows (local)
Requisitos:
- Windows 10/11
- Internet
- Node.js LTS

Passo a passo:
1) Instale o Node.js LTS.
2) Extraia o zip do projeto.
3) Abra a pasta do projeto.
4) Clique com o botão direito dentro da pasta e escolha **Abrir no Terminal** (PowerShell).
5) Rode:
   npm install
6) Rode:
   npm run dist
7) O instalador vai aparecer na pasta `dist/`.

---

## O cliente NÃO faz nada disso
O cliente só recebe o **instalador** e instala com "Avançar > Avançar".
