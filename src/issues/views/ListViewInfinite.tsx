import { useState } from 'react';

import LoadingIcon from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChange = (labelName: string) => {
    console.log('Changing the labels selected...');

    if (selectedLabels?.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            handleChangeState={(newState) => setState(newState)}
          />
        )}
        <button
          className="btn btn-outline-primary"
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load more...
        </button>
      </div>
      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} handleChange={(labelName) => onLabelChange(labelName)} />
      </div>
    </div>
  );
};
