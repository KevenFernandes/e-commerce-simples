# E-commerce Simples

Um e-commerce simples construído com **Next.js** e **React**, com painéis de usuário e administrador, carrinho de compras e gestão de produtos. O back-end se conecta com um banco de dados **MySQL** local, utilizando o **Drizzle ORM**.

---

### Funcionalidades

**Painel do Cliente**

- **Autenticação:** Login e cadastro de novos usuários.
- **Gerenciamento de Perfil:** Visualização e edição de informações pessoais.
- **Carrinho de Compras:** Adicionar e remover produtos do catálogo.

**Painel do Administrador**

- **Gestão dos Produtos:** Criar, editar e remover produtos do catálogo.
- **Gerenciamento de Usuários:** Editar permissões (`roles`) dos usuários.

---

### Tecnologias Utilizadas

- **Front-end & Back-end:** React e Next.js
- **Banco de Dados:** MySQL
- **ORM:** Drizzle ORM
- **Validação de Dados:** Zod
- **Autenticação:** Bcryptjs (para hashing de senhas)

---

Configure o banco de dados no arquivo `.env.local` seguindo o exemplo do `.env.local-example`.

---

O método de pagamento ainda não foi finalizado.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
