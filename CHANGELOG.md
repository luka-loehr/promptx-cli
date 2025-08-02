# Changelog

All notable changes to promptx will be documented in this file.

## [1.3.0] - 2025-08-02 - Stable Release 🎉

### Added
- 📚 `/help` command for quick reference and command overview
- 🎯 Complete feature documentation in help menu
- 📝 Comprehensive update history in `/whats-new`
- 🔧 Enhanced package configuration with explicit file lists
- 📦 `.npmignore` for cleaner npm packages
- 🔑 Updated `.env.example` with all provider formats

### Changed
- 🌟 `/whats-new` now shows complete feature history for stable release
- 📋 Improved package metadata and keywords
- 🎨 Better organized command documentation

## [1.2.1] - 2025-08-02

### Added
- 🔔 Automatic update notifications when new versions are available
- 📦 Shows update command in notification: `npm install -g @lukaloehr/promptx`
- ⏰ Update check runs once per day to avoid being intrusive

## [1.2.0] - 2025-08-02

### Added
- 🚀 xAI Grok support: Grok 3, Grok 3 Mini, Grok 4, Grok 4 Heavy
- 🧠 Updated Claude models: Sonnet 4 and Opus 4
- 🤖 Updated OpenAI models: O4 Mini and O3
- 📁 Organized model selection by provider for better UX
- 🎯 Provider-first selection in setup wizard

### Changed
- Models are now grouped by provider in the selection menu
- Improved model descriptions with performance indicators
- Updated API key validation for xAI

## [1.1.0] - 2025-08-02

### Added
- 🤖 Multi-model support: Choose between multiple AI providers
  - OpenAI: GPT-4o, GPT-4o Mini, O3
  - Anthropic: Claude 3.5 Sonnet, Claude 3 Opus
- 🔄 `/model` command: Switch between models on the fly
- ✨ Modern setup wizard: Interactive model and API key configuration
- 📰 `/whats-new` command: See latest updates and features
- 🔑 Support for both OpenAI and Anthropic API keys

### Changed
- Improved first-run experience with guided setup
- Configuration now supports multiple API providers

## [1.0.2] - 2025-08-02

### Added
- 📦 NPM badges in README
- ⚠️ Post-install warning for local installations

### Changed
- Improved installation instructions with emphasis on global installation
- Simplified README structure

## [1.0.1] - 2025-08-02

### Fixed
- Package.json formatting issues
- Installation command documentation

## [1.0.0] - 2025-08-02

### Added
- 🎉 Initial release
- ✨ Transform messy prompts into structured, clear prompts
- 🎨 Beautiful CLI interface with colors and spinners
- 📦 Global npm package with easy installation
- 🔐 Secure API key storage
- 💻 Interactive and direct command-line modes
- 🤖 GPT-4o support for prompt refinement

### Features
- Simple one-command global installation
- First-time setup wizard for API key
- Beautiful colored output
- Loading spinners for better UX
- Error handling with helpful messages
- Command to reset API key