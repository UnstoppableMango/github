# AI Agent Instructions

This document provides guidance for AI agents interacting with this repository. It includes a comprehensive code map to facilitate targeted file reads and minimize unnecessary repository exploration.

## Repository Overview

This is a Pulumi Infrastructure as Code (IaC) project written in TypeScript that manages GitHub repositories and settings for the UnstoppableMango organization.

**Key Technologies:**
- TypeScript
- Pulumi (GitHub provider)
- Yarn (package manager)
- ESLint (linting)
- Nix (development environment)

## Code Map

Use this code map to locate files efficiently. **Always check this map first before exploring the repository.**

### Root Level Structure

```
/
├── index.ts                     # Main Pulumi program - imports all repositories and exports list
├── package.json                 # Project dependencies and scripts
├── tsconfig.json               # TypeScript compiler configuration
├── tsconfig.eslint.json        # TypeScript config for ESLint
├── eslint.config.mjs           # ESLint configuration
├── Makefile                    # Build automation (up, preview, diff, refresh, lint, format)
├── Pulumi.yaml                 # Pulumi project configuration
├── Pulumi.prod.yaml            # Pulumi stack configuration (prod)
├── README.md                   # Basic project description
├── LICENSE                     # MIT License
├── flake.nix                   # Nix flake for development environment
├── flake.lock                  # Nix flake lock file
├── yarn.lock                   # Yarn dependency lock file
├── .nvmrc                      # Node version specification
├── .envrc                      # direnv configuration
├── .editorconfig              # Editor configuration
├── .dprint.json               # dprint formatter configuration
└── .gitignore                 # Git ignore patterns
```

### Component Modules (`/components`)

Reusable Pulumi component resources for GitHub repositories:

```
/components/
├── index.ts                    # Exports all components and constants (integrationIds, etc.)
├── repo.ts                     # Base repository component (RepoArgs interface)
├── publicRepo.ts              # PublicRepo component - extends base with public settings
├── privateRepo.ts             # PrivateRepo component - extends base with private settings
└── util.ts                     # Utility functions and helpers
```

**Key Concepts:**
- `RepoArgs`: Base arguments interface for all repository components
- `PublicRepo`: Component for public repositories with standard settings
- `PrivateRepo`: Component for private repositories with standard settings
- `integrationIds`: Constants for GitHub App integration IDs (used in required checks)

### Repository Definitions (`/repositories`)

Individual repository configurations organized by category:

```
/repositories/
├── index.ts                    # Exports all repository definitions
├── applications.ts            # Application repositories (dotnetProxmoxClient, proxmoxClient, etc.)
├── archived.ts                # Archived repository definitions
├── fun.ts                     # Fun/hobby project repositories (audio, xmageDocker, mangoMtg, etc.)
├── homelab.ts                 # Homelab infrastructure repositories (infra, openshiftLab, etc.)
├── libraries.ts               # Library/package repositories (http, rest, cliwrapFsharp, etc.)
├── operators.ts               # Kubernetes operator repositories (minecraftOperator, etc.)
├── presentations.ts           # Presentation/talk repositories (imaug, johnstonDems, etc.)
├── pulumi.ts                  # Pulumi-related repositories (pulumiBun, pulumiProxmox, etc.)
├── terraform.ts               # Terraform-related repositories
├── utilities.ts               # Utility repositories (a2b, gast, tdl, etc.)
├── ux.ts                      # UX/UI repositories
└── work.ts                    # Work-related repositories
```

**Organization Pattern:**
- Each file exports repository instances created with `PublicRepo`, `PrivateRepo`, or raw `gh.Repository`
- Repositories are imported into `index.ts` and re-exported
- Main `index.ts` imports from `/repositories` and creates additional inline repositories

### Development Tools (`/hack`)

Development utilities and examples:

```
/hack/
├── example.envrc              # Example direnv configuration file
└── vscode.json                # VSCode settings example
```

### Build Artifacts (`/bin`)

Generated directory for compiled TypeScript output (ignored by git).

### Hidden Configuration Files

```
.github/                        # GitHub Actions workflows and settings
.vscode/                        # VSCode workspace settings
.direnv/                        # direnv cache
.make/                         # Makefile build targets state
.git/                          # Git repository data
.versions/                     # Version pin files
```

## Common Operations

### Building and Linting
```bash
make lint          # Run ESLint on all TypeScript files
make format        # Format code with dprint
make install       # Install Pulumi dependencies
```

### Pulumi Operations
```bash
make preview       # Preview infrastructure changes
make diff          # Show detailed diff of changes
make up            # Apply infrastructure changes
make refresh       # Refresh state from actual infrastructure
```

