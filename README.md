# github

My GitHub organization settings and repositories, managed as code.

## What is this?

Instead of clicking around in GitHub's UI to configure repositories (setting branch protection rules, enabling vulnerability alerts, choosing merge strategies), all of that is declared here in TypeScript files and applied automatically.

This is **Infrastructure as Code (IaC)**: infrastructure configuration (GitHub repos and their settings) lives in version-controlled code rather than someone's memory or a wiki. Changes go through a preview step before applying, history is tracked in git, and the desired state is always readable.

## How it works

This project uses [Pulumi](https://www.pulumi.com/), which lets you write infrastructure configuration in a real programming language instead of YAML or JSON. If you know TypeScript, you already understand the syntax. It's just objects and classes.

Each repository is defined something like this:

```ts
const nixos = new PublicRepo('nixos', {
	description: 'My NixOS source',
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
	],
});
```

That one declaration creates the GitHub repository, sets it to public, enforces squash-only merges, requires signed commits, requires the `build` CI check to pass before merging, and enables Dependabot alerts. All from the `PublicRepo` component.

The `PublicRepo` and `PrivateRepo` components (in [`/components`](./components/)) are thin wrappers around the [Pulumi GitHub provider](https://www.pulumi.com/registry/packages/github/) that encode the defaults I want for every repo.

## Structure

Repositories are grouped by category in [`/repositories`](./repositories/):

| File              | Contents                             |
| ----------------- | ------------------------------------ |
| `applications.ts` | Personal apps and clients            |
| `homelab.ts`      | Home server / on-prem infrastructure |
| `libraries.ts`    | Reusable libraries and packages      |
| `operators.ts`    | Kubernetes operators                 |
| `pulumi.ts`       | Pulumi providers and utilities       |
| `terraform.ts`    | Terraform providers                  |
| `utilities.ts`    | One-off tools and scripts            |
| `fun.ts`          | Hobby and experiment repos           |
| `archived.ts`     | Archived / inactive repos            |

## Usage

```bash
make preview   # show what would change, without applying
make up        # apply changes
make diff      # detailed diff against current state
make refresh   # sync state from actual GitHub
make lint      # run ESLint
```

Requires a Pulumi account and a GitHub token with org admin access. See [Pulumi docs](https://www.pulumi.com/docs/get-started/) for setup.
