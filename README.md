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

## ABOUT THE SYSTEM

- Resumo do Sitema e Recursos Reutilizáveis

## 1. Gerenciamento de Estado com Zustand

Implementamos um store centralizado com Zustand ( useUserStore ) que combina autenticação e permissões:

### Principais recursos do useUserStore

- Estado do usuário : user , isLoading , isAuthenticated
- Permissões : hasPermission(permission) - verifica se o usuário tem uma permissão específica
- Ações : setUser() , setLoading() , logout()
- Persistência : O estado é automaticamente salvo no localStorage

## 2. Componente Reutilizável UserForm

Criamos um componente de formulário reutilizável para operações relacionadas a usuários

## 3. Controle de Permissões com PermissionGate

Implementamos um componente para controle declarativo de permissões

## 4. Proteção de Rotas com HOC

Implementamos um Higher-Order Component para proteger rotas no lado do cliente

## 5. Middlewares para APIs

Implementamos middlewares para proteger rotas de API
