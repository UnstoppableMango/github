import * as gh from '@pulumi/github';
import { ComponentResourceOptions, CustomResourceOptions, Input } from '@pulumi/pulumi';
import { Repo, repo } from './repo';

export interface PrivateRepoArgs {
	description: Input<string>;
}

export class PrivateRepo extends Repo {
	constructor(name: string, args: PrivateRepoArgs, opts?: ComponentResourceOptions) {
		super('unmango:github:PrivateRepo', name, {
			overrides: {
				name,
				description: args.description,
				visibility: 'private',
			},
		}, opts);

		const repo = this.repo;

		this.registerOutputs({ repo });
	}
}

// This will stick around until I decide to figure out
// how to import the iowa dems repo into the component resource.
export function privateRepo(
	name: string,
	description: string,
	opts?: CustomResourceOptions,
): gh.Repository {
	return repo(name, {
		name,
		description,
		visibility: 'private',
		allowAutoMerge: false,
	}, opts);
}
