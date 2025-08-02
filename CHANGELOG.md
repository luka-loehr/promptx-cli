# Changelog

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

## [1.0.2] - 2024-01-XX

### Added
- 📦 NPM badges in README
- ⚠️ Post-install warning for local installations

### Changed
- Improved installation instructions with emphasis on global installation
- Simplified README structure

## [1.0.1] - 2024-01-XX

### Fixed
- Package.json formatting issues
- Installation command documentation

## [1.0.0] - 2024-01-XX

### Added
- Initial release
- Transform messy prompts into structured, clear prompts
- Interactive and direct command-line modes
- Secure API key storage
- Beautiful CLI interface with colors and spinners