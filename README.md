```
 ____  ____   __   _  _  ____  ____  _  _ 
(  _ \(  _ \ /  \ ( \/ )(  _ \(_  _)( \/ )
 ) __/ )   /(  O )/ \/ \ ) __/  )(   )  ( 
(__)  (__\_) \__/ \_)(_/(__)   (__) (_/\_)
```

<div align="center">

# promptx

[![npm version](https://img.shields.io/npm/v/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![npm downloads](https://img.shields.io/npm/dm/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Transform messy prompts into structured, clear prompts for AI agents**

Supports the latest AI models from OpenAI, Anthropic, xAI, and Google!

</div>

## 🎉 Version 3.4.5 - Stable Release

This is the **stable, production-ready** version of promptx! 

🚨 **Important:** If you're using an older version, please upgrade immediately:

```bash
npm install -g @lukaloehr/promptx@latest
```

**What's included in v3.4.5:**
- ✅ NEW: Enhanced system prompt with advanced prompt engineering
- ✅ NEW: Google AI support with Gemini models
- ✅ Full multi-provider support (OpenAI, Anthropic, xAI, Google)
- ✅ Gemini 2.5 Flash, 2.0 Flash, and 2.5 Pro models
- ✅ Replaced O3 with GPT-4.1 (latest model)
- ✅ Thinking spinner for O4 Mini, Grok 4, and Gemini 2.5 Pro
- ✅ Conversational handling for casual interactions
- ✅ All API compatibility issues fixed
- ✅ Real-time streaming output with proper word wrapping
- ✅ Respects terminal width boundaries
- ✅ Streaming enabled for all providers (prevents timeout errors)
- ✅ Stable, tested codebase
- ✅ Complete feature set

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
- **API key** from your chosen provider:

| Provider | Get API Key |
|----------|-------------|
| OpenAI | https://platform.openai.com/api-keys |
| Anthropic | https://console.anthropic.com/settings/keys |
| xAI | https://console.x.ai/ |
| Google | https://aistudio.google.com/apikey |

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