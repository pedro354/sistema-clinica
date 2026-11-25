# 🧠 Clinic System — Sistema de Gestão para Clínicas Psicológicas

Sistema full stack desenvolvido para o gerenciamento de clínicas psicológicas, permitindo centralizar informações e administrar pacientes, profissionais e atendimentos.

O projeto foi desenvolvido com foco em Engenharia de Software, arquitetura em camadas, segurança na autenticação, integração entre frontend e backend e persistência de dados relacionais.

🌐 **Aplicação em produção:** [Clinic System](https://sistema-clinica-jet.vercel.app/)

---

## 🎯 Objetivos do Projeto

- Centralizar o gerenciamento de informações da clínica.
- Facilitar a administração de pacientes e profissionais.
- Organizar consultas e agendamentos.
- Evitar conflitos de horários.
- Aplicar princípios de arquitetura de software.
- Implementar mecanismos de autenticação e proteção de dados.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### Ferramentas e Infraestrutura
- Git e GitHub
- ESLint
- Prettier
- Dotenv
- Vercel
- Render
- Neon Database

---

## 🔐 Segurança

A aplicação possui mecanismos de autenticação e proteção de acesso, implementados tanto no backend quanto na comunicação com o frontend.

### Autenticação
- Autenticação baseada em JSON Web Token (JWT).
- Assinatura de tokens utilizando algoritmo HS256.
- Expiração de tokens configurada para uma hora.
- Validação do token em rotas protegidas.
- Recuperação da sessão autenticada.

### Proteção de Credenciais
- Senhas armazenadas utilizando hash com bcrypt.
- Comparação segura de senhas durante o login.
- Credenciais e segredos mantidos em variáveis de ambiente.
- Segredo de assinatura JWT restrito ao backend.

### Proteção de Cookies e Sessão
- Cookie de autenticação configurado com `HttpOnly`.
- Atributo `Secure` habilitado em produção.
- Configuração `SameSite=None` em produção para permitir comunicação entre origens.
- Envio de credenciais nas requisições HTTP.
- Cookie configurado com caminho global e validade limitada.

### Controle de Acesso
- Middleware responsável pela validação da autenticação.
- Proteção das rotas privadas da API.
- Separação entre endpoints públicos e endpoints que exigem autenticação.

---

## 📋 Funcionalidades e Recursos

- Interface desenvolvida com React e TypeScript.
- Integração entre frontend e API REST.
- Autenticação e gerenciamento de sessão.
- Cadastro e autenticação de usuários.
- Proteção de rotas no backend.
- Persistência de dados com PostgreSQL.
- Integração com Prisma ORM.
- Organização do backend em camadas.
- Comunicação HTTP utilizando Axios.
- Configuração de ambientes de desenvolvimento e produção.

---

## 🏗️ Arquitetura do Projeto

O backend utiliza arquitetura em camadas, separando responsabilidades para facilitar a manutenção e evolução da aplicação.

```text
clinic-system/
│
├── frontend/
│   └── src/
│
├── backend/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middlewares/
│       └── config/
│
└── README.md
```

### Organização das Responsabilidades

- **Controllers:** recebem e tratam as requisições HTTP.
- **Services:** concentram as regras de negócio.
- **Repositories:** responsáveis pelo acesso e persistência dos dados.
- **Routes:** definem os endpoints da aplicação.
- **Middlewares:** executam validações e controles intermediários.
- **Config:** centraliza configurações da aplicação.

---

## ⚙️ Como Executar Localmente

### Pré-requisitos

- Node.js
- PostgreSQL
- npm

### Backend

```bash
cd backend
npm install
```

Configure o arquivo `.env.development` com as variáveis necessárias:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
JWT_SECRET="SUA_CHAVE_LOCAL"
```

Execute as migrações:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

Backend:

```text
http://localhost:10000
```

### Frontend

```bash
cd frontend
npm install
```

Configure o arquivo `.env.development`:

```env
VITE_API_URL=http://localhost:10000/api
```

Inicie a aplicação:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## ☁️ Deploy e Infraestrutura

A aplicação está publicada utilizando serviços separados para frontend, backend e banco de dados.

| Componente | Tecnologia |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Banco de dados | Neon PostgreSQL |
| Versionamento | GitHub |

---

## 📚 Conhecimentos Aplicados

Este projeto permitiu aplicar conhecimentos relacionados a:

- Engenharia de Software.
- Desenvolvimento Full Stack.
- Arquitetura de aplicações.
- APIs REST.
- TypeScript e Node.js.
- React e gerenciamento de estado.
- Modelagem de banco de dados.
- PostgreSQL e Prisma ORM.
- Autenticação e segurança.
- Gerenciamento de sessões.
- Integração e deploy de aplicações.

---

## 👨‍💻 Autor

**Pedro Silva**

Estudante de Engenharia de Software | Desenvolvedor Full Stack

Interesses em desenvolvimento Back-End, arquitetura de software e Inteligência Artificial.

- **GitHub:** [@pedro354](https://github.com/pedro354)
- **LinkedIn:** [Pedro Silva](https://www.linkedin.com/in/pedro-silva-576327125/)
- **Aplicação:** [Clinic System](https://sistema-clinica-jet.vercel.app/)

---

<p align="center">
  Desenvolvido por Pedro Silva ❤️
</p>
