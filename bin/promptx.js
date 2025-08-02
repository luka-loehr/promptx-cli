#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import Conf from 'conf';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import updateNotifier from 'update-notifier';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

// Check for updates
const notifier = updateNotifier({ 
  pkg: packageJson,
  updateCheckInterval: 1000 * 60 * 60 * 24 // Check once per day
});

if (notifier.update) {
  console.log(chalk.yellow('\n╭─────────────────────────────────────────────────────────────╮'));
  console.log(chalk.yellow('│                                                             │'));
  console.log(chalk.yellow('│  ') + chalk.bold.green('Update available! ') + chalk.gray(`${notifier.update.current} → ${notifier.update.latest}`) + chalk.yellow('                      │'));
  console.log(chalk.yellow('│                                                             │'));
  console.log(chalk.yellow('│  ') + chalk.cyan('Run ') + chalk.bold.white('npm install -g @lukaloehr/promptx') + chalk.cyan(' to update') + chalk.yellow('      │'));
  console.log(chalk.yellow('│                                                             │'));
  console.log(chalk.yellow('╰─────────────────────────────────────────────────────────────╯\n'));
}

const config = new Conf({ projectName: 'promptx' });

const MODELS = {
  openai: {
    'gpt-4o': { name: 'GPT-4o', provider: 'openai' },
    'o4-mini': { name: 'O4 Mini', provider: 'openai' },
    'o3': { name: 'O3', provider: 'openai' }
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': { name: 'Claude 3.5 Sonnet (Legacy)', provider: 'anthropic' },
    'claude-3-5-sonnet-v4': { name: 'Claude Sonnet 4', provider: 'anthropic' },
    'claude-3-opus-v4': { name: 'Claude Opus 4', provider: 'anthropic' }
  },
  xai: {
    'grok-3': { name: 'Grok 3', provider: 'xai' },
    'grok-3-mini': { name: 'Grok 3 Mini', provider: 'xai' },
    'grok-4': { name: 'Grok 4', provider: 'xai' },
    'grok-4-heavy': { name: 'Grok 4 Heavy', provider: 'xai' }
  }
};

const ALL_MODELS = { ...MODELS.openai, ...MODELS.anthropic, ...MODELS.xai };

async function setupWizard() {
  console.log(chalk.blue('\n🚀 Welcome to promptx!'));
  console.log(chalk.gray('Let\'s set up your AI model preferences.\n'));
  
  // Provider selection first
  const { provider } = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Which AI provider would you like to use?',
      choices: [
        { name: '🤖 OpenAI (GPT-4o, O4 Mini, O3)', value: 'openai' },
        { name: '🧠 Anthropic (Claude Sonnet 4, Claude Opus 4)', value: 'anthropic' },
        { name: '🚀 xAI (Grok 3, Grok 4)', value: 'xai' }
      ]
    }
  ]);
  
  // Model selection based on provider
  let modelChoices = [];
  if (provider === 'openai') {
    modelChoices = [
      { name: 'GPT-4o (Most capable)', value: 'gpt-4o' },
      { name: 'O4 Mini (Fast & efficient)', value: 'o4-mini' },
      { name: 'O3 (Advanced reasoning)', value: 'o3' }
    ];
  } else if (provider === 'anthropic') {
    modelChoices = [
      { name: 'Claude Sonnet 4 (Balanced performance)', value: 'claude-3-5-sonnet-v4' },
      { name: 'Claude Opus 4 (Most powerful)', value: 'claude-3-opus-v4' },
      { name: 'Claude 3.5 Sonnet (Legacy)', value: 'claude-3-5-sonnet-20241022' }
    ];
  } else {
    modelChoices = [
      { name: 'Grok 3 (Advanced reasoning)', value: 'grok-3' },
      { name: 'Grok 3 Mini (Cost-efficient)', value: 'grok-3-mini' },
      { name: 'Grok 4 (Most intelligent)', value: 'grok-4' },
      { name: 'Grok 4 Heavy (Ultimate power)', value: 'grok-4-heavy' }
    ];
  }
  
  const { selectedModel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedModel',
      message: 'Select your model:',
      choices: modelChoices
    }
  ]);
  
  // API key setup based on provider
  let apiKey;
  if (provider === 'openai') {
    console.log(chalk.yellow('\nYou\'ll need an OpenAI API key'));
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
  } else if (provider === 'anthropic') {
    console.log(chalk.yellow('\nYou\'ll need an Anthropic API key'));
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
  } else {
    console.log(chalk.yellow('\nYou\'ll need an xAI API key'));
    console.log(chalk.gray('Get one at: https://console.x.ai/\n'));
    
    const { xaiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'xaiKey',
        message: 'Enter your xAI API key:',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'API key cannot be empty';
          }
          if (!input.startsWith('xai-')) {
            return 'Invalid API key format. xAI API keys start with "xai-"';
          }
          return true;
        }
      }
    ]);
    apiKey = xaiKey;
    config.set('xai_api_key', apiKey);
  }
  
  config.set('selected_model', selectedModel);
  config.set('setup_complete', true);
  
  const modelInfo = ALL_MODELS[selectedModel];
  console.log(chalk.green('\n✅ Setup complete!'));
  console.log(chalk.gray(`Provider: ${provider.toUpperCase()}`));
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
  } else if (provider === 'anthropic') {
    apiKey = config.get('anthropic_api_key');
    if (!apiKey) {
      console.log(chalk.yellow('Anthropic API key not found. Running setup...'));
      await setupWizard();
      apiKey = config.get('anthropic_api_key');
    }
  } else {
    apiKey = config.get('xai_api_key');
    if (!apiKey) {
      console.log(chalk.yellow('xAI API key not found. Running setup...'));
      await setupWizard();
      apiKey = config.get('xai_api_key');
    }
  }
  
  return { selectedModel, modelInfo, apiKey };
}

