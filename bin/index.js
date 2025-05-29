#!/usr/bin/env node

import { config } from 'dotenv';
import OpenAI from 'openai';
import { program } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import clipboard from 'clipboardy';

// Load environment variables
config();

// Get package version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
);

// Initialize CLI program
program
  .name('prompt')
  .description('Clean and structure prompts for LLMs')
  .version(packageJson.version)
  .argument('[text...]', 'The prompt text to clean')
  .option('-m, --model <name>', 'Override default model', 'gpt-4o')
  .option('-d, --display', 'Display the cleaned prompt in terminal (default: false)')
  .parse(process.argv);

const options = program.opts();
const promptText = program.args.join(' ');

if (!promptText) {
  console.log('Please provide a prompt to clean');
  program.help();
}

// System prompt that defines how to clean user prompts
const systemPrompt = `You are a professional prompt cleaner for developers.
Your task is to take potentially messy, unstructured prompts and convert them into clean, structured prompts suitable for LLMs.

Guidelines:
- Be concise and developer-focused
- Preserve the original intent
- Make the prompt readable for downstream LLM use
- Remove typos, grammatical errors, and unnecessary details
- Structure the prompt logically
- Focus on technical clarity
- Always output in English, regardless of the input language

Return ONLY the cleaned prompt text without any explanation or formatting. The output must always be in English, even if the input is in another language.`;

async function cleanPrompt(text, model, display) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY not found in environment variables');
      console.error('\nTo set up your OpenAI API key, you have two options:');
      console.error('\n1. Create a .env file in your working directory with:');
      console.error('   OPENAI_API_KEY=your_openai_api_key_here');
      console.error('\n2. Set it as an environment variable:');
      console.error('   • Windows (Command Prompt): set OPENAI_API_KEY=your_openai_api_key_here');
      console.error('   • Windows (PowerShell): $env:OPENAI_API_KEY="your_openai_api_key_here"');
      console.error('   • macOS/Linux: export OPENAI_API_KEY=your_openai_api_key_here');
      console.error('\nFor more information, see: https://github.com/luka-loehr/prompt-cli#setting-up-your-openai-api-key');
      process.exit(1);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log('Processing prompt...');
    
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
    });

    const cleanedPrompt = response.choices[0].message.content.trim();
    
    // Copy to clipboard
    await clipboard.write(cleanedPrompt);
    console.log('✅ Cleaned prompt copied to clipboard! (translated to English)');
    
    // Optionally display the prompt in terminal
    if (display) {
      const separator = '-'.repeat(46);
      console.log('\n' + separator);
      console.log('\n' + cleanedPrompt + '\n');
      console.log(separator + '\n');
    }
  } catch (error) {
    if (error.response) {
      console.error(`OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
}

// Execute the prompt cleaning
cleanPrompt(promptText, options.model, options.display); 