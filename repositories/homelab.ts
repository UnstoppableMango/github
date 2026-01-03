import { integrationIds, PrivateRepo, PublicRepo } from "../components";

export const pfsense = new PrivateRepo("pfsense", {
	description: "pfSense configuration",
});

export const theclusterIo = new PublicRepo("thecluster.io", {
	description: "Web portal to THECLUSTER",
	requiredChecks: [
		{ context: "Build and Test", integrationId: integrationIds.github },
	],
});

export const theclusterLan = new PublicRepo("thecluster.lan", {
	description: "THECLUSTER in your area",
	requiredChecks: [
		{ context: "Build and Test", integrationId: integrationIds.github },
	],
});
