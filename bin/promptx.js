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
          content: `You are a prompt engineering expert. Your task is to transform messy, unclear prompts from AI coders into structured, clear, and effective prompts for AI agents. 

Follow these guidelines:
1. Identify the core objective and make it explicit
2. Add relevant context and constraints
3. Structure the prompt with clear sections if needed
4. Include specific output format requirements when applicable
5. Add any technical specifications mentioned
6. Maintain the original intent while improving clarity
7. Use clear, concise language

Return ONLY the refined prompt without any explanations or meta-commentary.`
        },
        {
          role: 'user',
          content: messyPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });
    
    spinner.succeed('Prompt refined successfully!');
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
          type: 'editor',
          name: 'prompt',
          message: 'Enter your messy prompt (press Enter to open editor):',
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
    
    console.log(chalk.cyan('\n=== Original Prompt ==='));
    console.log(messyPrompt);
    
    const refinedPrompt = await refinePrompt(messyPrompt, apiKey);
    
    console.log(chalk.green('\n=== Refined Prompt ==='));
    console.log(refinedPrompt);
    
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Copy to clipboard', value: 'copy' },
          { name: 'Save to file', value: 'save' },
          { name: 'Exit', value: 'exit' }
        ]
      }
    ]);
    
    if (action === 'copy') {
      try {
        const { default: clipboardy } = await import('clipboardy');
        await clipboardy.write(refinedPrompt);
        console.log(chalk.green('✓ Copied to clipboard!'));
      } catch (error) {
        console.log(chalk.yellow('Note: Install clipboardy globally for clipboard support: npm install -g clipboardy'));
      }
    } else if (action === 'save') {
      const { filename } = await inquirer.prompt([
        {
          type: 'input',
          name: 'filename',
          message: 'Enter filename:',
          default: 'refined-prompt.txt'
        }
      ]);
      
      fs.writeFileSync(filename, refinedPrompt);
      console.log(chalk.green(`✓ Saved to ${filename}`));
    }
  });

program.parse();