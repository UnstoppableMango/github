import * as pulumi from '@pulumi/pulumi';

// Fork repo names → import IDs. Remove entries after first successful `pulumi up`.
const forkImportIds: Record<string, string> = {
	'nil': 'nil',
	'go-github-mock': 'go-github-mock',
	'mage': 'mage',
	'nixpkgs': 'nixpkgs',
	'testcontainers-node': 'testcontainers-node',
	'pihole-kubernetes': 'pihole-kubernetes',
	'account-management-automation': 'account-management-automation',
	'azure-functions-nodejs-library': 'azure-functions-nodejs-library',
	'pulumi': 'pulumi',
	'crd2pulumi': 'crd2pulumi',
	'smarter-device-manager': 'smarter-device-manager',
	'pulumi-talos': 'pulumi-talos',
	'kubernetes-website': 'kubernetes-website',
	'cloudflare-tunnel-ingress-controller': 'cloudflare-tunnel-ingress-controller',
	'cluster-api-provider-proxmox': 'cluster-api-provider-proxmox',
	'grpc-dotnet': 'grpc-dotnet',
	'openapi-generator': 'openapi-generator',
	'akka-bootcamp': 'akka-bootcamp',
	'k3os': 'k3os',
	'pulumi-kubernetesx': 'pulumi-kubernetesx',
	'Prowlarr': 'Prowlarr',
	'cluster-api-bootstrap-provider-talos': 'cluster-api-bootstrap-provider-talos',
	'cluster-api': 'cluster-api',
	'cluster-api-provider-bringyourownhost': 'cluster-api-provider-bringyourownhost',
	'ressu-kube-plex': 'ressu-kube-plex',
	'pulumi-proxmoxve': 'pulumi-proxmoxve',
	'bitnami-charts': 'bitnami-charts',
	'bitnami-containers': 'bitnami-containers',
	'pulumi-templates': 'pulumi-templates',
	'qemu-guest-agent-talos': 'qemu-guest-agent-talos',
	'cluster-api-control-plane-provider-talos': 'cluster-api-control-plane-provider-talos',
	'cloud-provider-proxmox': 'cloud-provider-proxmox',
	'proxmox-go': 'proxmox-go',
	'kubelet-serving-cert-approver': 'kubelet-serving-cert-approver',
	'FSharp.GrpcCodeGenerator': 'FSharp.GrpcCodeGenerator',
	'gitkraken': 'gitkraken',
	'operator-sdk': 'operator-sdk',
	'mediabox': 'mediabox',
	'portainer-nord-dark-theme': 'portainer-nord-dark-theme',
	'Utf8Json': 'Utf8Json',
	'dockerfiles': 'dockerfiles',
	'UnstoppableMango.github.io': 'UnstoppableMango.github.io',
};

pulumi.runtime.registerStackTransformation(({ type, name, props, opts }) => {
	const importId = forkImportIds[name];
	if (!importId) return undefined;

	if (type === 'github:index/repository:Repository') {
		return {
			props,
			opts: pulumi.mergeOptions(opts, {
				import: importId,
				ignoreChanges: ['fork', 'sourceOwner', 'sourceRepo'],
			}),
		};
	}

	if (type === 'github:index/repositoryVulnerabilityAlerts:RepositoryVulnerabilityAlerts') {
		return { props, opts: pulumi.mergeOptions(opts, { import: importId }) };
	}

	return undefined;
});
