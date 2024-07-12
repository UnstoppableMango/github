import * as gh from '@pulumi/github';
import { PrivateRepo, privateRepo, PublicRepo } from './components';

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const hosts = new PublicRepo('hosts', {
	description: 'My on-prem server infrastructure',
	requiredChecks: [{
		context: 'pulumi',
		// GitHub Actions
		integrationId: 15368,
	}],
});

const iowaDems = privateRepo(
	'iowa-dems-mailer',
	'Iowa Democrats mailing application',
);

const pulumiBun = new PublicRepo('pulumi-bun', {
	description: 'Experimental Pulumi support for Bun',
});

export const repos = [
	pki.repo.name,
	hosts.repo.name,
	iowaDems.name,
	pulumiBun.repo.name,
];
