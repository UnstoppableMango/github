import * as gh from '@pulumi/github';

export const infra = new gh.Repository('infra', {
	name: 'infra',
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	hasDownloads: true,
	hasIssues: true,
	visibility: 'private',
	vulnerabilityAlerts: true,
	archived: true,
});

export const minecraftOperator = new gh.Repository('minecraft-operator', {
	description: 'An operator for managing minecraft servers on Kubernetes',
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	archived: true,
});

export const slackerBot = new gh.Repository('slacker-bot', {
	name: 'slacker-bot',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
	hasDownloads: true,
	hasIssues: true,
	hasProjects: true,
	securityAndAnalysis: {
		secretScanning: {
			status: 'disabled',
		},
		secretScanningPushProtection: {
			status: 'disabled',
		},
	},
	squashMergeCommitMessage: 'PR_BODY',
	squashMergeCommitTitle: 'PR_TITLE',
	visibility: 'public',
	vulnerabilityAlerts: true,
	archived: true,
});
