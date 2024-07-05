import * as gh from '@pulumi/github';
import { ComponentResource, ComponentResourceOptions, Input } from '@pulumi/pulumi';

interface RepoArgs {
	overrides: Partial<gh.RepositoryArgs>;
}

abstract class Repo extends ComponentResource {
	public readonly repo!: gh.Repository;

	constructor(type: string, name: string, args: RepoArgs, opts?: ComponentResourceOptions) {
		super(type, name, args, opts);
		if (opts?.urn) return; // Refreshing

		const repo = new gh.Repository(name, {
			allowAutoMerge: true,
			allowMergeCommit: false,
			allowRebaseMerge: false,
			allowSquashMerge: true,
			deleteBranchOnMerge: true,
			hasDiscussions: false,
			hasIssues: true,
			hasProjects: false,
			hasWiki: false,
			licenseTemplate: 'mit',
			squashMergeCommitMessage: 'COMMIT_MESSAGES',
			squashMergeCommitTitle: 'COMMIT_OR_PR_TITLE',
			...args.overrides,
		}, { parent: this });

		this.repo = repo;
	}
}

export interface PrivateRepoArgs {
	description: Input<string>;
}

export class PrivateRepo extends Repo {
	constructor(name: string, args: PrivateRepoArgs, opts?: ComponentResourceOptions) {
		super('unmango:github:PrivateRepo', name, {
			overrides: {
				name,
				description: args.description,
				visibility: 'private',
			},
		}, opts);

		const repo = this.repo;

		this.registerOutputs({ repo });
	}
}

export interface PublicRepoArgs {
	description: Input<string>;
}

export class PublicRepo extends Repo {
	public readonly mainRuleset: gh.RepositoryRuleset;

	constructor(name: string, args: PublicRepoArgs, opts?: ComponentResourceOptions) {
		super('unmango:github:PrivateRepo', name, {
			overrides: {
				name,
				description: args.description,
				visibility: 'public',
			},
		}, opts);

		const repo = this.repo;

		const mainRuleset = new gh.RepositoryRuleset(name, {
			name: 'main',
			repository: repo.name,
			enforcement: 'active',
			target: 'branch',
			conditions: {
				refName: {
					includes: ['~DEFAULT_BRANCH'],
					excludes: [],
				},
			},
			rules: {
				deletion: true,
				pullRequest: {
					dismissStaleReviewsOnPush: true,
					requiredReviewThreadResolution: true,
					requireLastPushApproval: true,
				},
				nonFastForward: true,
				requiredLinearHistory: true,
				requiredSignatures: true,
				requiredStatusChecks: {
					requiredChecks: [{
						context: 'Main',
					}],
				},
			},
		}, { parent: this });

		this.mainRuleset = mainRuleset;

		this.registerOutputs({
			repo,
			mainRuleset,
		});
	}
}
