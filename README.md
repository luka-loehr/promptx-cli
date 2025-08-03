# promptx

<div align="center">

[![npm version](https://img.shields.io/npm/v/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![npm downloads](https://img.shields.io/npm/dm/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Transform messy developer prompts into meticulously crafted instructions for AI coding assistants**

[Installation](#-installation) • [Quick Start](#-quick-start) • [Features](#-features) • [Models](#-supported-models) • [Documentation](#-documentation)

</div>

---

## 🚀 What is promptx?

**promptx** is a CLI tool that transforms your rough, informal developer prompts into highly structured, comprehensive instructions that produce better results from AI coding assistants like Claude, ChatGPT, Cursor, and GitHub Copilot.

### Before promptx:
```
"make api endpoint for users with auth"
```

### After promptx:
```
Create a RESTful API endpoint for user management with JWT authentication in Node.js/Express.

Technical Requirements:
- Implement GET /api/users endpoint to retrieve all users
- Add pagination support (limit/offset query parameters)
- Include JWT token validation middleware
- Return 401 for invalid/missing tokens
- Filter sensitive fields (password, refresh tokens) from response

Implementation Guidelines:
- Use Express Router for endpoint organization
- Implement proper error handling with try-catch blocks
- Return consistent JSON response format: { success: boolean, data?: any, error?: string }
- Add request validation using express-validator
- Include unit tests using Jest/Supertest

Security Considerations:
- Validate JWT tokens using RS256 algorithm
- Check token expiration and issuer claims
- Implement rate limiting (100 requests per minute)
- Log authentication failures for security monitoring
```

## 📦 Installation

```bash
# Install globally (recommended)
npm install -g @lukaloehr/promptx

# Or use with npx
npx @lukaloehr/promptx
```

**Requirements:**
- Node.js >= 16.0.0
- An API key from your chosen AI provider

## 🎯 Quick Start

### 1. First Run Setup

```bash
promptx
```

On first run, promptx will guide you through:
- Selecting your preferred AI provider
- Choosing a specific model
- Entering your API key

### 2. Basic Usage

```bash
# Interactive mode
promptx

# Direct mode
promptx "create a function to validate email addresses"

# Get help
promptx /help

# Switch models
promptx /model

# See what's new
promptx /whats-new
```

## ✨ Features

### 🤖 Multi-Provider Support
- **OpenAI**: GPT-4o, O4 Mini, GPT-4.1
- **Anthropic**: Claude Opus 4, Sonnet 4, 3.5 Sonnet
- **xAI**: Grok 3, Grok 3 Mini, Grok 4
- **Google**: Gemini 2.5 Flash, 2.0 Flash, 2.5 Pro

### 🎨 Advanced Prompt Engineering
- **Ultra-specific objectives** with clear success criteria
- **Comprehensive technical requirements** with edge case handling
- **Implementation guidelines** with architectural preferences
- **AI-optimized structure** for maximum clarity
- **Security and performance** considerations included

### 💫 Smart Features
- **Thinking models support**: Special handling for O4 Mini, Grok 4, and Gemini 2.5 Pro
- **Real-time streaming**: See refined prompts as they're generated
- **Word wrapping**: Respects terminal boundaries for better readability
- **Conversational mode**: Chat naturally when not requesting prompts
- **Auto-updates**: Get notified when new versions are available

## 🤖 Supported Models

### OpenAI
| Model | Description | Type |
|-------|-------------|------|
| GPT-4o | Most capable general model | Standard |
| O4 Mini | Efficient thinking model | Thinking |
| GPT-4.1 | Latest GPT-4 version | Standard |

### Anthropic
| Model | Description | Type |
|-------|-------------|------|
| Claude Opus 4 | Most powerful, best for coding | Standard |
| Claude Sonnet 4 | Balanced performance | Standard |
| Claude 3.5 Sonnet | Previous generation | Standard |

### xAI
| Model | Description | Type |
|-------|-------------|------|
| Grok 3 | Advanced reasoning | Standard |
| Grok 3 Mini | Cost-efficient | Standard |
| Grok 4 | Intelligent thinking model | Thinking |

### Google
| Model | Description | Type |
|-------|-------------|------|
| Gemini 2.5 Flash | Fast and efficient | Standard |
| Gemini 2.0 Flash | Previous flash version | Standard |
| Gemini 2.5 Pro | Most capable thinking model | Thinking |

*Note: Thinking models show a "Thinking..." spinner during initial processing*

## 📖 Documentation

### Commands

| Command | Description |
|---------|-------------|
| `promptx` | Start interactive mode |
| `promptx "prompt"` | Refine a prompt directly |
| `promptx /help` | Show help information |
| `promptx /model` | Switch between AI models |
| `promptx /whats-new` | See latest updates |
| `promptx reset` | Reset configuration |

### API Keys

Get your API key from:
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/settings/keys
- **xAI**: https://console.x.ai/
- **Google**: https://aistudio.google.com/apikey

### Configuration

Configuration is stored securely using the `conf` package:
- **macOS**: `~/Library/Preferences/promptx-nodejs/`
- **Windows**: `%APPDATA%/promptx-nodejs/`
- **Linux**: `~/.config/promptx-nodejs/`

## 🛠️ Troubleshooting

### Permission Errors During Installation

```bash
# Option 1: Configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @lukaloehr/promptx

# Option 2: Use npx (no installation needed)
npx @lukaloehr/promptx
```

### Common Issues

**"Invalid API key" error**
- Run `promptx reset` and re-enter your API key
- Ensure your API key starts with the correct prefix (sk-, sk-ant-, xai-)

**"Rate limit exceeded" error**
- Wait a few minutes before trying again
- Consider upgrading your API plan

**Model not working as expected**
- Some models have specific requirements (e.g., O4 Mini doesn't support temperature)
- Thinking models may take longer to start responding

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Created by [Luka Loehr](https://github.com/luka-loehr)

Special thanks to all contributors and users who have helped improve promptx!

---

<div align="center">

**Ready to write better prompts?**

```bash
npm install -g @lukaloehr/promptx
```

[Report Bug](https://github.com/luka-loehr/promptx-cli/issues) • [Request Feature](https://github.com/luka-loehr/promptx-cli/issues)

</div>