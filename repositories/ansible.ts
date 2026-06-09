import { integrationIds, PublicRepo } from '../components';

export const ansibleOrchard = new PublicRepo('ansible-orchard', {
	description: 'Collection of Ansible playbooks for infrastructure and apps',
	topics: ['ansible', 'playbooks', 'automation', 'infrastructure'],
	requiredChecks: [
		{ context: 'build', integrationId: integrationIds.github },
	],
});
