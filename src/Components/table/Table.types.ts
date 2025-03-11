import { ITreeResponse } from 'src/share/Interfaces';

export interface TableRowParams {
    rid: number;
}
export interface ITreeResponseWithLvl extends ITreeResponse {
    lvl: string;
    child: ITreeResponseWithLvl[];
}

export interface TableProps {
    initialRows: ITreeResponseWithLvl[];
}
export interface RowUpdateBody {
    rowName?: string;
    salary?: number;
    equipmentCosts?: number;
    overheads?: number;
    estimatedProfit?: number;
    machineOperatorSalary?: number;
    mainCosts?: number;
    materials?: number;
    mimExploitation?: number;
    supportCosts?: number;
}

export interface RowCreateBody extends RowUpdateBody {
    parentId: number;
}

export interface TableRowHandlers {
    onSubmit: (updatedRow: ITreeResponse) => Promise<void>;
    onAddChild: (parentId: number, newChild: Partial<ITreeResponse>, resetForm: () => void) => Promise<void>;
    onDeleteRow: (rowId: number) => Promise<void>;
    onEditStart: (rowId: number) => void;
    onAddStart: (rowId: number) => void;
    onCancel: () => void;
}