import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({ state, labels, page = 1 }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

function useIssuesList({ state, labels }: Props) {
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery(['issues', { state, labels, page }], () => getIssues({ state, labels, page }));

  useEffect(() => {
    setPage(1);
  }, [state, labels]);
  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return { issuesQuery, page: issuesQuery.isFetching ? 'Loading...' : page, nextPage, prevPage };
}

export default useIssuesList;
