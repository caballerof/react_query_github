import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks';
import { timeSince } from '../../helpers';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const { user, number, state, comments, title, created_at } = issue;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const prefetchData = () => {
  //   queryClient.prefetchQuery(['issue', number], () => getIssueInfo(number));
  //   queryClient.prefetchQuery(['issue', number, 'comments'], () => getIssueComments(number));
  // };

  const preSetData = () => {
    queryClient.setQueryData(['issue', number], issue, {
      updatedAt: new Date().getTime() + 10000,
    });
  };

  return (
    <div className="card mb-2 issue" onClick={() => navigate(`/issues/issue/${number}`)} onMouseEnter={preSetData}>
      <div className="card-body d-flex align-items-center">
        {state === State.Closed ? <FiCheckCircle size={30} color="green" /> : <FiInfo size={30} color="red" />}
        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened {timeSince(created_at)} ago by <span className="fw-bold">{user.login}</span>
          </span>
          <div>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
