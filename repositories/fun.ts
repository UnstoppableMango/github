import * as gh from '@pulumi/github';
import { PublicRepo } from '../components';

export const audio = new gh.Repository('audio', {
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

export const http = new gh.Repository('http', {
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

export const rest = new gh.Repository('rest', {
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

export const xml = new gh.Repository('xml', {
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

export const ocamlGo = new PublicRepo('ocaml-go', {
	description: 'An implementation of Go in OCaml for fun',
	topics: ['go', 'ocaml', 'practice', 'ast', 'parser', 'lexer'],
});
