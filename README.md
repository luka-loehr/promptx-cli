# promptx

[![npm version](https://img.shields.io/npm/v/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)
[![npm downloads](https://img.shields.io/npm/dm/@lukaloehr/promptx.svg)](https://www.npmjs.com/package/@lukaloehr/promptx)

Transform messy prompts into structured, clear prompts for AI agents. Supports multiple AI models including GPT-4o, Claude 3.5 Sonnet, and more!

## 🚀 Quick Install (Global CLI Tool)

This is a **global CLI tool** - install it globally to use the `promptx` command from anywhere:

```bash
npm install -g @lukaloehr/promptx
```

> **Note:** The `-g` flag is required for global installation. Without it, the `promptx` command won't be available in your terminal.

## 🤖 Supported Models

- **OpenAI**: GPT-4o, GPT-4o Mini, O3
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus

## Usage

```bash
# Interactive mode
promptx

# Direct mode
promptx "your messy prompt here"

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
- API key from OpenAI or Anthropic (depending on your chosen model)

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