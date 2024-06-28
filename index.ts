import * as gh from "@pulumi/github";

const tlsRepo = new gh.Repository("tls", {
	allowAutoMerge: true,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	allowSquashMerge: true,
	description: "My TLS infrastructure",
	deleteBranchOnMerge: true,
	hasDiscussions: false,
	hasIssues: true,
	hasProjects: false,
	hasWiki: false,
	licenseTemplate: "mit",
	name: "tls",
	squashMergeCommitMessage: "COMMIT_MESSAGES",
	squashMergeCommitTitle: "COMMIT_OR_PR_TITLE",
	visibility: "private",
}, {
	protect: true,
});
