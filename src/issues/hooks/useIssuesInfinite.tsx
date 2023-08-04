import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers';
import { githubApi } from '../../api/githubApi';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  await sleep(2);

  const [, , arg] = queryKey;
  const { state, labels } = arg as Props;

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

function useIssuesInfinite({ state, labels }: Props) {
  const issuesQuery = useInfiniteQuery(['issues', 'infinite', { state, labels }], getIssues, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;

      return pages.length + 1;
    },
  });

  return { issuesQuery };
}

export default useIssuesInfinite;
