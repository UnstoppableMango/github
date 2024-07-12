import * as gh from '@pulumi/github';
import { ComponentResource, ComponentResourceOptions, CustomResourceOptions } from '@pulumi/pulumi';

export interface RepoArgs {
	overrides: Partial<gh.RepositoryArgs>;
}

export abstract class Repo extends ComponentResource {
	public readonly repo!: gh.Repository;

	constructor(type: string, name: string, args: RepoArgs, opts?: ComponentResourceOptions) {
		super(type, name, args, opts);
		if (opts?.urn) return; // Refreshing

		const repo = new gh.Repository(name, {
			// I think this isn't allowed for private repos
			allowAutoMerge: false,
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

// This will stick around until I decide to figure out
// how to import the iowa dems repo into the component resource.
export function repo(
	name: string,
	args?: Partial<gh.RepositoryArgs>,
	opts?: CustomResourceOptions,
): gh.Repository {
	return new gh.Repository(name, {
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
		...args,
	}, opts);
}
