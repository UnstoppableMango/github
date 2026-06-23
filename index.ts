import * as gh from '@pulumi/github';
import { integrationIds, PrivateRepo, PublicRepo } from './components';
import * as applications from './repositories/applications';
import * as archived from './repositories/archived';
import * as demos from './repositories/demos';
import * as forks from './repositories/forks';
import * as fun from './repositories/fun';
import * as homelab from './repositories/homelab';
import * as libraries from './repositories/libraries';
import * as operators from './repositories/operators';
import * as pulumi from './repositories/pulumi';
import * as terraform from './repositories/terraform';
import * as utilities from './repositories/utilities';
import * as ux from './repositories/ux';
import * as work from './repositories/work';

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

export const repos = {
	applications: [
		applications.johnstonDems.repo.name,
		applications.minecraftManager.repo.name,
		applications.slackerBot.repo.name,
		applications.xmageDocker.name,
	],
	archived: [
		archived.infra.name,
		archived.minecraftOperator.name,
	],
	demos: [
		demos.fsharpPropertyTesting.name,
		demos.gheIac.repo.name,
		demos.imaug.name,
		demos.pulumiImaug.name,
	],
	forks: [
		forks.accountManagementAutomation.repo.name,
		forks.akkaBootcamp.repo.name,
		forks.azureFunctionsNodejsLibrary.repo.name,
		forks.bitnamiCharts.repo.name,
		forks.bitnamiContainers.repo.name,
		forks.clusterApi.repo.name,
		forks.clusterApiBootstrapProviderTalos.repo.name,
		forks.clusterApiControlPlaneProviderTalos.repo.name,
		forks.clusterApiProviderBringyourownhost.repo.name,
		forks.clusterApiProviderProxmox.repo.name,
		forks.cloudProviderProxmox.repo.name,
		forks.cloudflareTunnelIngressController.repo.name,
		forks.crd2pulumi.repo.name,
		forks.dockerfilesFork.repo.name,
		forks.fsharpGrpcCodeGenerator.repo.name,
		forks.gitkraken.repo.name,
		forks.goGithubMock.repo.name,
		forks.grpcDotnet.repo.name,
		forks.k3os.repo.name,
		forks.kubeletServingCertApprover.repo.name,
		forks.kubernetesWebsite.repo.name,
		forks.mageFork.repo.name,
		forks.mediabox.repo.name,
		forks.nilFork.repo.name,
		forks.nixpkgs.repo.name,
		forks.openapiGenerator.repo.name,
		forks.operatorSdk.repo.name,
		forks.piholeKubernetes.repo.name,
		forks.portainerNordDarkTheme.repo.name,
		forks.proxmoxGo.repo.name,
		forks.prowlarr.repo.name,
		forks.pulumiFork.repo.name,
		forks.pulumiKubernetesx.repo.name,
		forks.pulumiProxmoxve.repo.name,
		forks.pulumiTalos.repo.name,
		forks.pulumiTemplates.repo.name,
		forks.qemuGuestAgentTalos.repo.name,
		forks.ressuKubePlex.repo.name,
		forks.smarterDeviceManager.repo.name,
		forks.testcontainersNode.repo.name,
		forks.unstoppableMangoGithubIo.repo.name,
		forks.utf8Json.repo.name,
	],
	fun: [
		fun.audio.name,
		fun.fpCs.repo.name,
		fun.http.name,
		fun.rest.name,
		fun.x12.repo.name,
		fun.xml.name,
	],
	homelab: [
		homelab.azure.repo.name,
		homelab.controlPlane.repo.name,
		homelab.pfsense.repo.name,
		homelab.theclusterIo.repo.name,
	],
	libraries: [
		libraries.cliwrapFsharp.name,
		libraries.dockerDotnetFsharp.name,
		libraries.dockerFsharp.name,
		libraries.dotnetProxmoxClient.name,
		libraries.proxmoxClient.name,
	],
	operators: [
		operators.blockyController.name,
		operators.blockyOperator.repo.name,
		operators.perryOperator.repo.name,
		operators.pfsenseOperator.repo.name,
		operators.pseudoSealedSecrets.repo.name,
	],
	pulumi: [
		pulumi.pulumiCiMgmt.name,
		pulumi.pulumiKubernetesTheHardWay.name,
		pulumi.pulumiProxmox.name,
	],
	utilities: [
		utilities.multiDownloaderNxDocker.name,
		utilities.patchpad.repo.name,
		utilities.piaManualConnections.repo.name,
		utilities.pulumiBun.repo.name,
		utilities.wireguardCni.repo.name,
	],
	ux: [
		ux.a2b.repo.name,
		ux.docker2nix.repo.name,
		ux.gast.repo.name,
		ux.pulumi2crd.repo.name,
		ux.tdl.name,
		ux.ux.repo.name,
	],
	terraform: [
		terraform.terraformProviderPfSense.repo.name,
	],
	work: [
		work.openshiftLab.repo.name,
	],
	root: [
		adventOfCode.name,
		dotfiles.name,
		everybodyCodes.repo.name,
		hosts.repo.name,
		lang.repo.name,
		mangoMtg.name,
		me.repo.name,
		nixos.repo.name,
		ouranosis.repo.name,
		palumiWorld.name,
		pki.repo.name,
		renovateConfig.repo.name,
		resume.repo.name,
		theCluster.name,
		unstoppablemango_io.name,
	],
};
