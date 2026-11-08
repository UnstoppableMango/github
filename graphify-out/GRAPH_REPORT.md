# Graph Report - github  (2026-11-08)

## Corpus Check
- Corpus is ~7,440 words - fits in a single context window. You may not need a graph.

## Summary
- 268 nodes · 464 edges · 15 communities
- Extraction: 96% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.88)
- Token cost: 91,940 input · 0 output

## Community Hubs (Navigation)
- Repo index and forks
- Repo conventions and CI
- Repo components
- Archived, demo and operator repos
- Package dependencies
- TypeScript config
- Utility repos
- Codegen UX repos
- Library repos
- Personal repos
- Renovate config
- Fun repos
- Homelab repos
- Pulumi repos
- ESLint TypeScript config

## God Nodes (most connected - your core abstractions)
1. `PublicRepo` - 17 edges
2. `@pulumi/github` - 15 edges
3. `integrationIds` - 14 edges
4. `compilerOptions` - 13 edges
5. `AI Agent Instructions (AGENTS.md)` - 9 edges
6. `Repo` - 8 edges
7. `PrivateRepo` - 6 edges
8. `add-repo Skill` - 6 edges
9. `@pulumi/pulumi` - 5 edges
10. `PublicRepo` - 5 edges

## Surprising Connections (you probably didn't know these)
- `add-repo Skill` --semantically_similar_to--> `Adding New Repositories Procedure`  [INFERRED] [semantically similar]
  .claude/skills/add-repo/SKILL.md → AGENTS.md
- `Repository Categories` --semantically_similar_to--> `Repository Category Files`  [INFERRED] [semantically similar]
  .claude/skills/add-repo/SKILL.md → README.md
- `PublicRepo` --semantically_similar_to--> `PublicRepo Component Defaults`  [INFERRED] [semantically similar]
  .claude/skills/add-repo/SKILL.md → README.md
- `integrationIds` --semantically_similar_to--> `Integration IDs (components/index.ts)`  [INFERRED] [semantically similar]
  .claude/skills/add-repo/SKILL.md → AGENTS.md
- `Default Required Check 'build'` --semantically_similar_to--> `AI Agent Instructions (AGENTS.md)`  [INFERRED] [semantically similar]
  .claude/skills/add-repo/SKILL.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **User-owned Repo Authentication (PAT over GitHub App)** — agents_github_app_auth_gotcha, pulumi_prod_github_token, pulumi_prod_github_owner [EXTRACTED 1.00]
- **Add Repository Flow** — _claude_skills_add_repo_skill_add_repo, _claude_skills_add_repo_skill_repository_categories, _claude_skills_add_repo_skill_publicrepo, _claude_skills_add_repo_skill_privaterepo, _claude_skills_add_repo_skill_repos_array [EXTRACTED 1.00]
- **vcs Migration Drift-check Mode** — readme_vcs_migration, _github_workflows_ci_pulumi, _github_workflows_ci_pulumi_auth_actions, agents_prod_stack [INFERRED 0.85]

## Communities (15 total, 0 thin omitted)

### Community 0 - "Repo index and forks"
Cohesion: 0.06
Nodes (57): adventOfCode, everybodyCodes, lang, mangoMtg, ouranosis, palumiWorld, renovateConfig, repos (+49 more)

### Community 1 - "Repo conventions and CI"
Cohesion: 0.09
Nodes (24): add-repo Skill, integrationIds, PrivateRepo, PublicRepo, repos Array (index.ts), Repository Categories, CI Workflow, nix CI Job (nix flake check) (+16 more)

### Community 2 - "Repo components"
Cohesion: 0.11
Nodes (19): Fork, ForkArgs, PrivateRepo, PrivateRepoArgs, getRequiredStatusChecks(), PublicRepo, PublicRepoArgs, Repo (+11 more)

