import * as gh from '@pulumi/github';

export const pulumiCiMgmt = new gh.Repository('pulumi-ci-mgmt', {
	name: 'pulumi-ci-mgmt',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
	description: 'CI automation for Pulumi providers based on pulumi/ci-mgmt',
	hasDownloads: true,
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
	visibility: 'public',
}, { protect: true });

export const pulumiKubernetesTheHardWay = new gh.Repository('pulumi-kubernetes-the-hard-way', {
	name: 'pulumi-kubernetes-the-hard-way',
	allowAutoMerge: true,
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'A Pulumi component provider that implements Kelsey Hightower\'s Kubernetes the Hard Way',
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
	squashMergeCommitTitle: 'PR_TITLE',
	template: {
		owner: 'pulumi',
		repository: 'pulumi-component-provider-go-boilerplate',
	},
	visibility: 'public',
}, { protect: true });

export const pulumiProxmox = new gh.Repository('pulumi-proxmox', {
	name: 'pulumi-proxmox',
	hasDownloads: true,
	hasIssues: true,
	securityAndAnalysis: {
		secretScanning: {
			status: 'disabled',
		},
		secretScanningPushProtection: {
			status: 'disabled',
		},
	},
	template: {
		owner: 'pulumi',
		repository: 'pulumi-component-provider-ts-boilerplate',
	},
	visibility: 'public',
}, { protect: true });
