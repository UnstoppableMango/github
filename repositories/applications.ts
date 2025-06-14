import * as gh from '@pulumi/github';
import { integrationIds, PrivateRepo, PublicRepo } from '../components';

export const minecraftManager = new PublicRepo('minecraft-manager', {
	description: 'Visual management tool for deploying Minecraft servers across various platforms',
	topics: ['minecraft', 'kubernetes', 'docker', 'helm', 'bun', 'react', 'tailwindcss'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
		{ context: 'Build and Test API', integrationId: integrationIds.github },
		{ context: 'Docker', integrationId: integrationIds.github },
		{ context: 'Helm', integrationId: integrationIds.github },
	],
});

export const johnstonDems = new PrivateRepo('johnston-dems-mailer', {
	description: 'Johnston Democrats mailing application',
});

export const xmageDocker = new gh.Repository('xmage-docker', {
	name: 'xmage-docker',
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
	visibility: 'public',
}, { protect: true });
