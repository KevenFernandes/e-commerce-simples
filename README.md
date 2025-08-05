# E-commerce Simples 

Um e-commerce simples construído com **Next.js** e **React**, com painéis de usuário e administrador, carrinho de compras e gestão de produtos. O back-end se conecta com um banco de dados **MySQL** local, utilizando o **Drizzle ORM**.

---

### Funcionalidades

**Painel do Cliente**
* **Autenticação:** Login e cadastro de novos usuários.
* **Gerenciamento de Perfil:** Visualização e edição de informações pessoais.
* **Carrinho de Compras:** Adicionar e remover produtos do catálogo.

**Painel do Administrador**
* **Gestão dos Produtos:** Criar, editar e remover produtos do catálogo.
* **Gerenciamento de Usuários:** Editar permissões (`roles`) dos usuários.

---

### Tecnologias Utilizadas

* **Front-end & Back-end:** React e Next.js
* **Banco de Dados:** MySQL
* **ORM:** Drizzle ORM
* **Validação de Dados:** Zod
* **Autenticação:** Bcryptjs (para hashing de senhas)

---


Configure o banco de dados no arquivo `.env.local` seguindo o exemplo do `.env.local-example`.

---

O método de pagamento ainda não foi finalizado.