### Development
```bash
yarn install       # Install Node.js dependencies
yarn lint          # Run ESLint directly
```

## Key Patterns and Conventions

### Repository Definitions
- All repositories are defined either in `/repositories/*.ts` files or inline in `index.ts`
- Repositories use component resources (`PublicRepo`, `PrivateRepo`) or raw `gh.Repository`
- Common settings: `allowAutoMerge`, `deleteBranchOnMerge`, `squashMergeCommitTitle`, `requiredChecks`
- Security settings are explicitly configured for each repository

### Code Organization
1. **Categorization**: Repositories are organized by purpose (applications, libraries, operators, etc.)
2. **Components**: Reusable components abstract common repository patterns
3. **Exports**: The main `index.ts` exports a `repos` array containing all repository names

### TypeScript Configuration
- Strict mode enabled
- Target: ES2020
- Module: CommonJS
- Output directory: `bin/`
- Specific files listed in `tsconfig.json` (not using includes/excludes)

## Working with This Repository

### When Adding New Repositories
1. Determine the category (application, library, operator, utility, etc.)
2. Add definition to appropriate `/repositories/*.ts` file
3. Export from `/repositories/index.ts`
4. Import and include in `repos` array in main `index.ts`
5. Run `make preview` to verify configuration

### When Modifying Components
1. Edit component files in `/components/`
2. Ensure exports are updated in `/components/index.ts`
3. Test changes with `make preview` or `make diff`
4. Run `make lint` to check code quality

### When Updating Dependencies
- Run `yarn upgrade` for Node.js dependencies
- Run `nix flake update` for Nix dependencies
- Update `.nvmrc` if Node.js version changes
- Update `.versions/pulumi` if Pulumi version changes

## Self-Correction Protocol

### Maintaining Code Map Accuracy

**When you discover discrepancies between this code map and the actual repository structure:**

1. **Document the Discrepancy**
   - Note the specific inaccuracy (file missing, file moved, new file added, etc.)
   - Record the actual current state

2. **Update This Document**
   - Modify the affected section(s) of the code map
   - Ensure the update is accurate and complete
   - Maintain the same formatting and structure

3. **Update Guidelines**
   - If new patterns emerge (new categories, new component types), document them in the "Key Patterns and Conventions" section
   - If new directories are added, include them in the appropriate map section
   - If files are deleted, remove them from the map

4. **Verification**
   - After updating, verify related sections are still accurate
   - Check that cross-references in the document remain valid
   - Ensure the "Common Operations" section still reflects available commands

### When to Update the Code Map

Update this AGENTS.md file when you observe:
- ✅ New TypeScript files in `/components` or `/repositories`
- ✅ New category files in `/repositories`
- ✅ Changes to directory structure
- ✅ New build commands or Make targets
- ✅ Changes to package.json scripts
- ✅ New configuration files at root level
- ✅ Significant pattern changes in how repositories are defined

Do NOT update for:
- ❌ Changes within existing files (content changes)
- ❌ Temporary or build artifact files
- ❌ Changes to individual repository configurations
- ❌ Minor documentation updates in other files

### Update Process

When making updates to this file:

1. Preserve the existing structure and formatting
2. Use the same markdown conventions
3. Keep descriptions concise and actionable
4. Maintain alphabetical ordering where applicable
5. Test that all referenced paths actually exist
6. Ensure consistency between related sections

### Example Update

**Before:**
```
/repositories/
├── index.ts
├── applications.ts
└── libraries.ts
```

**After discovering a new file:**
```
/repositories/
├── index.ts
├── applications.ts
├── libraries.ts
└── databases.ts                # Database-related repositories
```

## Additional Context

- **Pulumi Stack**: The project uses a "prod" stack for production infrastructure
- **Protection**: Many resources use `{ protect: true }` to prevent accidental deletion
- **Integration IDs**: GitHub App integration IDs are centrally defined in `/components/index.ts`
- **Repository Count**: This IaC manages 50+ GitHub repositories
- **Merge Strategy**: Most repositories prefer squash merges with PR title as commit message

## Version Information

- **Last Updated**: 2026-01-26
- **Node Version**: See `.nvmrc`
- **Pulumi Version**: See `.versions/pulumi`
- **Package Manager**: Yarn 1.22.22

---

**Note to AI Agents**: This document is designed to minimize unnecessary file system exploration. Always consult this code map first before searching for files. If you need to update this document due to discovered discrepancies, follow the self-correction protocol above.
