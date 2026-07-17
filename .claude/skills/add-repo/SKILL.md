---
name: add-repo
description: >
  Add a new GitHub repository to this Pulumi IaC project (UnstoppableMango/github).
  Use when user says "add a repo", "new repository", "add repository", "create repo", or invokes /add-repo.
  Auto-triggers when asked to add a GitHub repo to the Pulumi stack.
---

Add a new GitHub repository to the Pulumi IaC project. Follow these steps exactly.

## Step 1: Gather Info

If not already provided, ask for:

| Field | Required | Notes |
|-------|----------|-------|
| Repo name | Yes | kebab-case; becomes the GitHub repo name |
| Description | Yes | Short string |
| Visibility | Yes | `public` or `private` |
| Category | Yes | See categories below |
| Topics | No | Array of strings; public repos only |
| Required checks | No | Public repos only; omit to skip CI enforcement |

**Categories** (maps to `/repositories/<category>.ts`):
`applications`, `demos`, `fun`, `homelab`, `libraries`, `operators`, `pulumi`, `terraform`, `utilities`, `ux`, `work`

## Step 2: Write the Definition

Add an exported const to `/repositories/<category>.ts`.

Export name = camelCase of the repo name (e.g. `my-new-thing` → `myNewThing`).

**Public repo with topics and required checks:**
```typescript
export const myNewThing = new PublicRepo('my-new-thing', {
  description: 'Does the thing',
  topics: ['topic-a', 'topic-b'],
  requiredChecks: [
    { context: 'build', integrationId: integrationIds.github },
  ],
});
```

**Public repo (no CI check):**
```typescript
export const myNewThing = new PublicRepo('my-new-thing', {
  description: 'Does the thing',
});
```

**Private repo:**
```typescript
export const myNewThing = new PrivateRepo('my-new-thing', {
  description: 'Does the thing',
});
```

Imports are already at the top of each category file. `PublicRepo`, `PrivateRepo`, and `integrationIds` come from `../components`.

## Step 3: Add to repos Array

In `index.ts`, add `myNewThing.repo.name,` to the `repos` array. Keep it **alphabetically sorted** with surrounding entries.

`PublicRepo` and `PrivateRepo` instances always use `.repo.name`. Raw `gh.Repository` instances use `.name` directly — but prefer the component wrappers for new repos.

Also add the import for the new export to the named imports from `./repositories` at the top of `index.ts`.

## Step 4: Verify

Run `make lint` to confirm no TypeScript errors.

## Boundaries

- Default required check context is `'build'` (lowercase) with `integrationId: integrationIds.github`
- Do not use raw `gh.Repository` for new repos — use `PublicRepo` or `PrivateRepo`
- `/repositories/index.ts` uses `export *` — no changes needed there
- Do not create the GitHub repo itself; Pulumi does that on `make up`
