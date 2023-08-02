import { FC } from 'react';
import LoadingIcon from '../../shared/components/LoadingIcon';
import useLabels from '../hooks/useLabels';

interface Props {
  selectedLabels: string[];
  handleChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, handleChange }) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      {labelsQuery.data?.map((label) => {
        const { id, color, name } = label;

        return (
          <span
            key={id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(name) ? 'label-active' : ''}`}
            style={{ border: `1px solid #${color}`, color: `#${color}` }}
            onClick={() => handleChange(name)}
          >
            {name}
          </span>
        );
      })}
    </>
  );
};
