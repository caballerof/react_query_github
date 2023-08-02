import { useState } from 'react';

import LoadingIcon from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesList } from '../hooks';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesList();

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
        {issuesQuery.isLoading ? <LoadingIcon /> : <IssueList issues={issuesQuery.data || []} />}
      </div>
      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} handleChange={(labelName) => onLabelChange(labelName)} />
      </div>
    </div>
  );
};
