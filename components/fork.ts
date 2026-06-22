import { ComponentResourceOptions, Input } from '@pulumi/pulumi';
import { Repo } from './repo';

export interface ForkArgs {
	sourceOwner: Input<string>;
	sourceRepo: Input<string>;
}

export class Fork extends Repo {
	constructor(name: string, args: ForkArgs, opts?: ComponentResourceOptions) {
		super(
			'unmango:github:Fork',
			name,
			{
				overrides: {
					name,
					fork: 'true',
					sourceOwner: args.sourceOwner,
					sourceRepo: args.sourceRepo,
				},
			},
			opts,
		);

		if (opts?.urn) return; // Refreshing

		const repo = this.repo;
		const vulnerabilityAlerts = this.vulnerabilityAlerts;

		this.registerOutputs({ repo, vulnerabilityAlerts });
	}
}
