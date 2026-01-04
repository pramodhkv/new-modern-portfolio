# Modern Portfolio Website

A modern, interactive portfolio website built with React 19, TypeScript, and TailwindCSS. Features an AI-powered chatbot to help visitors learn about my skills, experience, and projects.

🔗 **Live Demo**: [pramodh-portfolio.vercel.app](https://pramodh-portfolio.vercel.app/)

## ✨ Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark Theme** - Modern dark UI with gradient accents
- **AI Chatbot** - Interactive AI assistant powered by OpenAI GPT-4o-mini
- **Smooth Animations** - Framer Motion-inspired transitions and effects
- **Contact Form** - EmailJS integration for direct communication
- **Project Showcase** - Dynamic project cards with technology tags
- **Skills Section** - Interactive skill visualization

## 🤖 AI Chatbot

An intelligent chatbot that answers questions about my:

- Skills & expertise
- Work experience
- Projects & portfolio
- Education & background
- Availability & contact info

**Features:**

- Conversational AI with context awareness
- Rate limiting (20 questions per session)
- Session persistence
- Markdown formatting support
- Smooth slide-in animations

See [AI_CHATBOT.md](./AI_CHATBOT.md) for detailed documentation.

## 🛠️ Tech Stack

**Frontend:**

- React 19
- TypeScript 5
- Vite 6
- TailwindCSS 3
- Sass
- React Icons

**Backend/API:**

- Vercel Serverless Functions
- OpenAI API (gpt-4o-mini)
- Express (dev server)

**Testing:**

- Vitest
- React Testing Library
- jsdom

**Deployment:**

- Vercel

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pramodhkv/new-modern-portfolio.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Add your OpenAI API key to `.env`:

   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   CHAT_RATE_LIMIT=20
   ```

## 🚀 Development

### Run the development servers

**Option 1: Frontend + API (recommended)**

```bash
# Terminal 1: Start API server
npm run dev:api

# Terminal 2: Start Vite dev server
npm run dev
```

**Option 2: Both servers together**

```bash
npm run dev:full
```

The frontend runs on [http://localhost:5173](http://localhost:5173)  
The API server runs on [http://localhost:3001](http://localhost:3001)

### Available Scripts

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Start Vite dev server (frontend only)               |
| `npm run dev:api`  | Start Express API server for local development      |
| `npm run dev:full` | Start both frontend and API servers                 |
| `npm run build`    | Type-check with TypeScript and build for production |
| `npm run preview`  | Preview production build locally                    |
| `npm test`         | Run Vitest tests                                    |
| `npm run test:ui`  | Run tests with Vitest UI                            |

## 📁 Project Structure

```
new-modern-portfolio/
├── api/                          # Vercel serverless functions
│   ├── chat.ts                   # AI chatbot API endpoint
│   └── tsconfig.json             # TypeScript config for API
├── src/
│   ├── components/               # React components
│   │   ├── AIChatBot/           # AI chatbot feature
│   │   │   ├── ChatButton/      # Floating chat button
│   │   │   ├── ChatModal/       # Chat interface
│   │   │   ├── MessageBubble/   # Message display
│   │   │   └── TypingIndicator/ # Loading animation
│   │   ├── Banner/              # Hero section
│   │   ├── ContactForm/         # Contact form
│   │   ├── Navbar/              # Navigation
│   │   ├── Projects/            # Project showcase
│   │   └── Skills/              # Skills section
│   ├── data/
│   │   └── aiKnowledge.json     # AI chatbot knowledge base
│   ├── assets/                   # Images, fonts, etc.
│   ├── App.tsx                   # Main app component
│   └── index.tsx                 # Entry point
├── dev-server.js                 # Express dev server for API
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # TailwindCSS configuration
└── vercel.json                  # Vercel deployment config
```

## 🎨 Customization

### Update AI Knowledge Base

Edit `src/data/aiKnowledge.json` to customize the chatbot's responses with your:

- Personal information
- Skills and technologies
- Work experience
- Projects
- Education
- Hobbies and interests

### Modify Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'web3-text1': '#7928ca',  // Primary gradient color
  'web3-text2': '#ff0080',  // Secondary gradient color
  'body-bg': '#121212',     // Background color
  'skill-bg': '#151515',    // Card backgrounds
  // ... add your colors
}
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git push origin master
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `OPENAI_API_KEY`
     - `CHAT_RATE_LIMIT` (optional, defaults to 20)

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be live at `your-project.vercel.app`

### Manual Deployment

```bash
vercel --prod
```

## 🧪 Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

## 📄 Documentation

- [AI Chatbot Documentation](./AI_CHATBOT.md) - Detailed chatbot implementation guide
- [CLAUDE.md](./CLAUDE.md) - Development guidelines for AI coding agents
- [GitHub Copilot Instructions](./.github/copilot-instructions.md) - Repository-specific AI agent guidance

## 👤 Author

**Pramodh Kempapura Viswanath**

- Website: [pramodh-portfolio.vercel.app](https://pramodh-portfolio.vercel.app/)
- GitHub: [@pramodhkv](https://github.com/pramodhkv)
- LinkedIn: [Pramodh Kempapura Viswanath](https://www.linkedin.com/in/pramodh-kempapura-viswanath-b1227835/)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- AI powered by [OpenAI](https://openai.com/)
- Hosted on [Vercel](https://vercel.com/)
