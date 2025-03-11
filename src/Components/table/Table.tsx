import { useState } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/UseAction';
import { getTableData, getEditState, getAddingRowId } from '../../selectors/rowSelector';
import { ITreeResponse } from '../../share/Interfaces';
import { initializeTableData, createRowHandlers, getTotalChildCount } from './Table.service';
import styles from './Table.module.scss';
import { useGetAllRowQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } from '../../app/store/api';
import TableRow from '../tableRow';

export default function Table() {
  const { data: initialRows, isLoading } = useGetAllRowQuery();
  const rows = useSelector(getTableData);
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();
  const actions = useActions();
  const isEditingActive = useSelector(getEditState);
  const addingRowId = useSelector(getAddingRowId);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const { setTableData } = actions;

  initializeTableData(initialRows, rows, isLoading, setTableData);

  const handlers = createRowHandlers(
    updateRow,
    createRow,
    deleteRow,
    actions,
    setEditingRowId,
    isEditingActive,
    addingRowId
  );

  // Проверяем активность любого режима редактирования/добавления
  const isAnyEditingOrAdding = editingRowId !== null || addingRowId !== null;

  const renderRows = (rowsData: ITreeResponse[], level = 1) =>
    rowsData.map((row, index) => (
      <div key={row.id}>
        <TableRow
          row={{ ...row, level }}
          onSubmit={handlers.onSubmit}
          onAddChild={handlers.onAddChild}
          onDeleteRow={handlers.onDeleteRow}
          isEditing={editingRowId === row.id}
          isAdding={addingRowId === row.id}
          onEditStart={handlers.onEditStart}
          onAddStart={handlers.onAddStart}
          onCancel={handlers.onCancel}
          lineCount={getTotalChildCount(row)}
          isFirst={index === 0 && level === 1}
          isDeleteDisabled={isAnyEditingOrAdding && editingRowId !== row.id && addingRowId !== row.id}
        />
        {!!row.child?.length && renderRows(row.child, level + 1)}
      </div>
    ));

  if (isLoading) return <div>Загрузка...</div>;

  return <div className={styles.table_container}>{renderRows(rows)}</div>;
}