async function changeModel() {
  console.log(chalk.blue('\n🔄 Change Model'));
  
  const currentModel = config.get('selected_model') || 'gpt-4o';
  const currentModelInfo = ALL_MODELS[currentModel];
  
  console.log(chalk.gray(`Current model: ${currentModelInfo.name}\n`));
  
  // Provider selection
  const { provider } = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Which AI provider would you like to use?',
      choices: [
        { name: '🤖 OpenAI (GPT-4o, O4 Mini, O3)', value: 'openai' },
        { name: '🧠 Anthropic (Claude Sonnet 4, Claude Opus 4)', value: 'anthropic' },
        { name: '🚀 xAI (Grok 3, Grok 4)', value: 'xai' }
      ]
    }
  ]);
  
  // Model selection based on provider
  let modelChoices = [];
  if (provider === 'openai') {
    modelChoices = [
      { name: 'GPT-4o (Most capable)', value: 'gpt-4o' },
      { name: 'O4 Mini (Fast & efficient)', value: 'o4-mini' },
      { name: 'O3 (Advanced reasoning)', value: 'o3' }
    ];
  } else if (provider === 'anthropic') {
    modelChoices = [
      { name: 'Claude Sonnet 4 (Balanced performance)', value: 'claude-3-5-sonnet-v4' },
      { name: 'Claude Opus 4 (Most powerful)', value: 'claude-3-opus-v4' },
      { name: 'Claude 3.5 Sonnet (Legacy)', value: 'claude-3-5-sonnet-20241022' }
    ];
  } else {
    modelChoices = [
      { name: 'Grok 3 (Advanced reasoning)', value: 'grok-3' },
      { name: 'Grok 3 Mini (Cost-efficient)', value: 'grok-3-mini' },
      { name: 'Grok 4 (Most intelligent)', value: 'grok-4' },
      { name: 'Grok 4 Heavy (Ultimate power)', value: 'grok-4-heavy' }
    ];
  }
  
  const { selectedModel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedModel',
      message: 'Select your model:',
      choices: modelChoices
    }
  ]);
  
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
  } else if (provider === 'xai' && !config.get('xai_api_key')) {
    console.log(chalk.yellow('\nYou need an xAI API key for this model.'));
    const { xaiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'xaiKey',
        message: 'Enter your xAI API key:',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'API key cannot be empty';
          }
          if (!input.startsWith('xai-')) {
            return 'Invalid API key format. xAI API keys start with "xai-"';
          }
          return true;
        }
      }
    ]);
    config.set('xai_api_key', xaiKey);
  }
  
  config.set('selected_model', selectedModel);
  const modelInfo = ALL_MODELS[selectedModel];
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
    } else if (modelInfo.provider === 'anthropic') {
      const anthropic = new Anthropic({ apiKey });
      // Map model names to actual API model IDs
      let apiModelId = selectedModel;
      if (selectedModel === 'claude-3-5-sonnet-v4') {
        apiModelId = 'claude-3-5-sonnet-20241022'; // Use latest available
      } else if (selectedModel === 'claude-3-opus-v4') {
        apiModelId = 'claude-3-opus-20240229'; // Use latest available
      }
      const completion = await anthropic.messages.create({
        model: apiModelId,
        messages: [{ role: 'user', content: messyPrompt }],
        system: systemPrompt,
        temperature: 0.3,
        max_tokens: 2000
      });
      refinedPrompt = completion.content[0].text;
    } else if (modelInfo.provider === 'xai') {
      // xAI is compatible with OpenAI's API
      const xai = new OpenAI({ 
        apiKey,
        baseURL: 'https://api.x.ai/v1'
      });
      const completion = await xai.chat.completions.create({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: messyPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });
      refinedPrompt = completion.choices[0].message.content;
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
      version: '1.2.1',
      changes: [
        '🔔 Automatic update notifications when new versions are available',
        '📦 Shows update command: npm install -g @lukaloehr/promptx',
        '⏰ Checks for updates once per day'
      ]
    },
    {
      version: '1.2.0',
      changes: [
        '🚀 Added xAI Grok support: Grok 3, Grok 3 Mini, Grok 4, Grok 4 Heavy',
        '🧠 Updated Claude models: Sonnet 4 and Opus 4',
        '🤖 Updated OpenAI models: O4 Mini and O3',
        '📁 Organized model selection by provider',
        '🎯 Better model categorization in setup wizard'
      ]
    },
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