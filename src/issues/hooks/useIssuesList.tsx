import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');

  return data;
};

function useIssuesList() {
  const issuesQuery = useQuery(['issues'], getIssues);

  return { issuesQuery };
}

export default useIssuesList;
