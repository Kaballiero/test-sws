import { ITreeResponse } from 'src/share/Interfaces';
import { TableRowHandlers, RowUpdateBody, RowCreateBody } from './Table.types';

export function initializeTableData(
  initialRows: ITreeResponse[] | undefined,
  rows: ITreeResponse[],
  isLoading: boolean,
  setTableData: (data: ITreeResponse[]) => void
): void {
  if (initialRows && rows.length === 0 && !isLoading) {
    setTableData(initialRows);
  }
}

export function getRowUpdateBody(updatedRow: ITreeResponse): RowUpdateBody {
  return {
    rowName: updatedRow.rowName,
    salary: updatedRow.salary,
    equipmentCosts: updatedRow.equipmentCosts,
    overheads: updatedRow.overheads,
    estimatedProfit: updatedRow.estimatedProfit,
    machineOperatorSalary: updatedRow.machineOperatorSalary ?? 0,
    mainCosts: updatedRow.mainCosts ?? 0,
    materials: updatedRow.materials ?? 0,
    mimExploitation: updatedRow.mimExploitation ?? 0,
    supportCosts: updatedRow.supportCosts ?? 0,
  };
}

export function getRowCreateBody(newChild: Partial<ITreeResponse>, parentId: number): RowCreateBody {
  return {
    rowName: newChild.rowName ?? '',
    salary: newChild.salary ?? 0,
    equipmentCosts: newChild.equipmentCosts ?? 0,
    overheads: newChild.overheads ?? 0,
    estimatedProfit: newChild.estimatedProfit ?? 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
    parentId,
  };
}
export const getChildCount= (row: ITreeResponse): number => {
  
  let total = row.child.length;
  
  row.child.forEach((child) => 
    { 
       total += getChildCount(child); // Рекурсивно считаем вложенные child
  });
  return total;
};

export const getTotalChildCount=(row: ITreeResponse): number=>{
  let total = row.child.length;
  for (let i = 0; i < row.child.length - 1; i++) {
    total +=  getChildCount(row.child[i]); // Рекурсивно считаем всех потомков
}
return total
}
export function createRowHandlers(
    updateRow: any,
    createRow: any,
    deleteRow: any,
    actions: any,
    setEditingRowId: (id: number | null) => void,
    isEditingActive: boolean,
    addingRowId: number | null
  ) {
    const { updateRowData, addChildData, deleteRowData, openEdit, closedEdit, openAdd, closeAdd } = actions;
  
    const onSubmit = async (updatedRow: ITreeResponse): Promise<void> => {
      try {
        await updateRow({
          params: { rid: updatedRow.id },
          body: updatedRow,
        }).unwrap();
        updateRowData(updatedRow);
        setEditingRowId(null);
        closedEdit();
      } catch (error) {
        console.error('Ошибка обновления строки:', error);
      }
    };

  const onAddChild = async (parentId: number, newChild: Partial<ITreeResponse>, resetForm: () => void) => {
    try {
      const response = await createRow({
        body: getRowCreateBody(newChild, parentId),
      }).unwrap();
      const createdRow = response.current;
      addChildData({ parentId, newChild: createdRow });
      resetForm();
      closeAdd();
    } catch (error) {
      console.error('Ошибка добавления строки:', error);
    }
  };

  const onDeleteRow = async (rowId: number) => {
    try {
      await deleteRow({ params: { rid: rowId } }).unwrap();
      deleteRowData(rowId);
    } catch (error) {
      console.error('Ошибка удаления строки:', error);
    }
  };

  const onEditStart = (rowId: number) => {
    if (!addingRowId) {
      setEditingRowId(rowId);
      openEdit();
    }
  };

  const onAddStart = (rowId: number) => {
    if (!isEditingActive) {
      openAdd(rowId);
      setEditingRowId(null);
    }
  };

  const onCancel = () => {
    setEditingRowId(null);
    closeAdd();
    closedEdit();
  };

  return { onSubmit, onAddChild, onDeleteRow, onEditStart, onAddStart, onCancel };
}