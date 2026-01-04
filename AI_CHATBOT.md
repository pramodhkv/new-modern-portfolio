# AI Chatbot Implementation

## Overview

An AI-powered chatbot has been integrated into the portfolio to allow visitors to ask questions about your skills, experience, projects, and interests.

## Features

✅ **Floating Chat Button** - Bottom-center positioned, animated button
✅ **Slide-in Modal** - Smooth right-side slide animation with dark theme
✅ **Conversation Memory** - Maintains context within the session
✅ **Rate Limiting** - 10 questions per session (24-hour window)
✅ **Session Persistence** - Messages persist until page refresh/close
✅ **Typing Indicator** - Visual feedback while AI responds
✅ **Error Handling** - Graceful error messages and retry capability
✅ **Responsive Design** - Works on mobile and desktop
✅ **Dark Theme** - Matches portfolio design with gradient accents

## Architecture

### Components

```
src/components/AIChatBot/
├── index.tsx              # Main orchestrator component
├── ChatButton/
│   └── index.tsx         # Floating button (bottom-center)
├── ChatModal/
│   └── index.tsx         # Chat interface with all logic
├── MessageBubble/
│   └── index.tsx         # User/AI message display
└── TypingIndicator/
    └── index.tsx         # Animated typing dots
```

### API

```
api/
└── chat.ts               # Vercel serverless function
                          # - OpenAI gpt-4o-mini integration
                          # - Server-side rate limiting
                          # - CORS handling
```

### Data

```
src/data/
└── aiKnowledge.json      # Your personal information (skills, projects, etc.)
```

## Configuration

### Environment Variables

Required in `.env`:

```bash
OPENAI_API_KEY=sk-your-api-key-here
CHAT_RATE_LIMIT=20  # Optional, defaults to 20
```

### Knowledge Base

Update `src/data/aiKnowledge.json` with your:

- Personal info (name, title, bio)
- Skills (frontend, backend, tools, languages)
- Experience (companies, roles, duration)
- Projects (name, description, technologies)
- Education
- Hobbies & interests
- Contact information
- Fun facts
- Availability status

## Usage

### Development

```bash
# Start Vercel dev server (handles frontend + API)
vercel dev

# Or use standard Vite dev (frontend only, no API)
npm run dev
```

### Production

Deploy to Vercel:

```bash
vercel --prod
```

Environment variables are configured in Vercel dashboard.

## How It Works

1. **User clicks chat button** → Modal slides in from right
2. **User types question** → Sent to `/api/chat` with session history
3. **API validates rate limit** → Checks localStorage count
4. **OpenAI processes** → Uses knowledge base as context
5. **Response displayed** → AI message appears in chat
6. **Session persists** → Messages saved to sessionStorage
7. **On refresh** → History cleared, rate limit persists (24h)

## Rate Limiting

- **Client-side**: localStorage tracks questions per session
- **Server-side**: In-memory store (resets on function cold start)
- **Limit**: 10 questions per 24 hours
- **Display**: Shows remaining questions in header
- **Behavior**: Input disabled when limit reached

## Storage

- **sessionStorage**: Chat messages (cleared on tab close/refresh)
- **localStorage**: Rate limit count & reset timestamp (persists 24h)
- **Session ID**: Generated per session, used for server-side tracking

## Styling

Uses existing design tokens from `tailwind.config.js`:

- `web3-text1` (#7928ca) & `web3-text2` (#ff0080) for gradients
- `body-bg` (#121212) for modal background
- `skill-bg` (#151515) for message bubbles
- Follows TailwindCSS utility-first approach
- Responsive breakpoints (mobile-first)

## Future Enhancements

Potential improvements:

- [ ] Export conversation as text/PDF
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Suggested questions/prompts
- [ ] Admin analytics dashboard
- [ ] Migrate knowledge base to CMS (e.g., Payload CMS)
- [ ] Add conversation ratings/feedback
- [ ] Stream responses for better UX

## Testing

### Test the API manually:

```bash
curl -X POST http://localhost:5173/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "messages": [
      {"role": "user", "content": "What are your skills?"}
    ]
  }'
```

### Expected response:

```json
{
  "message": "Based on the knowledge base...",
  "remaining": 9
}
```

## Troubleshooting

### API not responding

- Ensure `.env` file exists with valid `OPENAI_API_KEY`
- Check `vercel dev` is running (not just `npm run dev`)
- Verify OpenAI API key has credits

### Rate limit not working

- Check localStorage in browser DevTools
- Clear localStorage to reset: `localStorage.clear()`

### Messages not persisting

- Check sessionStorage in browser DevTools
- Ensure no errors in console blocking storage

### Build errors

- Run `npm run build` to check TypeScript compilation
- Verify all imports are correct

## Security Notes

⚠️ **IMPORTANT**:

- `.env` file is gitignored - never commit API keys
- API key is only used server-side (safe)
- Client-side rate limiting can be bypassed (server validates too)
- Knowledge base is public (only include shareable info)

## Cost Optimization

OpenAI gpt-4o-mini costs:

- ~$0.00015 per request (with 1000 max tokens)
- 10 questions/user ≈ $0.0015 per user
- 1000 users ≈ $1.50

Rate limiting helps control costs.
