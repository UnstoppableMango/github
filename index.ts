import * as gh from '@pulumi/github';
import { CustomResourceOptions } from '@pulumi/pulumi';
import { PrivateRepo } from './components';

function repo(
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

function publicRepo(
	name: string,
	description: string,
	opts?: CustomResourceOptions,
): gh.Repository {
	return repo(name, {
		name,
		description,
		visibility: 'public',
	}, opts);
}

function privateRepo(
	name: string,
	description: string,
	opts?: CustomResourceOptions,
): gh.Repository {
	return repo(name, {
		name,
		description,
		visibility: 'private',
	}, opts);
}

function mainRuleset(name: string, repo: gh.Repository): gh.RepositoryRuleset {
	return new gh.RepositoryRuleset(name, {
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
	});
}

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const iowaDems = privateRepo(
	'iowa-dems-mailer',
	'Iowa Democrats mailing application',
);

const pulumiBun = publicRepo(
	'pulumi-bun',
	'Experimental Pulumi support for Bun',
);

const pulumiBunRuleset = mainRuleset('pulumi-bun', pulumiBun);
