# promptx

Transform messy prompts into structured, clear prompts for AI agents.

## Quick Install

```bash
npm install -g @lukaloehr/promptx
```

## Usage

```bash
# Interactive mode
promptx

# Direct mode
promptx "your messy prompt here"

# Reset API key
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

## Requirements

- Node.js >= 16.0.0
- OpenAI API key (you'll be prompted on first run)

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