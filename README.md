# promptx

A CLI tool that transforms messy prompts into structured, clear prompts for AI agents using GPT-4o.

## Installation

```bash
npm install -g promptx
```

## Usage

### First Time Setup

When you run `promptx` for the first time, you'll be prompted to enter your OpenAI API key. This key will be securely stored for future sessions.

### Basic Usage

```bash
# Interactive mode - type your prompt after running the command
promptx

# Direct prompt from command line
promptx "make a function that sorts array but also handle edge cases like null undefined etc"
```

### Commands

- `promptx` - Run the prompt refinement tool
- `promptx reset` - Reset your stored OpenAI API key

### Example

Input:
```
make a function that sorts array but also handle edge cases like null undefined etc
```

Output:
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

### Features

- Transform messy, unclear prompts into well-structured prompts
- Simple interactive prompt input - just type and press Enter
- Secure API key storage
- Beautiful CLI interface with colors and spinners
- Direct command-line usage for quick refinements

## Requirements

- Node.js >= 16.0.0
- OpenAI API key

## License

MIT