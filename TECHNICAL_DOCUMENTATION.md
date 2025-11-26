# Documentação Técnica - Pluga Dev Challenge Jr

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Arquitetura e Estrutura](#arquitetura-e-estrutura)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Componentes](#componentes)
5. [Hooks Customizados](#hooks-customizados)
6. [Tipos e Interfaces](#tipos-e-interfaces)
7. [Fluxo de Dados](#fluxo-de-dados)
8. [Testes](#testes)
9. [Configurações](#configurações)
10. [Como Executar](#como-executar)

---

## Visão Geral do Projeto

### Objetivo
Desenvolver uma aplicação web que exibe uma listagem paginada de ferramentas de integração (apps) da Pluga, com funcionalidades de busca, visualização de detalhes em modal e histórico de ferramentas visualizadas.

### Requisitos Principais
- ✅ Listagem de apps em grid paginado (12 apps por página)
- ✅ Barra de busca com filtro em tempo real
- ✅ Modal com detalhes do app selecionado
- ✅ Histórico das últimas ferramentas visualizadas
- ✅ Testes automatizados
- ✅ Código bem estruturado e legível

### Requisitos Técnicos
- React 18+
- TypeScript
- Vitest + Testing Library para testes
- TailwindCSS para estilos
- Vite como bundler

---

## Arquitetura e Estrutura

### Organização de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── __tests__/      # Testes dos componentes
│   │   ├── AppCard.test.tsx
│   │   ├── Pagination.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   └── AppModal.test.tsx
│   ├── AppCard.tsx     # Card individual de um app
│   ├── AppModal.tsx    # Modal com detalhes do app
│   ├── NavLink.tsx     # Link de navegação
│   ├── Pagination.tsx  # Componente de paginação
│   ├── SearchBar.tsx   # Barra de busca
│   └── ui/            # Componentes UI do shadcn/ui
├── hooks/             # Hooks customizados React
│   ├── useRecentApps.ts
│   └── use-mobile.tsx
├── lib/              # Utilidades e helpers
│   └── utils.ts
├── pages/            # Páginas/Views da aplicação
│   ├── Index.tsx     # Página principal
│   └── NotFound.tsx  # Página 404
├── types/            # TypeScript interfaces e tipos
│   └── app.ts
├── App.tsx           # Componente raiz
├── main.tsx          # Ponto de entrada
└── index.css         # Estilos globais

public/               # Arquivos estáticos

Configuration Files:
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
└── .env             # Variáveis de ambiente
```

### Padrão de Organização

**Componentes**: Cada componente principal tem sua própria pasta com testes associados.

**Separação de Responsabilidades**: 
- Componentes focam apenas em renderização
- Hooks customizados gerenciam lógica de estado
- Types definem interfaces de dados
- Utils contêm funções auxiliares puras

---

## Stack Tecnológico

### Core
- **React 18**: Library de UI
- **TypeScript**: Type-safety
- **Vite**: Build tool moderno

### UI e Estilos
- **TailwindCSS**: Framework CSS utility-first
- **shadcn/ui**: Componentes UI acessíveis baseados em Radix UI
- **Lucide React**: Ícones SVG
- **Radix UI**: Primitivos para componentes acessíveis

### Data Fetching
- **@tanstack/react-query**: Gerenciamento de estado de servidor

### Formulários
- **React Hook Form**: Gerenciamento de formulários
- **@hookform/resolvers**: Validação de schemas

### Testing
- **Vitest**: Test runner similar ao Jest
- **@testing-library/react**: Testes de componentes
- **@testing-library/user-event**: Simulação de eventos do usuário
- **@testing-library/jest-dom**: Matchers customizados

### Desenvolvimento
- **ESLint**: Linting de código
- **PostCSS**: Processamento de CSS

---

## Componentes

### AppCard.tsx
**Responsabilidade**: Renderizar um card individual de um app

**Props**:
```typescript
interface AppCardProps {
  app: App;
  onClick: () => void;
}
```

**Features**:
- Exibe ícone, nome e cor do app
- Lazy loading de imagens
- Efeito hover para interatividade
- Clicável para abrir modal

**Exemplo de Uso**:
```tsx
<AppCard app={mockApp} onClick={() => handleAppClick(app)} />
```

---

### SearchBar.tsx
**Responsabilidade**: Input de busca com filtro em tempo real

**Props**:
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
```

**Features**:
- Input controlado
- Ícone de lupa
- Placeholder descritivo
- Limpa busca ao resetar

---

### Pagination.tsx
**Responsabilidade**: Navegação entre páginas

**Props**:
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Features**:
- Botões Previous/Next
- Números das páginas visíveis
- Desabilita botões nas extremidades
- Destaca página atual
- Mostra até 5 páginas por vez

---

### AppModal.tsx
**Responsabilidade**: Exibir detalhes completos de um app em modal

**Props**:
```typescript
interface AppModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  recentApps: App[];
  onRecentAppClick: (app: App) => void;
}
```

**Features**:
- Modal com backdrop escuro
- Exibe nome, descrição e ícone do app
- Botão "Ver integrações" que abre link em nova aba
- Seção "Últimas ferramentas visualizadas"
- Grid 3 colunas de apps recentes

---

### NavLink.tsx
**Responsabilidade**: Link de navegação reutilizável

---

## Hooks Customizados

### useRecentApps.ts
**Responsabilidade**: Gerenciar histórico de apps visualizados no localStorage

**API**:
```typescript
const { recentApps, addRecentApp } = useRecentApps();
```

**Features**:
- Persiste dados no localStorage
- Limita a 4 apps recentes (configurável via `VITE_MAX_RECENT_APPS`)
- Impede duplicatas (move app para o topo se já existe)
- Sincronização automática com alterações do localStorage

**Implementação**:
- Usa `useEffect` para sincronizar com localStorage
- Retorna array de apps em ordem cronológica (mais recente primeiro)

---

### use-mobile.tsx
**Responsabilidade**: Detectar se a visualização é mobile

**Uso**: Para responsividade de componentes

---

## Tipos e Interfaces

### App Interface
```typescript
interface App {
  app_id: string;      // ID único do app
  name: string;        // Nome da ferramenta
  color: string;       // Cor hexadecimal
  icon: string;        // URL do ícone
  link: string;        // Link para a página do app
}
```

---

## Fluxo de Dados

### Fluxo Geral da Aplicação

```
1. Carregamento Inicial
   └─ Index.tsx carrega apps via React Query
      └─ fetchApps() → GET pluga.co/ferramentas_search.json
         └─ Armazena em cache do React Query

2. Busca
   SearchBar onChange → setSearchQuery
   └─ useMemo recalcula filteredApps
      └─ Reseta currentPage para 1
         └─ Pagina apps filtrados (12 por página)

3. Paginação
   Pagination onClick → setCurrentPage
   └─ slice(startIndex, endIndex) seleciona apps visíveis
      └─ Re-renderiza grid com novos apps

4. Clique em Card
   AppCard onClick → handleAppClick(app)
   ├─ setSelectedApp(app)
   ├─ setIsModalOpen(true)
   └─ addRecentApp(app) → localStorage atualizado

5. Modal de Recentes
   AppModal mostra recentApps do hook
   └─ Clique em recente → handleRecentAppClick(app)
      └─ Atualiza selectedApp e move para topo dos recentes
```

### Ciclo de Vida de um App

```
1. Fetch: App vem da API em arraysApps
2. Filter: Se há searchQuery, filtra por nome
3. Paginate: Seleciona 12 apps da página atual
4. Display: Renderiza no grid
5. Click: Abre modal e salva no histórico
6. Recent: Aparece na seção de recentes por até 4 apps
```

---

## Testes

### Estrutura de Testes

Todos os testes estão em `src/components/__tests__/` seguindo o padrão de nomenclatura `{ComponentName}.test.tsx`.

### AppCard.test.tsx
**Testes Implementados**:
- ✅ Renderiza nome do app
- ✅ Renderiza ícone com alt text correto
- ✅ Chama onClick quando clicado
- ✅ Tem lazy loading no ícone

### SearchBar.test.tsx
**Testes Implementados**:
- ✅ Renderiza input vazio inicialmente
- ✅ Atualiza valor ao digitar
- ✅ Chama onChange com valor digitado
- ✅ Limpa input ao clicar botão limpar
- ✅ Desabilita botão limpar quando vazio

### Pagination.test.tsx
**Testes Implementados**:
- ✅ Não renderiza quando totalPages ≤ 1
- ✅ Renderiza números de páginas corretamente
- ✅ Desabilita botão anterior na primeira página
- ✅ Desabilita botão próximo na última página
- ✅ Chama onPageChange com número correto
- ✅ Navega para página anterior
- ✅ Navega para próxima página
- ✅ Destaca página atual

### AppModal.test.tsx
**Testes Implementados**:
- ✅ Não renderiza quando app é null
- ✅ Renderiza nome e descrição do app
- ✅ Renderiza botão de integração com texto correto
- ✅ Abre link em nova aba quando botão clicado
- ✅ Renderiza seção de recentes quando há apps
- ✅ Não renderiza seção de recentes quando vazia
- ✅ Chama onRecentAppClick quando app recente clicado

### Executar Testes

```bash
# Modo watch
npm test

# Modo run (uma vez)
npx vitest run

# Com UI
npx vitest --ui

# Teste específico
npx vitest run src/components/__tests__/AppCard.test.tsx
```

### Cobertura de Testes

Para gerar relatório de cobertura:
```bash
npx vitest --coverage
```

---

## Configurações

### Variáveis de Ambiente (.env)

```dotenv
VITE_BASE_URL=https://pluga.co
VITE_ITEMS_PER_PAGE=12
VITE_RECENT_APPS_KEY=pluga_recent_apps
VITE_MAX_RECENT_APPS=4
```

**Explicação**:
- `VITE_BASE_URL`: URL base para fetch de dados
- `VITE_ITEMS_PER_PAGE`: Apps por página (paginação)
- `VITE_RECENT_APPS_KEY`: Chave do localStorage para recentes
- `VITE_MAX_RECENT_APPS`: Máximo de apps no histórico

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Features**:
- Alias `@` para imports de `src/`
- Ambiente jsdom para testes (simula browser)
- Setup file para configuração de testes

### tailwind.config.ts

Usa temas customizados com variáveis CSS (light/dark mode ready).

### tsconfig.json

Configuração TypeScript strict mode com path aliases.

### eslint.config.js

Configuração ESLint para React + TypeScript com regras modernas.

---

## Como Executar

### Instalação

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor dev (http://localhost:5173)
npm run dev
```

### Build

```bash
# Build para produção
npm run build

# Build em modo desenvolvimento
npm run build:dev

# Preview do build produção
npm preview
```

### Linting

```bash
# Verificar erros de ESLint
npm run lint

# Corrigir erros automaticamente
npx eslint . --fix
```

### Testes

```bash
# Rodar testes em watch mode
npm test

# Rodar testes uma vez
npx vitest run

# Com UI interativa
npx vitest --ui

# Teste específico
npx vitest run src/components/__tests__/AppCard.test.tsx

# Com cobertura
npx vitest --coverage
```

---

## Pontos Técnicos Importantes

### 1. Paginação Correta
A variável `ITEMS_PER_PAGE` é parseada como número inteiro para evitar comportamento inesperado:
```typescript
const ITEMS_PER_PAGE = parseInt(import.meta.env.VITE_ITEMS_PER_PAGE, 10);
```

### 2. Fetch de Dados com React Query
Usa caching automático e refetch inteligente:
```typescript
const { data: apps = [] } = useQuery({
  queryKey: ["apps"],
  queryFn: fetchApps,
});
```

### 3. Filtro com useMemo
Otimiza performance evitando recálculos desnecessários:
```typescript
const filteredApps = useMemo(() => {
  // Recalcula apenas quando apps ou searchQuery mudam
}, [apps, searchQuery]);
```

### 4. LocalStorage com Hook
Persistência automática de recentes:
```typescript
const { recentApps, addRecentApp } = useRecentApps();
```

### 5. Modal com Portal
O AppModal usa Radix UI Dialog que renderiza em portal para melhor controle Z-index.

### 6. Responsividade
Grid adapta automaticamente:
- 1 coluna em mobile
- 2 colunas em tablet
- 3 colunas em desktop
- 4 colunas em ultra-wide

---

## Performance

### Otimizações Implementadas

1. **Code Splitting Automático**: Vite faz tree-shaking automático
2. **Lazy Loading de Imagens**: `loading="lazy"` nos ícones dos apps
3. **Memoização**: `useMemo` para filtros e paginação
4. **React Query Caching**: Dados em cache automáticamente
5. **CSS Otimizado**: TailwindCSS com PurgeCSS
6. **Componentes Pequenos**: Facilita re-renderização seletiva

---

## Acessibilidade

### Implementações

- Semântica HTML correta
- Labels em inputs
- ARIA labels onde necessário (Radix UI)
- Navegação por teclado (Radix UI)
- Contraste de cores adequado (TailwindCSS)
- Ícones com alt text

---

## Deploy

### Build Otimizado

```bash
npm run build
```

Gera arquivos em `dist/` prontos para:
- Netlify
- Vercel
- GitHub Pages
- Servidores tradicionais

---

## Troubleshooting

### Problema: Paginação não muda apps
**Solução**: Certifique-se que `ITEMS_PER_PAGE` é número, não string.

### Problema: Modal não abre
**Solução**: Verifique se o Dialog mock está correto em `vitest.setup.ts`.

### Problema: Recentes não persistem
**Solução**: Verifique localStorage do browser (DevTools → Application).

### Problema: Testes falham com "document is not defined"
**Solução**: Verifique `vitest.config.ts` tem `environment: 'jsdom'`.

---

## Contribuindo

### Código Style

```typescript
// ✅ Bom
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

// ❌ Ruim
const h = (p: number) => {
  setCurrentPage(p);
};
```

### Testes

Sempre adicionar testes para novos componentes:
```typescript
describe('NovoComponente', () => {
  it('deve fazer algo', () => {
    // Teste aqui
  });
});
```

---

## Referências Úteis

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Vitest Docs](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [TailwindCSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)

---

## Changelog

### v1.0.0 (Release Inicial)
- ✅ Listagem paginada de apps
- ✅ Busca em tempo real
- ✅ Modal de detalhes
- ✅ Histórico de visualizações
- ✅ Suite completa de testes
- ✅ Design responsivo
- ✅ Documentação técnica

---

**Última atualização**: 26 de Novembro de 2025  
**Versão**: 1.0.0  
**Status**: ✅ Em Produção
