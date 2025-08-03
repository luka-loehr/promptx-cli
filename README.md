# promptx

[![npm version](https://img.shields.io/npm/v/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![npm downloads](https://img.shields.io/npm/dm/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)

Transform messy prompts into structured, clear prompts for AI agents. Supports the latest AI models from OpenAI, Anthropic, and xAI!

## 🎉 Version 2.0.0 - Stable Release

This is the **stable, production-ready** version of promptx! 

🚨 **Important:** If you're using an older version, please upgrade immediately:

```bash
npm install -g @lukaloehr/promptx@latest
```

**What's included in v2.0.0:**
- ✅ Full multi-provider support (OpenAI, Anthropic, xAI)
- ✅ All API compatibility issues fixed (O4 Mini, Claude 4, Grok 4)
- ✅ Stable, tested codebase
- ✅ Complete feature set

## 🚀 Quick Install (Global CLI Tool)

This is a **global CLI tool** - install it globally to use the `promptx` command from anywhere:

```bash
npm install -g @lukaloehr/promptx
```

> **Note:** The `-g` flag is required for global installation. Without it, the `promptx` command won't be available in your terminal.

## 🤖 Supported Models

### OpenAI
- **GPT-4o** - Most capable general model
- **O4 Mini** - Fast and efficient
- **O3** - Advanced reasoning

### Anthropic  
- **Claude Opus 4** - Most powerful, world's best coding model
- **Claude Sonnet 4** - Balanced performance, superior reasoning
- **Claude 3.5 Sonnet** - Previous generation

### xAI (Grok)
- **Grok 3** - Advanced reasoning
- **Grok 3 Mini** - Cost-efficient
- **Grok 4** - Most intelligent
- **Grok 4 Heavy** - Ultimate power

## Usage

```bash
# Interactive mode
promptx

# Direct mode
promptx "your messy prompt here"

# Get help
promptx /help

# Switch models
promptx /model

# See what's new
promptx /whats-new

# Reset configuration
promptx reset
```

## Example

**Input:**
```
make a function that sorts array but also handle edge cases like null undefined etc
```

**Output:**
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
5. For mixed types, sort by: numbers first (ascending), then strings (alphabetical), then other types
6. Document the function with JSDoc comments
7. Include parameter validation and appropriate error handling
```

## First Run Setup

On first run, promptx will guide you through:
1. Selecting your preferred AI model
2. Entering the appropriate API key (OpenAI or Anthropic)

## Requirements

- Node.js >= 16.0.0
- API key from your chosen provider:
  - OpenAI: https://platform.openai.com/api-keys
  - Anthropic: https://console.anthropic.com/settings/keys
  - xAI: https://console.x.ai/

## Troubleshooting

If you get a permissions error during installation:

```bash
# Option 1: Configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @lukaloehr/promptx

# Option 2: Use sudo (not recommended)
sudo npm install -g @lukaloehr/promptx
```

## License

MIT