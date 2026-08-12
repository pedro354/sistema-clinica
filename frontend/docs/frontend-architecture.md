# Frontend Architecture

## Objetivo

Este documento descreve a arquitetura do frontend do Clinic System.

Seu objetivo é padronizar a organização da aplicação, facilitar a manutenção do código e garantir consistência durante a evolução do projeto.

---

# Estrutura de Diretórios

```
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   └── auth/
│   ├── routes/
│   ├── services/
│   │   └── api/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── global.css
│
├── test/
│
├── docs/
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# Responsabilidades

## assets

Armazena recursos estáticos utilizados pela aplicação.

Exemplos:

- imagens;
- ícones;
- arquivos SVG;
- fontes.

---

## components

Contém componentes reutilizáveis da interface.

Os componentes devem possuir responsabilidade única e ser reutilizados sempre que possível.

---

## contexts

Contém Context Providers utilizados para compartilhamento de estado global da aplicação.

---

## hooks

Contém Custom Hooks responsáveis por reutilizar lógica entre componentes.

---

## layouts

Define estruturas reutilizáveis de páginas.

Um layout representa a organização visual comum entre diferentes telas.

---

## pages

Contém as páginas da aplicação.

Cada diretório representa um domínio funcional da interface.

---

## routes

Responsável pela configuração do roteamento da aplicação.

---

## services

Responsável pela comunicação com serviços externos.

A pasta `api` concentra a configuração das chamadas HTTP.

---

## styles

Contém estilos globais da aplicação.

O Design System deve ser refletido nesta camada.

---

## types

Centraliza tipos e interfaces compartilhadas.

---

## utils

Contém funções utilitárias reutilizáveis que não possuem dependência da interface.

---

## test

Contém testes automatizados da aplicação.

---

# Princípios Arquiteturais

- Separação de responsabilidades.
- Componentização.
- Reutilização de código.
- Organização por domínio.
- Baixo acoplamento.
- Alta coesão.
- Escalabilidade.
- Legibilidade.

---

# Convenções

- Componentes devem possuir responsabilidade única.
- Hooks devem conter apenas lógica reutilizável.
- Utilitários não devem depender de React.
- Tipos compartilhados devem permanecer na pasta `types`.
- Comunicação externa deve ocorrer exclusivamente através de `services`.

---

# Evolução

A arquitetura poderá evoluir conforme novas necessidades surgirem.

Toda alteração estrutural deverá manter compatibilidade com os princípios definidos neste documento.