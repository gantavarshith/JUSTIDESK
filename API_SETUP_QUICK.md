# 🔌 API Integration Setup Instructions

Your JusticeDesk AI Legal Assistant is now ready to connect with real AI services!

## What You Can Do Now

✅ **Mock Mode** - Works out of the box with embedded legal knowledge
✅ **Real AI** - Connect OpenAI, Anthropic Claude, or Google Gemini for more powerful responses

## Quick Start (Choose One)

### Option 1: Using OpenAI (Recommended)

1. Get an API key from https://platform.openai.com/api-keys
2. Open `.env.local` in the project root
3. Add your key:
   ```
   VITE_AI_SERVICE=openai
   VITE_AI_API_KEY=sk-your-api-key-here
   VITE_AI_API_ENDPOINT=https://api.openai.com/v1
   VITE_AI_MODEL=gpt-3.5-turbo
   ```
4. Restart the dev server (`npm run dev`)

### Option 2: Using Anthropic Claude

1. Get an API key from https://console.anthropic.com/
2. Add to `.env.local`:
   ```
   VITE_AI_SERVICE=anthropic
   VITE_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   VITE_ANTHROPIC_MODEL=claude-3-sonnet-20240229
   ```
3. Restart dev server

### Option 3: Using Google Gemini

1. Get an API key from https://aistudio.google.com/app/apikey
2. Add to `.env.local`:
   ```
   VITE_AI_SERVICE=gemini
   VITE_GEMINI_API_KEY=your-gemini-api-key-here
   VITE_GEMINI_MODEL=gemini-pro
   ```
3. Restart dev server

## Important Notes

⚠️ **`.env.local` is in `.gitignore`** - Your keys won't be committed to git
⚠️ **Never commit API keys** - Always use `.env.local` for sensitive data
✅ **Free alternatives** - Gemini has a free tier available

## How the System Works

1. **Auto-Detection**: App reads `VITE_AI_SERVICE` and loads the corresponding API key
2. **Fallback Mode**: If no API key is configured, uses mock responses
3. **Real Responses**: When configured, sends questions to the actual AI service
4. **Smart Routing**: Response format adapted for each service's API

## Verify It's Working

1. Open the chat page (AI Legal Assistant in sidebar)
2. Look at the status badge below the title:
   - 🟢 Shows API service name and model = Real API connected
   - 🟡 Shows "Demo Mode" = Using mock responses
3. Ask a legal question and you'll see responses!

## Pricing Summary (for reference)

| Service | Cost | Speed | Best For |
|---------|------|-------|----------|
| OpenAI | ~$0.0005/question | Fast | Balanced |
| Claude | ~$0.001/question | Medium | Legal analysis |
| Gemini | ~$0.00008/question | Very Fast | Budget-friendly |

## Cost Control Tips

- Average question costs $0.0005-0.001 (less than a penny!)
- 1000 questions/month = ~$0.50-$1.50
- Set usage alerts in your API provider's dashboard
- Monitor the API dashboard regularly

## Troubleshooting

**Still seeing "Demo Mode"?**
- Check `.env.local` exists
- Verify `VITE_AI_API_KEY` is set
- Restart dev server (critical!)
- Check browser console for errors

**Getting API errors?**
- Verify API key is valid (check API provider dashboard)
- Ensure plan is active and not rate-limited
- Check internet connection

## Next Steps

1. ✅ Choose an AI service provider
2. ✅ Get an API key
3. ✅ Add it to `.env.local`
4. ✅ Restart dev server
5. ✅ Open chat and start asking questions!

For detailed setup guide, see `API_SETUP.md`

Happy chatting! 🚀
