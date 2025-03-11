export interface IEntity {
    rowName: string;
    salary: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child: IEntity[] | [];
  }
  
  export interface IColumnMap {
    child: 'Уровень';
    rowName: 'Наименование работ';
    salary: 'Основная з/п';
    equipmentCosts: 'Оборудование';
    overheads: 'Накладные расходы';
    estimatedProfit: 'Сметная прибыль';
  }
  
  export type typeColumnMapKey = keyof IColumnMap;
  export type typeColumnMapType = Map<typeColumnMapKey, IColumnMap[typeColumnMapKey]>;
  
  export interface IOutlayRowUpdateRequest {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    rowName: string;
    salary: number;
    supportCosts: number;
  }
  
  export interface IOutlayRowRequest extends IOutlayRowUpdateRequest {
    parentId: number;
  }
  
  export interface IOutlayResponse extends IOutlayRowUpdateRequest {
    parentId: number | null;
  }
  
  
  
  export interface IRowResponse extends IOutlayRowUpdateRequest {
    id: number;
    total: number;
  } 
  
  export interface IRecalculatedRows {
    changed:IRowResponse[] | null;
    current: IRowResponse | [];
  }
  
  export interface ITreeResponse extends IRowResponse {
    level?: number;
    child:ITreeResponse[] | [];
  }
  
  export type IResponse = ITreeResponse[] | [];