import { FormikHelpers } from 'formik';

export interface ITreeResponse {
  id: number;
  rowName?: string;
  salary?: number;
  equipmentCosts?: number;
  overheads?: number;
  estimatedProfit?: number;
  level?: number;
}

export interface TableRowProps {
  row: ITreeResponse;
  onSubmit: (updatedRow: ITreeResponse) => void;
  onAddChild: (parentId: number, newChild: Partial<ITreeResponse>, resetForm: () => void) => void;
  onDeleteRow: (rowId: number) => void;
  isEditing: boolean;
  isAdding: boolean;
  onEditStart: (rowId: number) => void;
  onAddStart: (rowId: number) => void;
  onCancel: () => void;
  lineCount:number
  isFirst?:boolean
}

// Уточняем, что FormValues не допускает undefined
export interface FormValues {
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
}

export interface FormikConfig {
  initialValues: FormValues;
  onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void;
  enableReinitialize?: boolean;
}