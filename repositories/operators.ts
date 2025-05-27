import * as gh from '@pulumi/github';
import { integrationIds, PublicRepo } from '../components';

export const blockyController = new gh.Repository('blocky-controller', {
	name: 'blocky-controller',
	allowAutoMerge: true,
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'Blocky kubernetes controller sandbox',
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
	squashMergeCommitTitle: 'PR_TITLE',
	visibility: 'public',
}, { protect: true });

export const perryOperator = new PublicRepo('perry-operator', {
	description: `A platypus? Perry the platypus?!?`,
	topics: ['kubernetes', 'pulumi', 'operator'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

export const pfsenseOperator = new PublicRepo('pfsense-operator', {
	description: 'An operator for deploying and managing pfSense on Kubernetes',
	requiredChecks: [{
		context: 'Build and Test',
		integrationId: integrationIds.github,
	}],
});

export const plexOperator = new PublicRepo('plex-operator', {
	description: 'An operator for deploying and managing Plex on Kubernetes',
	requiredChecks: [
		{ context: 'Run On Ubuntu', integrationId: integrationIds.github },
	],
});

export const wireguardOperator = new PublicRepo('plex-operator', {
	description: 'An operator for deploying and managing Wireguard on Kubernetes',
	requiredChecks: [
		{ context: 'Run On Ubuntu', integrationId: integrationIds.github },
	],
});
