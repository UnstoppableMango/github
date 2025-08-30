import { PrivateRepo, PublicRepo } from '../components';

export const fabricTesting = new PrivateRepo('fabric-testing', {
	description: 'Fiddling with MS Fabric',
});

export const kubernetesTheWrongWay = new PublicRepo('kubernetes-the-wrong-way', {
	description: 'A CRUD API using Kubernetes APIs',
	topics: ['kubernetes', 'technically-speaking', 'rest'],
});
