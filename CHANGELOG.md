# Changelog

All notable changes to promptx will be documented in this file.

## [3.2.3] - 2025-08-03 - STABLE RELEASE 🎉

### Added
- 📐 Proper word wrapping for streaming output
- 🖼️ Respects terminal width boundaries
- 📦 Added wrap-ansi dependency for better text formatting

### Technical Details
- Streaming output now wraps at terminal boundaries with proper margins
- Prevents text from running to the edge of the terminal
- Handles word breaks intelligently to maintain readability
- Buffer-based approach ensures smooth streaming experience

## [3.2.2] - 2025-08-03 - STABLE RELEASE

### Added
- 🚀 Real-time streaming output to terminal
- ✨ See refined prompts as they are generated
- 🎯 Immediate visual feedback during prompt refinement

### Technical Details
- Removed loading spinner once streaming starts
- Output streams directly to terminal using process.stdout.write
- Consistent formatting across all providers

## [3.2.1] - 2025-08-03 - STABLE RELEASE

### Fixed
- 🐛 Fixed API streaming errors for long operations across all providers
- ✅ Added proper streaming support for all models to prevent timeout errors

### Enhanced
- 🚀 Enabled streaming for OpenAI models (GPT-4o, O4 Mini, O3)
- 🚀 Enabled streaming for Anthropic models (Claude Opus 4, Sonnet 4)
- 🚀 Enabled streaming for xAI models (Grok 3, Grok 4)

### Technical Details
- All API calls now use `stream: true` parameter
- Properly handles streaming response chunks for reliable operation
- Prevents timeout errors for long-running prompt refinements

## [3.2.0] - 2025-08-03 - STABLE RELEASE

This is the **official stable release** of promptx! This version contains all the essential features and bug fixes for production use.

### What's Included
- ✅ **Complete multi-provider support**: OpenAI, Anthropic, and xAI
- ✅ **All API compatibility issues resolved**: 
  - O4 Mini and O3 models use correct `max_completion_tokens` parameter
  - Claude 4 models use proper identifiers (`claude-opus-4`, `claude-sonnet-4`)
  - Grok 4 reasoning models have correct API parameters
- ✅ **Stable, tested codebase** with no experimental features
- ✅ **Complete feature set**: Interactive wizard, model switching, help system

### Why Upgrade?
- 🔒 **Production ready**: No more beta features or experimental code
- 🐛 **Bug-free**: All known API compatibility issues resolved
- 🚀 **Performance**: Optimized for reliability and speed
- 📚 **Complete documentation**: Full help system and clear usage instructions

**Upgrade command:**
```bash
npm install -g @lukaloehr/promptx@latest
```

## [1.3.1] - 2025-08-02

### Fixed
- 🐛 Fixed O4 Mini and O3 API errors by using `max_completion_tokens` parameter
- 🔧 Fixed Claude 4 model identifiers (`claude-opus-4`, `claude-sonnet-4`)
- 🎯 Updated Grok 4 API parameters (reasoning models don't support temperature)
- 📝 Corrected model descriptions based on latest API documentation

### Changed
- Claude Opus 4 now correctly uses 32k max tokens, Sonnet 4 uses 64k
- Grok 4 models now properly configured as reasoning models
- O4 Mini and O3 use max_completion_tokens instead of max_tokens

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