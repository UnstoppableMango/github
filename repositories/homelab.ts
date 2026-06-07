import { integrationIds, PrivateRepo, PublicRepo } from '../components';

export const pfsense = new PrivateRepo('pfsense', {
	description: 'pfSense configuration',
});

export const controlPlane = new PrivateRepo('control-plane', {
	description: 'Control plane infrastructure configuration',
});

export const theclusterIo = new PublicRepo('thecluster.io', {
	description: 'Web portal to THECLUSTER',
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

export const theclusterLan = new PublicRepo('thecluster.lan', {
	description: 'THECLUSTER in your area',
	requiredChecks: [
		{ context: 'api', integrationId: integrationIds.github },
		{ context: 'web', integrationId: integrationIds.github },
		{ context: 'docker', integrationId: integrationIds.github },
		{ context: 'nix', integrationId: integrationIds.github },
		{ context: 'helm', integrationId: integrationIds.github },
	],
});
