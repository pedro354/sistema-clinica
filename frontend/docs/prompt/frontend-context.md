# Frontend Context

## Objetivo

Este documento fornece o contexto permanente necessário para implementação do frontend do Clinic System.

Todas as Sprints deverão considerar este documento como referência antes de qualquer implementação.

---

# Projeto

Nome: Clinic System

O Clinic System é um SaaS para gestão de clínicas e consultórios de psicologia.

O produto é destinado a psicólogos autônomos, recém-formados e clínicas que desejam organizar pacientes, consultas e disponibilidade de agenda.

Toda implementação deverá transmitir:

- acolhimento;
- confiança;
- simplicidade;
- organização;
- profissionalismo.

---

# Stack

A aplicação utiliza:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React

Não adicionar novas dependências sem necessidade.

---

# Arquitetura

A implementação deverá respeitar a arquitetura existente do projeto.

Estrutura principal:

```text
src/
│
├── assets/
├── components/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── global.css
```

---

# Componentização

Toda interface deverá ser construída utilizando componentes reutilizáveis.

Evite componentes monolíticos.

Sempre que necessário, extraia componentes menores com responsabilidade única.

---

# Design System

Toda implementação deverá seguir o Design System definido para o projeto.

Não alterar:

- identidade visual;
- paleta de cores;
- tipografia;
- espaçamentos;
- componentes;
- comportamento visual.

---

# Responsividade

Toda interface deverá funcionar corretamente em:

- Mobile
- Tablet
- Desktop

Nenhum elemento poderá quebrar o layout.

---

# Convenções

Durante o desenvolvimento:

- utilizar TypeScript;
- não utilizar `any`;
- utilizar Tailwind CSS para estilização;
- manter código limpo;
- evitar duplicação de código;
- utilizar nomes claros para componentes;
- seguir boas práticas do React.

---

# Estrutura dos Componentes

Sempre que criar um componente:

- manter responsabilidade única;
- separar lógica da interface quando necessário;
- facilitar reutilização;
- manter organização consistente com a arquitetura existente.

---

# Objetivo das Sprints

Cada Sprint implementará apenas uma parte da interface.

Não desenvolver funcionalidades fora do escopo definido em cada Sprint.

As decisões arquiteturais e visuais já foram aprovadas e não deverão ser reinterpretadas.

---

# Entrega

Cada Sprint deverá entregar código pronto para integração ao projeto.

A implementação deverá respeitar integralmente este contexto.