import * as gh from '@pulumi/github';
import { RepositoryRulesetRules, RepositoryRulesetRulesRequiredStatusChecks } from '@pulumi/github/types/input';
import { ComponentResourceOptions, Input } from '@pulumi/pulumi';
import { Repo } from './repo';

export interface PublicRepoArgs {
	description: Input<string>;
	requiredChecks?: RepositoryRulesetRulesRequiredStatusChecks['requiredChecks'];
}

export class PublicRepo extends Repo {
	public readonly mainRuleset: gh.RepositoryRuleset;

	constructor(
		name: string,
		args: PublicRepoArgs,
		opts?: ComponentResourceOptions,
	) {
		super(
			'unmango:github:PublicRepo',
			name,
			{
				overrides: {
					name,
					description: args.description,
					visibility: 'public',
					allowAutoMerge: true,
				},
			},
			opts,
		);

		const repo = this.repo;

		const mainRuleset = new gh.RepositoryRuleset(
			name,
			{
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
					requiredStatusChecks: getRequiredStatusChecks(args.requiredChecks),
				},
			},
			{ parent: this },
		);

		this.mainRuleset = mainRuleset;

		this.registerOutputs({
			repo,
			mainRuleset,
		});
	}
}

function getRequiredStatusChecks(
	checks: PublicRepoArgs['requiredChecks'],
): RepositoryRulesetRules['requiredStatusChecks'] {
	if (!checks) return;
	return { requiredChecks: checks };
}
