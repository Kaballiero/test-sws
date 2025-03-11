import { FormikConfig, FormValues, ITreeResponse } from './TableRow.types';

export function getNestingLevel(row: ITreeResponse): number {
  return row.level || 1;
}

export function getEditFormikConfig(
  row: ITreeResponse,
  onSubmit?: (updatedRow: ITreeResponse) => void
): FormikConfig {
  return {
    initialValues: {
      rowName: row.rowName || '',
      salary: row.salary || 0,
      equipmentCosts: row.equipmentCosts || 0,
      overheads: row.overheads || 0,
      estimatedProfit: row.estimatedProfit || 0,
    },
    onSubmit: (values) => {
      onSubmit?.({ ...row, ...values });
    },
    enableReinitialize: true,
  };
}

export function getAddFormikConfig(
  parentId: number,
  onAddChild?: (parentId: number, newChild: Partial<ITreeResponse>, resetForm: () => void) => void
): FormikConfig {
  return {
    initialValues: {
      rowName: '',
      salary: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,
    },
    onSubmit: (values, { resetForm }) => {
      onAddChild?.(parentId, values, resetForm);
    },
  };
}