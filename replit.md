# Persona — AI Companions App

An unbranded iOS 26-native Expo mobile app inspired by Character.ai's UX. Full-stack with streaming AI chat via OpenAI (Replit AI Integrations), NativeTabs with liquid glass, and 18 pre-built AI persona characters.

## Architecture

**Monorepo** (pnpm workspaces):
- `artifacts/mobile/` — Expo React Native app (iOS/Android/Web)
- `artifacts/api-server/` — Express backend with streaming OpenAI chat
- `lib/integrations-openai-ai-server/` — OpenAI client using Replit AI Integration env vars

## Key Features
- 18 AI personas across 6 categories (Philosophy, Science, Creative, Wellness, Adventure, Comedy)
- Streaming SSE chat with real-time token delivery
- iOS 26 NativeTabs + liquid glass (BlurView fallback)
- Conversation persistence via AsyncStorage
- Dark theme: background #0A0A0A, violet #7C3AED accent, card #1C1C1E

## Routes / Ports
| Service | Port | Path |
|---------|------|------|
| Expo (Metro) | 18115 | `/` |
| API Server | 8080 | `/api` |

## API Endpoints
- `GET /api/healthz` — health check
- `POST /api/chat` — streaming SSE chat, body: `{ messages: [{role, content}] }`

## Mobile App Structure
```
artifacts/mobile/
  app/
    _layout.tsx           # Root layout with ChatsProvider + fonts
    (tabs)/
      _layout.tsx         # NativeTabs with liquid glass + SF Symbols
      index.tsx           # Discover tab
      chats.tsx           # Chats list tab
      search.tsx          # Search tab
      profile.tsx         # Profile tab
    character/[id].tsx    # Character detail (modal)
    chat/[id].tsx         # Chat screen with SSE streaming
  components/
    CharacterAvatar.tsx
    CharacterCard.tsx
    FeaturedBanner.tsx
    CategoryPill.tsx
    ChatListItem.tsx
    MessageBubble.tsx
    TypingIndicator.tsx
    SearchBar.tsx
  context/ChatsContext.tsx  # AsyncStorage-backed conversation state
  data/characters.ts        # 18 personas with system prompts + greetings
  lib/api.ts                # getApiUrl() helper
  constants/colors.ts       # Dark theme color tokens
```

## AI Integration
- Provider: OpenAI via Replit AI Integration
- Model: `gpt-5.2`, max_completion_tokens: 8192
- Env vars: `AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY`
- Streaming via SSE; client uses `expo/fetch` + ReadableStream reader

## Dev Notes
- Inverted FlatList for chat (newest at bottom)
- `react-native-keyboard-controller` KeyboardAvoidingView
- `useSafeAreaInsets()` for header/footer padding
- Web gets +67px top / +34px bottom padding adjustments
- Character state captured before async to avoid stale closure bugs
- Assistant message added on first chunk only, then content updated in-place
- Conversation saved to AsyncStorage only after streaming completes
