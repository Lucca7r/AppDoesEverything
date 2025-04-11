<h1 align="center">Documentação do Projeto - Does Everything</h1>
<br>
<br>

# 🔹 Does Everything: <br>
<br>
<p>
Aplicativo multifuncional desenvolvido para Android com o objetivo de demonstrar diversas funcionalidades essenciais em um ambiente de projeto mobile. O app conta com calculadora básica, navegador web interno, jogo da velha para dois jogadores, lista de tarefas com persistência local (SQLite) e um recurso extra de mapa que exibe a localização atual do usuário.<br></p>
<br>

# 📁 Estrutura de Pastas

<strong> does_everything/</strong><br>
│<br>
├── <strong>App.tsx  </strong>                   # Ponto de entrada da aplicação<br>
├── <strong>package.json </strong>               # Informações e dependências do projeto<br>
├── <strong>tsconfig.json </strong>              # Configuração do TypeScript<br>
├── <strong>.gitignore   </strong>               # Arquivos ignorados no controle de versão<br>
│<br>
└── <strong>src/ </strong>                    # Código-fonte principal do app<br>
    ├── <strong>screens/ </strong>               # Telas principais da aplicação<br>
    │   ├── <strong>HomeScreen.tsx</strong>           # Tela inicial com menu de funcionalidades<br>
    │   ├── <strong>CalculatorScreen.tsx</strong>      # Calculadora básica<br>
    │   ├── <strong>BrowserScreen.tsx</strong>         # Navegador interno<br>
    │   ├── <strong>TicTacToeScreen.tsx</strong>       # Jogo da velha<br>
    │   ├── <strong>TaskListScreen.tsx</strong>        # Lista de tarefas com SQLite<br>
    │   └── <strong>MapScreen.tsx</strong>             # Mapa com localização atual<br>
    ├── <strong>components/  </strong>           # Componentes reutilizáveis<br>
    ├── <strong>styles/    </strong>              # Estilos separados por tela<br>
    └── <strong>navigation/   </strong>           # Configuração de navegação entre telas<br>
<br>
# 🧬 Tecnologias utilizadas
<strong>- Tecnologia</strong> | Função<br></strong>
<strong>React Native</strong> | Framework para desenvolvimento mobile multiplataforma<br>
<strong>Expo</strong> | Ambiente simplificado para desenvolvimento React Native<br>
<strong>TypeScript</strong> | Superset de JavaScript com tipagem estática<br>
<strong>VS Code</strong> | Editor de código<br>
<strong>Node.js</strong> | Runtime JS utilizado pelo Expo<br>
<strong>Git/GitHub</strong> | Versionamento de código<br>
<strong>SQLite</strong> | Banco de dados local para persistência das tarefas<br>
<strong>React Native Maps</strong> | Mapa interativo com marcador de localização<br>
<strong>Expo Location</strong> | API para obter a localização do dispositivo<br>
<br>
# ⚖️ Funcionalidade atual

- Tela inicial com navegação entre funcionalidades
- Calculadora funcional com operações básicas (+, -, *, /)
- Exibição do resultado via modal estilizado
- Teclado responsivo com fechamento ao tocar fora dos campos
- Tela "Me Mostra no Mapa" com permissão de localização e marcador do usuário
- Projeto com estilos organizados em arquivos separados (ex: CalculatorScreen.styles.ts)

# ⚙️ Ambiente de Execução
O projeto é executado com Expo Go no celular ou emulador.

Inicialização do app via terminal com:
```bash
npx expo start
```

# 📝 Observações
- Funcionalidades pendentes: Jogo da Velha, Lista de Tarefas com SQLite, Navegador interno
- Toda a estrutura está em TypeScript, com navegação já implementada usando React Navigation
- O código segue padrão modular, com separação clara por responsabilidade
- Projeto universitário desenvolvido por Lucas (GitHub: [lucca7r](https://github.com/lucca7r)) e Luan (GitHub: [Luan_Medrado8](https://github.com/LuanMedrado8))

