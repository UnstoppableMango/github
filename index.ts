import * as gh from '@pulumi/github';
import { CustomResourceOptions } from '@pulumi/pulumi';

function privateRepo(
	name: string,
	description?: string,
	opts?: CustomResourceOptions,
): gh.Repository {
	return new gh.Repository(name, {
		name,
		description,
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
		visibility: 'private',
	}, opts);
}

const tlsRepo = privateRepo('tls', 'My TLS infrastructure', {
	protect: true,
});

const iowaDems = privateRepo(
	'iowa-dems-mailer',
	'Iowa Democrats mailing application',
);
