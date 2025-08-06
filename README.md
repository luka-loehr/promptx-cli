<div align="center">

# promptx

[![npm version](https://img.shields.io/npm/v/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![npm downloads](https://img.shields.io/npm/dm/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Transform messy prompts into structured, clear prompts for AI agents**

Supports the latest AI models from OpenAI, Anthropic, xAI, and Google!

</div>

## 🎉 Version 3.5.1 - Latest Release

**What's New:**
- 🦙 **Ollama Integration** - Full support for local AI models with comprehensive error handling
- 🤖 **5 AI Providers** - OpenAI, Anthropic, xAI, Google Gemini, and Ollama
- 🚀 **15+ Models** - Including GPT-4.1, Claude Opus 4, Grok 4, Gemini 2.5 Pro, and local models
- 💬 **Smart Conversations** - Knows when to chat vs. refine prompts
- ⚡ **Real-time Streaming** - See refined prompts as they're generated
- 🧠 **Thinking Models** - Special handling for O4 Mini, Grok 4, and Gemini Pro
- 🛡️ **Robust Error Handling** - Graceful fallbacks and helpful guidance for all scenarios

---

## 🚀 Quick Install

```bash
npm install -g @lukaloehr/promptx
```

> ⚠️ **Important:** The `-g` flag is required for global installation. Without it, the `promptx` command won't be available in your terminal.

## 🤖 Supported Models

### OpenAI
- **GPT-4o** - Most capable general model
- **O4 Mini** - Thinking model, efficient
- **GPT-4.1** - Latest version

### Anthropic  
- **Claude Opus 4** - Most powerful, world's best coding model
- **Claude Sonnet 4** - Balanced performance, superior reasoning
- **Claude 3.5 Sonnet** - Previous generation

### xAI (Grok)
- **Grok 3** - Advanced reasoning
- **Grok 3 Mini** - Cost-efficient
- **Grok 4** - Thinking model, intelligent

### Google (Gemini)
- **Gemini 2.5 Flash** - Fast, efficient
- **Gemini 2.0 Flash** - Previous flash version
- **Gemini 2.5 Pro** - Thinking model, most capable

### Ollama (Local Models)
- **Dynamic Model Discovery** - Automatically detects your locally downloaded models
- **Recommended Models** - Llama 3 (8B), Mistral (7B), Code Llama (7B+) for best quality
- **No API Keys Required** - Run completely offline with your local models
- **Comprehensive Error Handling** - Helpful guidance for installation and setup

> ⚠️ **Note**: For optimal prompt refinement quality, use models with 7B+ parameters. Smaller models may produce poor results.

## 💻 Usage

### Interactive Mode
```bash
promptx
```

### Direct Mode
```bash
promptx "your messy prompt here"
```

### Commands
| Command | Description |
|---------|-------------|
| `promptx /help` | Show help information |
| `promptx /model` | Switch between AI models |
| `promptx /whats-new` | See latest updates |
| `promptx reset` | Reset configuration |

## ✨ Example Transformation

<table>
<tr>
<td><strong>🔴 Before (Messy)</strong></td>
<td><strong>🟢 After (Refined)</strong></td>
</tr>
<tr>
<td>

```
make a function that sorts 
array but also handle edge 
cases like null undefined etc
```

</td>
<td>

```
Create a JavaScript function that sorts an array with the following requirements:

1. Function should accept an array as input parameter
2. Handle edge cases including:
   - null or undefined input
   - empty arrays
   - arrays containing null/undefined values
   - mixed data types (numbers, strings, objects)
3. Return a new sorted array without modifying the original
4. Use a stable sorting algorithm
5. For mixed types, sort by: numbers first (ascending), 
   then strings (alphabetical), then other types
6. Document the function with JSDoc comments
7. Include parameter validation and appropriate error handling
```

</td>
</tr>
</table>

## 🎬 First Run Setup

On first run, promptx will guide you through:
1. 🤖 Selecting your preferred AI provider
2. 🎯 Choosing a specific model
3. 🔑 Entering your API key

## 📋 Requirements

- **Node.js** >= 16.0.0
- **API key** from your chosen provider (or Ollama for local models):

| Provider | Get API Key | Notes |
|----------|-------------|-------|
| OpenAI | https://platform.openai.com/api-keys | Cloud-based |
| Anthropic | https://console.anthropic.com/settings/keys | Cloud-based |
| xAI | https://console.x.ai/ | Cloud-based |
| Google | https://aistudio.google.com/apikey | Cloud-based |
| Ollama | No API key required | Local models - Install from https://ollama.ai |

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

| Issue | Solution |
|-------|----------|
| `command not found: promptx` | Make sure you installed with `-g` flag |
| `Invalid API key` | Run `promptx reset` to update your key |
| `Rate limit exceeded` | Wait a few minutes or upgrade your API plan |

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

<div align="center">

**Made with ❤️ by [Luka Loehr](https://github.com/luka-loehr)**

[⭐ Star on GitHub](https://github.com/luka-loehr/promptx-cli) • [🐛 Report Bug](https://github.com/luka-loehr/promptx-cli/issues) • [💡 Request Feature](https://github.com/luka-loehr/promptx-cli/issues)

</div>