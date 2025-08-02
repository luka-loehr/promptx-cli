#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import Conf from 'conf';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const config = new Conf({ projectName: 'promptx' });

const MODELS = {
  openai: {
    'gpt-4o': { name: 'GPT-4o', provider: 'openai' },
    'gpt-4o-mini': { name: 'GPT-4o Mini', provider: 'openai' },
    'o3': { name: 'O3', provider: 'openai' }
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': { name: 'Claude 3.5 Sonnet', provider: 'anthropic' },
    'claude-3-opus-20240229': { name: 'Claude 3 Opus', provider: 'anthropic' }
  }
};

const ALL_MODELS = { ...MODELS.openai, ...MODELS.anthropic };

async function setupWizard() {
  console.log(chalk.blue('\n🚀 Welcome to promptx!'));
  console.log(chalk.gray('Let\'s set up your AI model preferences.\n'));
  
  // Model selection
  const modelChoices = [
    { name: '🤖 GPT-4o (OpenAI)', value: 'gpt-4o' },
    { name: '🤖 GPT-4o Mini (OpenAI)', value: 'gpt-4o-mini' },
    { name: '🤖 O3 (OpenAI)', value: 'o3' },
    { name: '🧠 Claude 3.5 Sonnet (Anthropic)', value: 'claude-3-5-sonnet-20241022' },
    { name: '🧠 Claude 3 Opus (Anthropic)', value: 'claude-3-opus-20240229' }
  ];
  
  const { selectedModel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedModel',
      message: 'Which AI model would you like to use?',
      choices: modelChoices
    }
  ]);
  
  const modelInfo = ALL_MODELS[selectedModel];
  const provider = modelInfo.provider;
  
  // API key setup based on provider
  let apiKey;
  if (provider === 'openai') {
    console.log(chalk.yellow('\nYou\'ll need an OpenAI API key to use ' + modelInfo.name));
    console.log(chalk.gray('Get one at: https://platform.openai.com/api-keys\n'));
    
    const { openaiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'openaiKey',
        message: 'Enter your OpenAI API key:',
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
    apiKey = openaiKey;
    config.set('openai_api_key', apiKey);
  } else {
    console.log(chalk.yellow('\nYou\'ll need an Anthropic API key to use ' + modelInfo.name));
    console.log(chalk.gray('Get one at: https://console.anthropic.com/settings/keys\n'));
    
    const { anthropicKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'anthropicKey',
        message: 'Enter your Anthropic API key:',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'API key cannot be empty';
          }
          if (!input.startsWith('sk-ant-')) {
            return 'Invalid API key format. Anthropic API keys start with "sk-ant-"';
          }
          return true;
        }
      }
    ]);
    apiKey = anthropicKey;
    config.set('anthropic_api_key', apiKey);
  }
  
  config.set('selected_model', selectedModel);
  config.set('setup_complete', true);
  
  console.log(chalk.green('\n✅ Setup complete!'));
  console.log(chalk.gray(`Model: ${modelInfo.name}`));
  console.log(chalk.gray('You can change your model anytime by typing /model\n'));
}

async function getOrSetupConfig() {
  const setupComplete = config.get('setup_complete');
  
  if (!setupComplete) {
    await setupWizard();
  }
  
  const selectedModel = config.get('selected_model') || 'gpt-4o';
  const modelInfo = ALL_MODELS[selectedModel];
  const provider = modelInfo.provider;
  
  let apiKey;
  if (provider === 'openai') {
    apiKey = config.get('openai_api_key');
    if (!apiKey) {
      console.log(chalk.yellow('OpenAI API key not found. Running setup...'));
      await setupWizard();
      apiKey = config.get('openai_api_key');
    }
  } else {
    apiKey = config.get('anthropic_api_key');
    if (!apiKey) {
      console.log(chalk.yellow('Anthropic API key not found. Running setup...'));
      await setupWizard();
      apiKey = config.get('anthropic_api_key');
    }
  }
  
  return { selectedModel, modelInfo, apiKey };
}

async function changeModel() {
  console.log(chalk.blue('\n🔄 Change Model'));
  
  const currentModel = config.get('selected_model') || 'gpt-4o';
  const currentModelInfo = ALL_MODELS[currentModel];
  
  console.log(chalk.gray(`Current model: ${currentModelInfo.name}\n`));
  
  const modelChoices = [
    { name: '🤖 GPT-4o (OpenAI)', value: 'gpt-4o' },
    { name: '🤖 GPT-4o Mini (OpenAI)', value: 'gpt-4o-mini' },
    { name: '🤖 O3 (OpenAI)', value: 'o3' },
    { name: '🧠 Claude 3.5 Sonnet (Anthropic)', value: 'claude-3-5-sonnet-20241022' },
    { name: '🧠 Claude 3 Opus (Anthropic)', value: 'claude-3-opus-20240229' }
  ];
  
  const { selectedModel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedModel',
      message: 'Select a new model:',
      choices: modelChoices,
      default: currentModel
    }
  ]);
  
  const modelInfo = ALL_MODELS[selectedModel];
  const provider = modelInfo.provider;
  
  // Check if we need API key for this provider
  if (provider === 'openai' && !config.get('openai_api_key')) {
    console.log(chalk.yellow('\nYou need an OpenAI API key for this model.'));
    const { openaiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'openaiKey',
        message: 'Enter your OpenAI API key:',
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
    config.set('openai_api_key', openaiKey);
  } else if (provider === 'anthropic' && !config.get('anthropic_api_key')) {
    console.log(chalk.yellow('\nYou need an Anthropic API key for this model.'));
    const { anthropicKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'anthropicKey',
        message: 'Enter your Anthropic API key:',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'API key cannot be empty';
          }
          if (!input.startsWith('sk-ant-')) {
            return 'Invalid API key format. Anthropic API keys start with "sk-ant-"';
          }
          return true;
        }
      }
    ]);
    config.set('anthropic_api_key', anthropicKey);
  }
  
  config.set('selected_model', selectedModel);
  console.log(chalk.green(`\n✅ Switched to ${modelInfo.name}`));
}

