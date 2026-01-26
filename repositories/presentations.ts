import * as gh from '@pulumi/github';

export const fsharpPropertyTesting = new gh.Repository('fsharp-property-testing', {
	name: 'fsharp-property-testing',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
	description: 'Lightning talk for property testing in F#',
	securityAndAnalysis: {
		secretScanning: {
			status: 'enabled',
		},
		secretScanningPushProtection: {
			status: 'enabled',
		},
	},
	squashMergeCommitTitle: 'PR_TITLE',
	visibility: 'public',
}, { protect: true });

export const imaug = new gh.Repository('imaug', {
	name: 'imaug',
	description: 'Code used in presentations for the Iowa Microsoft Azure User Group',
	hasIssues: true,
	hasProjects: true,
	hasWiki: true,
	securityAndAnalysis: {
		secretScanning: {
			status: 'enabled',
		},
		secretScanningPushProtection: {
			status: 'enabled',
		},
	},
	visibility: 'public',
}, { protect: true });

export const pulumiImaug = new gh.Repository('pulumi-imaug', {
	name: 'pulumi-imaug',
	allowAutoMerge: true,
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'A Pulumi component provider for the Iowa Microsoft Azure User Group presentation',
	hasIssues: true,
	securityAndAnalysis: {
		secretScanning: {
			status: 'enabled',
		},
		secretScanningPushProtection: {
			status: 'enabled',
		},
	},
	squashMergeCommitTitle: 'PR_TITLE',
	template: {
		owner: 'pulumi',
		repository: 'pulumi-component-provider-ts-boilerplate',
	},
	visibility: 'public',
}, { protect: true });
