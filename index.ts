import * as gh from '@pulumi/github';
import { integrationIds, PrivateRepo, PublicRepo } from './components';
import {
	audio,
	blockyController,
	cliwrapFsharp,
	dockerDotnetFsharp,
	dockerFsharp,
	dotnetProxmoxClient,
	fabricTesting,
	fsharpPropertyTesting,
	gast,
	http,
	imaug,
	infra,
	johnstonDems,
	minecraftManager,
	minecraftOperator,
	multiDownloaderNxDocker,
	pcl2openapi,
	perryOperator,
	pfsense,
	pfsenseOperator,
	piaManualConnections,
	proxmoxClient,
	pulumi2crd,
	pulumiBun,
	pulumiCiMgmt,
	pulumiImaug,
	pulumiKubernetesTheHardWay,
	pulumiProxmox,
	rest,
	slackerBot,
	tdl,
	theclusterIo,
	ux,
	wireguardCni,
	xmageDocker,
	xml,
} from './repositories';

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

const dotfiles = new gh.Repository('dotfiles', {
	name: 'dotfiles',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	allowSquashMerge: true,
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
	vulnerabilityAlerts: true,
}, { protect: true });

const everybodyCodes = new PublicRepo('everybody-codes', {
	description: 'Everybody Codes solutions in various languages',
});

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

const lang = new PublicRepo('lang', {
	description: 'A programming language',
	requiredChecks: [{
		context: 'Build and Test',
		integrationId: integrationIds.github,
	}],
});

const mangoMtg = new gh.Repository('mango-mtg', {
	name: 'mango-mtg',
	description: 'Digital Magic: The Gathering',
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

const palumiWorld = new gh.Repository('palumi-world', {
	name: 'palumi-world',
	description: 'My Palworld install',
	hasDownloads: true,
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

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const renovateConfig = new PublicRepo('renovate-config', {
	description: `UnstoppableMango's Renovate presets`,
	topics: ['renovate', 'cicd', 'bun'],
	requiredChecks: [
		{ context: 'Validate', integrationId: integrationIds.github },
	],
});

const resume = new PublicRepo('resume', {
	description: 'My résumé, codified',
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
	],
}, { aliases: [{ type: 'unmango:github:PrivateRepo' }] });

const theCluster = new gh.Repository('the-cluster', {
	name: 'the-cluster',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	allowSquashMerge: true,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
	description: 'Source for THECLUSTER',
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
	webCommitSignoffRequired: true,
}, { protect: true });

const unstoppablemango_io = new gh.Repository('unstoppablemango.io', {
	name: 'unstoppablemango.io',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	deleteBranchOnMerge: true,
	description: 'A website about me for random garbage',
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

export const repos = [
	adventOfCode.name,
	audio.name,
	blockyController.name,
	cliwrapFsharp.name,
	dockerDotnetFsharp.name,
	dockerFsharp.name,
	dotfiles.name,
	dotnetProxmoxClient.name,
	everybodyCodes.repo.name,
	fabricTesting.repo.name,
	fsharpPropertyTesting.name,
	gast.repo.name,
	hosts.repo.name,
	http.name,
	imaug.name,
	infra.name,
	johnstonDems.repo.name,
	lang.repo.name,
	mangoMtg.name,
	minecraftManager.repo.name,
	minecraftOperator.name,
	multiDownloaderNxDocker.name,
	nixos.repo.name,
	ouranosis.repo.name,
	palumiWorld.name,
	pcl2openapi.repo.name,
	pfsense.repo.name,
	pulumi2crd.repo.name,
	perryOperator.repo.name,
	pfsenseOperator.repo.name,
	piaManualConnections.repo.name,
	pki.repo.name,
	proxmoxClient.name,
	pulumiBun.repo.name,
	pulumiCiMgmt.name,
	pulumiImaug.name,
	pulumiKubernetesTheHardWay.name,
	pulumiProxmox.name,
	renovateConfig.repo.name,
	resume.repo.name,
	rest.name,
	slackerBot.name,
	tdl.name,
	theCluster.name,
	theclusterIo.repo.name,
	unstoppablemango_io.name,
	ux.repo.name,
	wireguardCni.repo.name,
	xmageDocker.name,
	xml.name,
];
