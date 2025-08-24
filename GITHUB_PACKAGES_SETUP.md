# GitHub Packages Setup Guide

Your package has been configured to work with GitHub Packages. Here's what you need to do to complete the setup:

## What's Already Configured

✅ Package name is properly scoped: `@lukaloehr/promptx`  
✅ `publishConfig` added to package.json  
✅ `.npmrc` file created with scope mapping  
✅ Repository URL format corrected  

## Steps to Complete Setup

### 1. Create a Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with the following scopes:
   - `write:packages` (to publish packages)
   - `read:packages` (to install packages)
   - `delete:packages` (optional, to delete packages)

### 2. Authenticate with GitHub Packages

You have two options:

#### Option A: Add token to ~/.npmrc (Recommended)
Add this line to your `~/.npmrc` file:
```bash
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
```

#### Option B: Login via npm CLI
```bash
npm login --scope=@lukaloehr --auth-type=legacy --registry=https://npm.pkg.github.com
```
When prompted:
- Username: your GitHub username
- Password: your personal access token
- Email: your email address

### 3. Publish to GitHub Packages

```bash
npm publish
```

The package will be published to GitHub Packages under your account.

### 4. Install from GitHub Packages

Users can install your package from GitHub Packages by:

1. Adding this to their `.npmrc`:
   ```
   @lukaloehr:registry=https://npm.pkg.github.com
   ```

2. Installing the package:
   ```bash
   npm install @lukaloehr/promptx
   ```

## Important Notes

- **Package Visibility**: By default, packages published to GitHub Packages are private. You can change this in the package settings on GitHub.
- **Repository Linking**: Your package is already configured to link to your GitHub repository.
- **Authentication**: Make sure to keep your personal access token secure and never commit it to version control.
- **Scope**: All packages under `@lukaloehr` will be routed to GitHub Packages.

## Troubleshooting

- If you get authentication errors, verify your personal access token has the correct scopes
- If the package doesn't publish, check that your `.npmrc` file is in the project root
- Ensure your package name matches the scope in your `.npmrc` file

## Next Steps

After publishing, you can:
1. View your package on GitHub under the "Packages" tab
2. Configure package visibility and access control
3. Set up automated publishing with GitHub Actions
4. Manage package versions and releases

For more information, see the [GitHub Packages npm registry documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
