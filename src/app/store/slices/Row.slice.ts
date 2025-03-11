import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, ITreeResponse, IRowResponse } from '../../../share/Interfaces';

// Интерфейсы
interface IInitialState {
  rowState: boolean;
  addingRowId: number | null;
  tableData: IResponse;
}

interface IAddChildPayload {
  parentId: number;
  newChild: IRowResponse;
}

// Начальное состояние
const initialState: IInitialState = {
  rowState: false,
  addingRowId: null,
  tableData: [],
};

// Вспомогательные функции
function updateRows(rows: ITreeResponse[], updatedRow: ITreeResponse): ITreeResponse[] {
  return rows.map((row) => {
    if (row.id === updatedRow.id) {
      return { ...row, ...updatedRow };
    }
    
    if (row.child?.length) {
      return { ...row, child: updateRows(row.child, updatedRow) };
    }
    
    return row;
  });
}

function addChildToRows(rows: ITreeResponse[], parentId: number, newChild: IRowResponse): ITreeResponse[] {
  return rows.map((row) => {
    if (row.id === parentId) {
      const newChildRow: ITreeResponse = { ...newChild, child: [] };
      return { ...row, child: [...row.child, newChildRow] };
    }
    
    if (row.child?.length) {
      return { ...row, child: addChildToRows(row.child, parentId, newChild) };
    }
    
    return row;
  });
}

function deleteRowFromRows(rows: ITreeResponse[], rowId: number): ITreeResponse[] {
  return rows
    .filter((row) => row.id !== rowId)
    .map((row) => ({
      ...row,
      child: row.child?.length ? deleteRowFromRows(row.child, rowId) : row.child,
    }));
}

// Создание слайса
const rowSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    openEdit(state) {
      state.rowState = true;
      state.addingRowId = null;
    },

    closedEdit(state) {
      state.rowState = false;
    },

    openAdd(state, action: PayloadAction<number>) {
      state.addingRowId = action.payload;
      state.rowState = false;
    },

    closeAdd(state) {
      state.addingRowId = null;
    },

    setTableData(state, action: PayloadAction<IResponse>) {
      state.tableData = action.payload;
    },

    updateRowData(state, action: PayloadAction<ITreeResponse>) {
      state.tableData = updateRows(state.tableData, action.payload);
    },

    addChildData(state, action: PayloadAction<IAddChildPayload>) {
      state.tableData = addChildToRows(state.tableData, action.payload.parentId, action.payload.newChild);
    },

    deleteRowData(state, action: PayloadAction<number>) {
      state.tableData = deleteRowFromRows(state.tableData, action.payload);
    },
  },
});

// Экспорт
export const {
  openEdit,
  closedEdit,
  openAdd,
  closeAdd,
  setTableData,
  updateRowData,
  addChildData,
  deleteRowData,
} = rowSlice.actions;

export default rowSlice.reducer;