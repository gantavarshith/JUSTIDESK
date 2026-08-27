# AI API Integration Guide

JusticeDesk AI Legal Assistant supports multiple AI service providers. The application automatically detects which service to use based on your configuration.

## Quick Setup

### 1. Copy Environment Variables
```bash
cp .env.example .env.local
```

### 2. Add Your API Key

Choose one of the following services and add your API key to `.env.local`:

## Supported Services

### OpenAI (Recommended)
**Best for:** GPT-3.5-turbo or GPT-4 models, excellent legal context understanding

```env
VITE_AI_SERVICE=openai
VITE_AI_API_KEY=sk-your-api-key-here
VITE_AI_API_ENDPOINT=https://api.openai.com/v1
VITE_AI_MODEL=gpt-3.5-turbo
```

**Get API Key:** https://platform.openai.com/api-keys

**Pricing:** $0.0005 per 1K input tokens, $0.0015 per 1K output tokens

---

### Anthropic Claude
**Best for:** Constitutional understanding, detailed legal analysis

```env
VITE_AI_SERVICE=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
VITE_ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

**Get API Key:** https://console.anthropic.com/

**Pricing:** $3 per 1M input tokens, $15 per 1M output tokens

---

### Google Gemini
**Best for:** Fast responses, cost-effective

```env
VITE_AI_SERVICE=gemini
VITE_GEMINI_API_KEY=your-gemini-api-key-here
VITE_GEMINI_MODEL=gemini-pro
```

**Get API Key:** https://aistudio.google.com/app/apikey

**Pricing:** Free tier available, paid tier at $0.00025 per 1K input tokens

---

## Configuration Details

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_AI_SERVICE` | AI service provider | Yes | `openai` |
| `VITE_AI_API_KEY` | API key for the service | Yes | - |
| `VITE_AI_API_ENDPOINT` | API endpoint URL | Yes | Service-specific |
| `VITE_AI_MODEL` | Model name | Yes | Service-specific |

### How It Works

1. **Auto-Detection**: The app reads environment variables on startup
2. **Configuration Check**: Validates that an API key is provided
3. **Graceful Fallback**: Uses mock service if no API key is configured
4. **Service Routing**: Routes requests to the appropriate API based on service type

### Fallback Behavior

If no API key is configured:
- The chat will use **mock responses** from the embedded knowledge base
- Responses will still be accurate and helpful
- No API charges will be incurred
- A demo mode banner will appear in the chat interface

## Example Configurations

### Using OpenAI GPT-3.5
```env
# .env.local
VITE_AI_SERVICE=openai
VITE_AI_API_KEY=sk-proj-abc123...
VITE_AI_API_ENDPOINT=https://api.openai.com/v1
VITE_AI_MODEL=gpt-3.5-turbo
```

### Using Claude 3 Sonnet
```env
# .env.local
VITE_AI_SERVICE=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-xyz789...
VITE_ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

### Using Gemini
```env
# .env.local
VITE_AI_SERVICE=gemini
VITE_GEMINI_API_KEY=AIzaSyB...
VITE_GEMINI_MODEL=gemini-pro
```

## API Cost Estimation

### Typical Legal Question
- Average input: ~100 tokens (question + system prompt)
- Average output: ~300 tokens (response)

**Cost per question:**
- **OpenAI**: ~$0.0005
- **Anthropic**: ~$0.001
- **Gemini**: ~$0.00008

### For 1000 Daily Questions
- **OpenAI**: ~$1.50/day or ~$45/month
- **Anthropic**: ~$3/day or ~$90/month
- **Gemini**: ~$0.24/day or ~$7/month

## Switching Services

To switch from one service to another:

1. Update `VITE_AI_SERVICE` in `.env.local`
2. Add the new service's API key
3. Restart the development server

The application will automatically use the new service on the next chat message.

## Monitoring Usage

### OpenAI
- Dashboard: https://platform.openai.com/account/billing/overview

### Anthropic
- Dashboard: https://console.anthropic.com/

### Gemini
- Console: https://aistudio.google.com/

## Troubleshooting

### Getting "Demo Mode" Message

**Issue**: Chat shows "Using mock responses"

**Solution**: 
1. Check that `VITE_AI_API_KEY` is set in `.env.local`
2. Verify the API key is valid and not expired
3. Make sure the correct `VITE_AI_SERVICE` is specified
4. Restart the development server

### API Key Not Working

**Issue**: Requests fail with authentication errors

**Solution**:
1. Verify the API key format (should start with `sk-` for OpenAI)
2. Check that the key has appropriate permissions
3. Ensure the service account/plan is active
4. Check browser console for error messages

### Rate Limiting

**Issue**: Requests start failing after many questions

**Solution**:
1. Check API rate limits for your plan
2. Implement request throttling (already built-in with 800ms delay)
3. Consider upgrading to a higher tier plan

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use environment-specific keys** - Different keys for dev/staging/prod
3. **Rotate keys regularly** - Change API keys every 90 days
4. **Monitor usage** - Check API dashboards for unusual activity
5. **Use API restrictions** - Limit keys to specific endpoints/IPs if possible

## Support

For API-specific issues:
- **OpenAI**: https://community.openai.com/
- **Anthropic**: https://support.anthropic.com/
- **Gemini**: https://ai.google.dev/

For JusticeDesk issues: Create a GitHub issue in the repository
