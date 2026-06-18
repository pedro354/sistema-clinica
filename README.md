# 🧠 Sistema de Gestão para Clínicas Psicológicas

Sistema fullstack desenvolvido para gerenciamento de clínicas psicológicas, permitindo o controle de pacientes, psicólogos, consultas e agenda de atendimentos.

O objetivo do projeto é aplicar conceitos de Engenharia de Software, desenvolvimento Back-End, modelagem de banco de dados e arquitetura de aplicações modernas.

---

## 🎯 Objetivos do Projeto

* Gerenciar pacientes e profissionais da clínica
* Controlar agendamentos de consultas
* Evitar conflitos de horários
* Centralizar informações clínicas
* Aplicar boas práticas de arquitetura e desenvolvimento

---

## 🚀 Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL

### Ferramentas

* ESLint
* Prettier
* Dotenv

---

## 📋 Funcionalidades

### Implementadas

* Estrutura Fullstack React + Node.js
* Integração Frontend ↔ Backend
* Configuração Prisma ORM
* Banco de dados PostgreSQL
* Organização de rotas
* Padronização de código com ESLint e Prettier

### Em Desenvolvimento

* Autenticação JWT
* Controle de acesso
* Cadastro de pacientes
* Cadastro de psicólogos
* Agendamento de consultas
* Remarcação de consultas
* Cancelamento de consultas
* Dashboard administrativo
* Calendário de atendimentos

### Planejadas

* Upload de documentos
* Testes automatizados
* Docker
* Logs da aplicação
* Sistema de notificações
* Relatórios gerenciais

---

## 🏗️ Estrutura do Projeto

```bash
clinic-system/
│
├── frontend/
│
└── backend/
```

---

## 📚 Regras de Negócio

O sistema está sendo desenvolvido considerando cenários reais de clínicas psicológicas.

Exemplos:

* Um psicólogo não pode possuir duas consultas no mesmo horário.
* Consultas podem ser canceladas ou remarcadas.
* Pacientes possuem histórico de atendimentos.
* A agenda deve impedir conflitos de horários.

---

## ⚙️ Como Executar

### Backend

```bash
cd backend
npm install

npx prisma migrate dev

npm run dev
```

Servidor:

```bash
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install

npm run dev
```

Frontend:

```bash
http://localhost:5173
```

---

## 📈 Objetivo de Aprendizado

Este projeto é utilizado como laboratório prático para estudo de:

* Engenharia de Software
* Arquitetura Backend
* TypeScript
* PostgreSQL
* Prisma ORM
* Autenticação e Segurança
* Testes Automatizados
* Docker
* Inteligência Artificial aplicada a sistemas web

---

## 👨‍💻 Autor

Pedro Silva

Estudante de Engenharia de Software

Foco em Back-End, Arquitetura de Software e Inteligência Artificial.

LinkedIn:
https://www.linkedin.com/in/pedro-silva-576327125
