import './transforms';
import * as gh from '@pulumi/github';
import { integrationIds, PrivateRepo, PublicRepo } from './components';
import {
	a2b,
	accountManagementAutomation,
	akkaBootcamp,
	audio,
	azure,
	azureFunctionsNodejsLibrary,
	bitnamiCharts,
	bitnamiContainers,
	blockyController,
	blockyOperator,
	cloudProviderProxmox,
	cloudflareTunnelIngressController,
	clusterApi,
	clusterApiBootstrapProviderTalos,
	clusterApiControlPlaneProviderTalos,
	clusterApiProviderBringyourownhost,
	clusterApiProviderProxmox,
	cliwrapFsharp,
	controlPlane,
	crd2pulumi,
	docker2nix,
	dockerDotnetFsharp,
	dockerFsharp,
	dockerfilesFork,
	dotnetProxmoxClient,
	fpCs,
	fsharpGrpcCodeGenerator,
	fsharpPropertyTesting,
	gast,
	gheIac,
	gitkraken,
	goGithubMock,
	grpcDotnet,
	http,
	imaug,
	infra,
	johnstonDems,
	k3os,
	kubeletServingCertApprover,
	kubernetesWebsite,
	mageFork,
	mediabox,
	minecraftManager,
	minecraftOperator,
	multiDownloaderNxDocker,
	nilFork,
	nixpkgs,
	openapiGenerator,
	openshiftLab,
	operatorSdk,
	patchpad,
	perryOperator,
	pfsense,
	pfsenseOperator,
	piaManualConnections,
	piholeKubernetes,
	portainerNordDarkTheme,
	proxmoxClient,
	proxmoxGo,
	prowlarr,
	pseudoSealedSecrets,
	pulumi2crd,
	pulumiBun,
	pulumiCiMgmt,
	pulumiImaug,
	pulumiKubernetesTheHardWay,
	pulumiKubernetesx,
	pulumiProxmox,
	pulumiProxmoxve,
	pulumiTalos,
	pulumiTemplates,
	pulumiFork,
	qemuGuestAgentTalos,
	ressuKubePlex,
	rest,
	slackerBot,
	smarterDeviceManager,
	tdl,
	testcontainersNode,
	theclusterIo,
	unstoppableMangoGithubIo,
	utf8Json,
	ux,
	wireguardCni,
	x12,
	xmageDocker,
	xml,
} from './repositories';

const adventOfCode = new gh.Repository('advent-of-code', {
	name: 'advent-of-code',
	allowAutoMerge: true,
	allowMergeCommit: false,
	deleteBranchOnMerge: true,
	description: 'Advent of Code solutions in various languages',
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

new gh.RepositoryVulnerabilityAlerts('dotfiles', {
	repository: dotfiles.name,
}, { parent: dotfiles });

const me = new PrivateRepo('erik', { description: 'me' });

const everybodyCodes = new PublicRepo('everybody-codes', {
	description: 'Everybody Codes solutions in various languages',
});

const hosts = new PublicRepo('hosts', {
	description: 'My on-prem server infrastructure',
	// This was jank from the beginning, need to decide on a better way
	// requiredChecks: gh.getRepositoryFileOutput({
	// 	file: 'hosts.txt',
	// 	repository: 'UnstoppableMango/hosts',
	// }).apply(file => {
	// 	return file.content.trim().split('\n')
	// 		.filter(x => !['apollo', 'pik8s0a'].includes(x))
	// 		.map(x => ({
	// 			context: `pulumi (${x})`,
	// 			integrationId: integrationIds.github,
	// 		}));
	// }),
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
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
	],
});

const ouranosis = new PublicRepo('ouranosis', {
	description: 'A game-ish kinda thing',
});

const palumiWorld = new gh.Repository('palumi-world', {
	name: 'palumi-world',
	description: 'My Palworld install',
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
	accountManagementAutomation.repo.name,
	adventOfCode.name,
	akkaBootcamp.repo.name,
	audio.name,
	a2b.repo.name,
	azure.repo.name,
	azureFunctionsNodejsLibrary.repo.name,
	bitnamiCharts.repo.name,
	bitnamiContainers.repo.name,
	blockyController.name,
	blockyOperator.repo.name,
	cloudProviderProxmox.repo.name,
	cloudflareTunnelIngressController.repo.name,
	clusterApi.repo.name,
	clusterApiBootstrapProviderTalos.repo.name,
	clusterApiControlPlaneProviderTalos.repo.name,
	clusterApiProviderBringyourownhost.repo.name,
	clusterApiProviderProxmox.repo.name,
	controlPlane.repo.name,
	cliwrapFsharp.name,
	crd2pulumi.repo.name,
	dockerDotnetFsharp.name,
	dockerFsharp.name,
	dockerfilesFork.repo.name,
	dotfiles.name,
	dotnetProxmoxClient.name,
	everybodyCodes.repo.name,
	fpCs.repo.name,
	fsharpGrpcCodeGenerator.repo.name,
	fsharpPropertyTesting.name,
	gast.repo.name,
	gheIac.repo.name,
	gitkraken.repo.name,
	goGithubMock.repo.name,
	grpcDotnet.repo.name,
	hosts.repo.name,
	http.name,
	imaug.name,
	infra.name,
	johnstonDems.repo.name,
	k3os.repo.name,
	kubeletServingCertApprover.repo.name,
	kubernetesWebsite.repo.name,
	lang.repo.name,
	mageFork.repo.name,
	mangoMtg.name,
	mediabox.repo.name,
	minecraftManager.repo.name,
	minecraftOperator.name,
	multiDownloaderNxDocker.name,
	nilFork.repo.name,
	nixos.repo.name,
	nixpkgs.repo.name,
	openapiGenerator.repo.name,
	openshiftLab.repo.name,
	operatorSdk.repo.name,
	ouranosis.repo.name,
	palumiWorld.name,
	patchpad.repo.name,
	perryOperator.repo.name,
	pfsense.repo.name,
	pfsenseOperator.repo.name,
	piaManualConnections.repo.name,
	piholeKubernetes.repo.name,
	pki.repo.name,
	portainerNordDarkTheme.repo.name,
	proxmoxClient.name,
	proxmoxGo.repo.name,
	prowlarr.repo.name,
	pseudoSealedSecrets.repo.name,
	pulumi2crd.repo.name,
	pulumiBun.repo.name,
	pulumiCiMgmt.name,
	pulumiImaug.name,
	pulumiKubernetesTheHardWay.name,
	pulumiKubernetesx.repo.name,
	pulumiProxmox.name,
	pulumiProxmoxve.repo.name,
	pulumiTalos.repo.name,
	pulumiTemplates.repo.name,
	pulumiFork.repo.name,
	qemuGuestAgentTalos.repo.name,
	renovateConfig.repo.name,
	ressuKubePlex.repo.name,
	rest.name,
	resume.repo.name,
	slackerBot.repo.name,
	smarterDeviceManager.repo.name,
	tdl.name,
	testcontainersNode.repo.name,
	theCluster.name,
	theclusterIo.repo.name,
	unstoppablemango_io.name,
	unstoppableMangoGithubIo.repo.name,
	utf8Json.repo.name,
	ux.repo.name,
	wireguardCni.repo.name,
	xmageDocker.name,
	xml.name,
	x12.repo.name,
	docker2nix.repo.name,
];
