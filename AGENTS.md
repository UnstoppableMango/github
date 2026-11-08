# AI Agent Instructions

This document provides guidance for AI agents interacting with this repository. Start with the knowledge graph below to find files, rather than exploring the repository.

## Repository Overview

This is a Pulumi Infrastructure as Code (IaC) project written in TypeScript that manages GitHub repositories and settings for the UnstoppableMango organization.

**Key Technologies:**

- TypeScript
- Pulumi (GitHub provider)
- Yarn (package manager)
- ESLint (linting)
- Nix (development environment)

## Knowledge graph

`graphify-out/` holds a [graphify](https://github.com/Graphify-Labs/graphify) knowledge graph of this repository: code structure parsed with tree-sitter, plus the concepts and decisions in its docs.
Read `graphify-out/GRAPH_REPORT.md` before exploring files. It lists the graph's communities, its most connected nodes, and links between them you might not expect.
Ask the graph before searching: `graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<name>"`.
`graphify` is in the dev shell, from `unmango/pkgs`.

A pull request that changes code or docs rebuilds the graph and commits it in the same pull request.
`graphify update .` re-extracts code without an LLM.
After a doc change, run the graphify skill with `--update` in an agent session (`graphify install` adds the skill), so the docs are read again.
Commit `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`, and `graphify-out/.graphify_labels.json`, which keeps the community names across rebuilds; the rest of `graphify-out/` is ignored.
`unmango/architecture` merges this graph with the other source control repositories' graphs.

## Common Operations

### Building and Linting

```bash
make lint          # Run ESLint on all TypeScript files
make format        # Format code with nix fmt (via treefmt-nix)
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

## Additional Context

- **Pulumi Stack**: The project uses a "prod" stack for production infrastructure
- **Protection**: Many resources use `{ protect: true }` to prevent accidental deletion
- **Integration IDs**: GitHub App integration IDs are centrally defined in `/components/index.ts`
- **Repository Count**: This IaC manages 50+ GitHub repositories
- **Merge Strategy**: Most repositories prefer squash merges with PR title as commit message

## Version Information

- **Node Version**: See `.nvmrc`
- **Pulumi Version**: See `.versions/pulumi`
- **Package Manager**: Yarn 1.22.22

---

**Formatting**: Always run `nix fmt` before opening a PR. Formatting is enforced by `nix flake check` (via treefmt-nix) in CI. The `nix fmt` command runs prettier (TypeScript, JSON, Markdown) and nixfmt (Nix files).

Default required check context: 'build' (lowercase). This is used unless a repository specifies a different check context.

## Gotchas

### GitHub App auth doesn't work here

Repos are owned by a personal user account (`UnstoppableMango`), not a GitHub org. Creating user repos requires `POST /user/repos`, which only accepts user-authenticated tokens. GitHub App installation tokens are server-to-server and cannot call user-centric endpoints — no amount of app permissions fixes this.

Use a classic PAT with repo admin scope, set via `github:token` in `Pulumi.prod.yaml`.
