import axios from 'axios';
import queryString from 'query-string';
import { ClusterInterface, ClusterGetQueryInterface } from 'interfaces/cluster';
import { GetQueryInterface } from '../../interfaces';

export const getClusters = async (query?: ClusterGetQueryInterface) => {
  const response = await axios.get(`/api/clusters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCluster = async (cluster: ClusterInterface) => {
  const response = await axios.post('/api/clusters', cluster);
  return response.data;
};

export const updateClusterById = async (id: string, cluster: ClusterInterface) => {
  const response = await axios.put(`/api/clusters/${id}`, cluster);
  return response.data;
};

export const getClusterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/clusters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClusterById = async (id: string) => {
  const response = await axios.delete(`/api/clusters/${id}`);
  return response.data;
};
