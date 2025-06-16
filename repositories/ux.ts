import * as gh from '@pulumi/github';
import { integrationIds, PublicRepo } from '../components';

export const gast = new PublicRepo('gast', {
	description: 'ASTs for everyone',
	topics: ['ast', 'codegen', 'protobuf', 'grpc', 'buf'],
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});

// Not sure why I started with this, the goal is to convert package specs
// to CRDs. I'll generalize it to PCL/OpenAPI if the need arises...
export const pcl2openapi = new PublicRepo('pcl2openapi', {
	description: 'Converts Pulumi Configuration Language (PCL) to OpenAPI',
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
		{ context: 'lint', integrationId: integrationIds.github },
		{ context: 'docker', integrationId: integrationIds.github },
	],
});

export const pulumi2crd = new PublicRepo('pulumi2crd', {
	description: 'Converts Pulumi package specs to Custom Resource Definitions (CRDs)',
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
		{ context: 'lint', integrationId: integrationIds.github },
		{ context: 'docker', integrationId: integrationIds.github },
	],
});

export const tdl = new gh.Repository('tdl', {
	name: 'tdl',
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowUpdateBranch: true,
	deleteBranchOnMerge: true,
	description: 'Type description language and codegen suite',
	hasDownloads: true,
	hasIssues: true,
	hasProjects: true,
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
	webCommitSignoffRequired: true,
}, { protect: true });

export const terraform2crd = new PublicRepo('pulumi2crd', {
	description: 'Converts Terraform provider code specs to Custom Resource Definitions (CRDs)',
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
		{ context: 'lint', integrationId: integrationIds.github },
		{ context: 'docker', integrationId: integrationIds.github },
	],
});

export const ux = new PublicRepo('ux', {
	description: `The universal codegen framework`,
	topics: ['codegen', 'go', 'protobuf'],
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
		{ context: 'lint', integrationId: integrationIds.github },
		{ context: 'docker', integrationId: integrationIds.github },
		{ context: 'buf', integrationId: integrationIds.github },
		{ context: 'clean', integrationId: integrationIds.github },
	],
});
