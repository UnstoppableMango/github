import * as gh from '@pulumi/github';
import { integrationIds, PublicRepo } from '../components';

export const fenced = new PublicRepo('fenced', {
	description: 'Parse code fences from anywhere',
	topics: ['go', 'markdown', 'md', 'fence', 'parser', 'tool'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
		{ context: 'Docker', integrationId: integrationIds.github },
	],
});

export const multiDownloaderNxDocker = new gh.Repository('multi-downloader-nx-docker', {
	name: 'multi-downloader-nx-docker',
	description: 'Docker image for anidl/multi-downloader-nx',
	hasIssues: true,
	securityAndAnalysis: {
		secretScanning: {
			status: 'disabled',
		},
		secretScanningPushProtection: {
			status: 'disabled',
		},
	},
	topics: [
		'anime',
		'crunchyroll',
		'docker',
		'downloader',
		'funimation',
		'utility',
	],
	visibility: 'public',
}, { protect: true });

export const piaManualConnections = new PublicRepo('pia-manual-connections', {
	description: 'Dockerized pia-foss/manual-connections scripts',
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
		{ context: 'Docker', integrationId: integrationIds.github },
	],
});

export const pulumiBun = new PublicRepo('pulumi-bun', {
	description: 'Experimental Pulumi support for Bun',
});

export const wireguardCni = new PublicRepo('wireguard-cni', {
	description: 'Wireguard CNI plugin',
});