async function refinePrompt(messyPrompt, selectedModel, apiKey) {
  const modelInfo = ALL_MODELS[selectedModel];
  const spinner = ora(`Refining your prompt with ${modelInfo.name}...`).start();
  
  const systemPrompt = `You are an expert prompt engineer specializing in creating prompts for AI coding assistants like Claude, ChatGPT, and GitHub Copilot.

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

IMPORTANT: Return ONLY the refined prompt. Do not include any explanations, meta-commentary, or phrases like "Here's the refined prompt:" - just output the improved prompt directly.`;
  
  try {
    let refinedPrompt;
    
    if (modelInfo.provider === 'openai') {
      const openai = new OpenAI({ apiKey });
      const completion = await openai.chat.completions.create({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: messyPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });
      refinedPrompt = completion.choices[0].message.content;
    } else {
      const anthropic = new Anthropic({ apiKey });
      const completion = await anthropic.messages.create({
        model: selectedModel,
        messages: [{ role: 'user', content: messyPrompt }],
        system: systemPrompt,
        temperature: 0.3,
        max_tokens: 2000
      });
      refinedPrompt = completion.content[0].text;
    }
    
    spinner.stop();
    return refinedPrompt;
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

function showWhatsNew() {
  console.log(chalk.blue('\n🎉 What\'s New in promptx v' + packageJson.version));
  console.log(chalk.gray('─'.repeat(50)));
  
  const updates = [
    {
      version: '1.1.0',
      changes: [
        '🤖 Multi-model support: Choose between GPT-4o, GPT-4o Mini, O3, Claude 3.5 Sonnet, and Claude 3 Opus',
        '🔄 /model command: Switch models on the fly',
        '✨ Modern setup wizard: Interactive model and API key configuration',
        '📰 /whats-new command: See latest updates and features',
        '🔑 Support for both OpenAI and Anthropic API keys'
      ]
    },
    {
      version: '1.0.2',
      changes: [
        '📦 Improved installation instructions',
        '⚠️  Post-install warnings for local installation'
      ]
    }
  ];
  
  updates.forEach(update => {
    if (update.version === packageJson.version || packageJson.version.startsWith(update.version.split('.')[0])) {
      console.log(chalk.green(`\nv${update.version}:`));
      update.changes.forEach(change => {
        console.log(chalk.white(`  ${change}`));
      });
    }
  });
  
  console.log(chalk.gray('\n─'.repeat(50)));
  console.log(chalk.gray('For more info: https://github.com/luka-loehr/promptx-cli\n'));
}

program
  .name('promptx')
  .description('Transform messy prompts into structured, clear prompts for AI agents')
  .version(packageJson.version);

program
  .command('reset')
  .description('Reset your configuration and API keys')
  .action(async () => {
    config.clear();
    console.log(chalk.green('Configuration has been reset. You\'ll go through setup next time.'));
  });

program
  .argument('[prompt...]', 'The messy prompt to refine')
  .action(async (promptParts) => {
    // Handle special commands
    if (promptParts && promptParts.length === 1) {
      const command = promptParts[0].toLowerCase();
      
      if (command === '/model') {
        await changeModel();
        return;
      }
      
      if (command === '/whats-new' || command === '/whatsnew') {
        showWhatsNew();
        return;
      }
    }
    
    const { selectedModel, modelInfo, apiKey } = await getOrSetupConfig();
    
    let messyPrompt;
    
    if (promptParts && promptParts.length > 0) {
      messyPrompt = promptParts.join(' ');
    } else {
      console.log(chalk.gray(`Using ${modelInfo.name}\n`));
      
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
      
      // Check for commands in interactive mode
      if (messyPrompt.toLowerCase() === '/model') {
        await changeModel();
        return;
      }
      
      if (messyPrompt.toLowerCase() === '/whats-new' || messyPrompt.toLowerCase() === '/whatsnew') {
        showWhatsNew();
        return;
      }
    }
    
    const refinedPrompt = await refinePrompt(messyPrompt, selectedModel, apiKey);
    
    console.log('\n\n' + chalk.gray('─'.repeat(80)));
    console.log(chalk.green('REFINED PROMPT:'));
    console.log(chalk.gray('─'.repeat(80)) + '\n');
    console.log(refinedPrompt);
    console.log('\n' + chalk.gray('─'.repeat(80)) + '\n\n');
  });

program.parse();