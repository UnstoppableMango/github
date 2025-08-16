import { integrationIds, PublicRepo } from '../components';

export const terraformProviderPfSense = new PublicRepo('terraform-provider-pfsense', {
	description: 'Terraform provider for pfSense using pfrest',
	requiredChecks: [
		{ context: 'Build and Test', integrationId: integrationIds.github },
	],
});
