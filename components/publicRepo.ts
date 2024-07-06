import * as gh from '@pulumi/github';
import { ComponentResourceOptions, Input } from '@pulumi/pulumi';
import { Repo } from './repo';

export interface PublicRepoArgs {
	description: Input<string>;
}

export class PublicRepo extends Repo {
	public readonly mainRuleset: gh.RepositoryRuleset;

	constructor(name: string, args: PublicRepoArgs, opts?: ComponentResourceOptions) {
		super('unmango:github:PrivateRepo', name, {
			overrides: {
				name,
				description: args.description,
				visibility: 'public',
				allowAutoMerge: true,
			},
		}, opts);

		const repo = this.repo;

		const mainRuleset = new gh.RepositoryRuleset(name, {
			name: 'main',
			repository: repo.name,
			enforcement: 'active',
			target: 'branch',
			conditions: {
				refName: {
					includes: ['~DEFAULT_BRANCH'],
					excludes: [],
				},
			},
			rules: {
				deletion: true,
				pullRequest: {
					dismissStaleReviewsOnPush: true,
					requiredReviewThreadResolution: true,
					requireLastPushApproval: true,
				},
				nonFastForward: true,
				requiredLinearHistory: true,
				requiredSignatures: true,
				requiredStatusChecks: {
					requiredChecks: [{
						context: 'Main',
					}],
				},
			},
		}, { parent: this });

		this.mainRuleset = mainRuleset;

		this.registerOutputs({
			repo,
			mainRuleset,
		});
	}
}
