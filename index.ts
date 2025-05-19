import * as gh from '@pulumi/github';
import { PrivateRepo, PublicRepo } from './components';

const integrationIds = {
	github: 15368,
};

const adventOfCode = new gh.Repository('advent-of-code', {
	name: 'advent-of-code',
	allowAutoMerge: true,
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'Advent of Code solutions in various languages',
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
	topics: ['advent-of-code'],
	visibility: 'public',
}, { protect: true });

const audio = new gh.Repository('audio', {
	name: 'audio',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	deleteBranchOnMerge: true,
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

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const hosts = new PublicRepo('hosts', {
	description: 'My on-prem server infrastructure',
	requiredChecks: gh.getRepositoryFileOutput({
		file: 'hosts.txt',
		repository: 'UnstoppableMango/hosts',
	}).apply(file => {
		return file.content.trim().split('\n')
			.filter(x => !['apollo', 'pik8s0a'].includes(x))
			.map(x => ({
				context: `pulumi (${x})`,
				integrationId: integrationIds.github,
			}));
	}),
});

const http = new gh.Repository('http', {
	name: 'http',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
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
	vulnerabilityAlerts: true,
}, { protect: true });

const johnstonDems = new PrivateRepo('johnston-dems-mailer', {
	description: 'Johnston Democrats mailing application',
});

const pulumiBun = new PublicRepo('pulumi-bun', {
	description: 'Experimental Pulumi support for Bun',
});

const everybodyCodes = new PublicRepo('everybody-codes', {
	description: 'Everybody Codes solutions in various languages',
});

const gast = new PublicRepo('gast', {
	description: 'ASTs for everyone',
	topics: ['ast', 'codegen', 'protobuf', 'grpc', 'buf'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

const lang = new PublicRepo('lang', {
	description: 'A programming language',
	requiredChecks: [{
		context: 'Build and Test',
		integrationId: integrationIds.github,
	}],
});

const minecraftOperator = new gh.Repository('minecraft-operator', {
	description: 'An operator for managing minecraft servers on Kubernetes',
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	archived: true,
});

const minecraftManager = new PublicRepo('minecraft-manager', {
	description: 'Visual management tool for deploying Minecraft servers across various platforms',
	topics: ['minecraft', 'kubernetes', 'docker', 'helm', 'bun', 'react', 'tailwindcss'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
		{ context: 'Build and Test API', integrationId: integrationIds.github },
		{ context: 'Docker (web)', integrationId: integrationIds.github },
		{ context: 'Docker (api)', integrationId: integrationIds.github },
		{ context: 'Helm', integrationId: integrationIds.github },
	],
});

const nixos = new PublicRepo('nixos', {
	description: 'My NixOS source',
	requiredChecks: [{
		context: 'Build',
		integrationId: integrationIds.github,
	}],
});

const ouranosis = new PublicRepo('ouranosis', {
	description: 'A game-ish kinda thing',
});

const perryOperator = new PublicRepo('perry-operator', {
	description: `A platypus? Perry the platypus?!?`,
	topics: ['kubernetes', 'pulumi', 'operator'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

const pfsenseOperator = new PublicRepo('pfsense-operator', {
	description: 'An operator for deploying and managing pfSense on Kubernetes',
	requiredChecks: [{
		context: 'Build and Test',
		integrationId: integrationIds.github,
	}],
});

const piaManualConnections = new PublicRepo('pia-manual-connections', {
	description: 'Dockerized pia-foss/manual-connections scripts',
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
		{ context: 'Docker', integrationId: integrationIds.github },
	],
});

const renovateConfig = new PublicRepo('renovate-config', {
	description: `UnstoppableMango's Renovate presets`,
	topics: ['renovate', 'cicd', 'bun'],
	requiredChecks: [
		{ context: 'Validate', integrationId: integrationIds.github },
	],
});

const rest = new gh.Repository('rest', {
	name: 'rest',
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'Just another .NET REST client',
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
	vulnerabilityAlerts: true,
}, { protect: true });

const slackerBot = new gh.Repository('slacker-bot', {
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
}, { protect: true });

const ux = new PublicRepo('ux', {
	description: `The universal codegen framework`,
	topics: ['codegen', 'go', 'protobuf'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

const xml = new gh.Repository('xml', {
	name: 'xml',
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'A .NET XML serializer',
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
	vulnerabilityAlerts: true,
}, { protect: true });

export const repos = [
	audio.name,
	everybodyCodes.repo.name,
	gast.repo.name,
	hosts.repo.name,
	http.name,
	johnstonDems.repo.name,
	lang.repo.name,
	minecraftManager.repo.name,
	minecraftOperator.name,
	nixos.repo.name,
	ouranosis.repo.name,
	perryOperator.repo.name,
	pfsenseOperator.repo.name,
	piaManualConnections.repo.name,
	pki.repo.name,
	pulumiBun.repo.name,
	renovateConfig.repo.name,
	rest.name,
	slackerBot.name,
	ux.repo.name,
	xml.name,
];
