import * as gh from '@pulumi/github';
import { CustomResourceOptions } from '@pulumi/pulumi';
import { PrivateRepo, PublicRepo } from './components';

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

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const hosts = new PublicRepo('hosts', {
	description: 'My on-prem server infrastructure',
	requiredChecks: [{
		context: 'pulumi',
		// GitHub Actions
		integrationId: 15368,
	}],
});

const iowaDems = privateRepo(
	'iowa-dems-mailer',
	'Iowa Democrats mailing application',
);

const pulumiBun = new PublicRepo('pulumi-bun', {
	description: 'Experimental Pulumi support for Bun',
});
