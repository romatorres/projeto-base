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