### Community 3 - "Archived, demo and operator repos"
Cohesion: 0.09
Nodes (18): integrationIds, infra, minecraftOperator, ansibleOrchard, fsharpPropertyTesting, gheIac, imaug, pulumiImaug (+10 more)

### Community 4 - "Package dependencies"
Cohesion: 0.10
Nodes (20): dependencies, @pulumi/github, @pulumi/pulumi, devDependencies, eslint, @eslint/js, @types/node, typescript (+12 more)

### Community 5 - "TypeScript config"
Cohesion: 0.13
Nodes (14): compilerOptions, experimentalDecorators, forceConsistentCasingInFileNames, module, moduleResolution, noFallthroughCasesInSwitch, noImplicitReturns, outDir (+6 more)

### Community 6 - "Utility repos"
Cohesion: 0.14
Nodes (13): devcontainers, edd, fenced, forkctl, goreleaser2nix, gossamer2nix, ideas, multiDownloaderNxDocker (+5 more)

### Community 7 - "Codegen UX repos"
Cohesion: 0.17
Nodes (11): a2b, docker2nix, gast, goProtocmd, openapi2go, openapi2terraform, pulumi2crd, sql2csharp (+3 more)

### Community 8 - "Library repos"
Cohesion: 0.20
Nodes (9): cliwrapFsharp, commandLineExtensions, dockerDotnetFsharp, dockerFsharp, dotnetProxmoxClient, godec, ihfs, nix (+1 more)

### Community 9 - "Personal repos"
Cohesion: 0.20
Nodes (9): dotfiles, hosts, me, nixos, pki, relationships, resume, travel (+1 more)

### Community 10 - "Renovate config"
Cohesion: 0.22
Nodes (8): automerge, extends, nix, enabled, packageRules, $schema, config:recommended, github>UnstoppableMango/renovate-config

### Community 11 - "Fun repos"
Cohesion: 0.25
Nodes (7): audio, fpCs, http, ocamlGo, rest, x12, xml

### Community 12 - "Homelab repos"
Cohesion: 0.25
Nodes (7): azure, cairn, controlPlane, inoculant, pfsense, theclusterIo, theclusterLan

### Community 13 - "Pulumi repos"
Cohesion: 0.25
Nodes (7): pulumi2nix, pulumiCiMgmt, pulumiComponents, pulumiKubernetesTheHardWay, pulumiProviderGit, pulumiProxmox, vcs

### Community 14 - "ESLint TypeScript config"
Cohesion: 0.29
Nodes (6): ./tsconfig.json, compilerOptions, allowJs, noEmit, extends, include

## Ambiguous Edges - Review These
- `add-repo Skill` → `Retirement in favor of unmango/pulumi/vcs`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to
- `github:token (Classic PAT)` → `github README`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **8 isolated node(s):** `config:recommended`, `github>UnstoppableMango/renovate-config`, `@types/node`, `typescript`, `./tsconfig.json` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 80 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@pulumi/github` connect `Repo components` to `Repo index and forks`, `Archived, demo and operator repos`, `Package dependencies`, `Utility repos`, `Codegen UX repos`, `Library repos`, `Personal repos`, `Fun repos`, `Pulumi repos`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `config:recommended`, `github>UnstoppableMango/renovate-config`, `@types/node` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Repo index and forks` be split into smaller, more focused modules?**
  _Cohesion score 0.06078316773816481 - nodes in this community are weakly interconnected._
- **Why does `PublicRepo` connect `Repo components` to `Repo index and forks`, `Archived, demo and operator repos`, `Utility repos`, `Codegen UX repos`, `Library repos`, `Personal repos`, `Fun repos`, `Homelab repos`, `Pulumi repos`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `Repo conventions and CI` be split into smaller, more focused modules?**
  _Cohesion score 0.09274193548387097 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `add-repo Skill` and `Retirement in favor of unmango/pulumi/vcs`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `github:token (Classic PAT)` and `github README`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._