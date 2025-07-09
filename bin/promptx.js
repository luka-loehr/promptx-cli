#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import Conf from 'conf';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const config = new Conf({ projectName: 'promptx' });

async function getApiKey() {
  let apiKey = config.get('openai_api_key');
  
  if (!apiKey) {
    console.log(chalk.yellow('Welcome to promptx! Let\'s set up your OpenAI API key.'));
    console.log(chalk.gray('Your API key will be stored securely for future sessions.'));
    
    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Please enter your OpenAI API key:',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'API key cannot be empty';
          }
          if (!input.startsWith('sk-')) {
            return 'Invalid API key format. OpenAI API keys start with "sk-"';
          }
          return true;
        }
      }
    ]);
    
    apiKey = answers.apiKey;
    config.set('openai_api_key', apiKey);
    console.log(chalk.green('✓ API key saved successfully!'));
  }
  
  return apiKey;
}

async function refinePrompt(messyPrompt, apiKey) {
  const openai = new OpenAI({ apiKey });
  
  const spinner = ora('Refining your prompt...').start();
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert prompt engineer specializing in creating prompts for AI coding assistants like Claude, ChatGPT, and GitHub Copilot.

Your task is to transform messy, informal prompts from developers into clear, structured, and highly effective prompts that will produce the best possible results from AI coding assistants.

CRITICAL RULES:
1. NEVER include actual code in your response
2. NEVER write implementation examples
3. NEVER provide code snippets or templates
4. Your output should ONLY be a refined prompt that describes what the user wants
5. The refined prompt should instruct the AI to create the code, not contain the code itself

Guidelines for creating excellent prompts:

1. **Clarity & Specificity**
   - Make the core objective crystal clear
   - Be specific about the desired outcome
   - Describe functionality without implementing it

2. **Context & Constraints**
   - Add relevant technical context (language, framework, environment)
   - Specify any constraints or requirements
   - Mention edge cases that should be handled

3. **Structure & Format**
   - Use clear sections or bullet points for complex requests
   - Specify the desired output format (code style, documentation level, etc.)
   - Break down multi-step tasks into clear phases

4. **Technical Details**
   - Include version requirements if mentioned
   - Specify error handling needs
   - Add performance or security considerations if relevant

5. **Best Practices for AI Assistants**
   - Front-load the most important information
   - Use imperative mood for clear instructions
   - Avoid ambiguity - be explicit about what you want

Remember: You are creating a PROMPT for an AI to follow, not creating the solution itself. Never include code examples, only clear instructions about what code should be created.

IMPORTANT: Return ONLY the refined prompt. Do not include any explanations, meta-commentary, or phrases like "Here's the refined prompt:" - just output the improved prompt directly.`
        },
        {
          role: 'user',
          content: messyPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });
    
    spinner.stop();
    return completion.choices[0].message.content;
  } catch (error) {
    spinner.fail('Failed to refine prompt');
    
    if (error.status === 401) {
      console.log(chalk.red('Invalid API key. Please run "promptx reset" to update your API key.'));
    } else if (error.status === 429) {
      console.log(chalk.red('Rate limit exceeded. Please try again later.'));
    } else {
      console.log(chalk.red('Error:', error.message));
    }
    
    process.exit(1);
  }
}

program
  .name('promptx')
  .description('Transform messy prompts into structured, clear prompts for AI agents')
  .version(packageJson.version);

program
  .command('reset')
  .description('Reset your OpenAI API key')
  .action(async () => {
    config.delete('openai_api_key');
    console.log(chalk.green('API key has been reset. You\'ll be prompted to enter it next time.'));
  });

program
  .argument('[prompt...]', 'The messy prompt to refine')
  .action(async (promptParts) => {
    const apiKey = await getApiKey();
    
    let messyPrompt;
    
    if (promptParts && promptParts.length > 0) {
      messyPrompt = promptParts.join(' ');
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'prompt',
          message: 'Enter your messy prompt:',
          validate: (input) => {
            if (!input || input.trim() === '') {
              return 'Prompt cannot be empty';
            }
            return true;
          }
        }
      ]);
      messyPrompt = answers.prompt;
    }
    
    const refinedPrompt = await refinePrompt(messyPrompt, apiKey);
    
    console.log('\n\n' + chalk.gray('─'.repeat(80)));
    console.log(chalk.green('REFINED PROMPT:'));
    console.log(chalk.gray('─'.repeat(80)) + '\n');
    console.log(refinedPrompt);
    console.log('\n' + chalk.gray('─'.repeat(80)) + '\n\n');
  });

program.parse();