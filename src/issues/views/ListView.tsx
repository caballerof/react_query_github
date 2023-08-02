import { useState } from 'react';

import LoadingIcon from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesList } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery, page, nextPage, prevPage } = useIssuesList({ state, labels: selectedLabels });

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
            issues={issuesQuery.data || []}
            state={state}
            handleChangeState={(newState) => setState(newState)}
          />
        )}
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button className="btn btn-outline-primary" disabled={issuesQuery.isFetching} onClick={prevPage}>
            Previous
          </button>
          <span>{page}</span>
          <button className="btn btn-outline-primary" disabled={issuesQuery.isFetching} onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} handleChange={(labelName) => onLabelChange(labelName)} />
      </div>
    </div>
  );
};
