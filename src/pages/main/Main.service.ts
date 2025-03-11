import { enumRowType } from 'src/share/Types';
import { IEntity, IOutlayRowUpdateRequest,  IResponse,  ITreeResponse, } from '../../share/Interfaces'

export function getSortedTableData(tableData: IResponse): IResponse {
  const sortById = (data: ITreeResponse[]): ITreeResponse[] => {
    return data
      .map((item) => ({
        ...item,
        child: sortById(item.child),
      }))
      .sort((a, b) => a.id - b.id);
  };

  return sortById(tableData as ITreeResponse[]);
}



export function getRowType(
  child: IEntity[] | [null],
  index: number,
  numberChildren: number,
) {
  if (child.length > 0) {
    return enumRowType.parent;
  }

  if (child.length === 0 && index < numberChildren - 1) {
    return enumRowType.sibling;
  }

  return enumRowType.noChild;
}

export function getCurrLvl(lvl: string, index: number) {
  return !!lvl ? `${lvl}-${index}` : `${index}`;
}

export function getNewRow(): IOutlayRowUpdateRequest {
  return {
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: '',
    salary: 0,
    supportCosts: 0,
  };
}

function countNestedDescendants(nestedChild: ITreeResponse): number {
  if (nestedChild.child.length === 0) return 0;

  return nestedChild.child.reduce((acc, child) => {
    return acc + 1 + countNestedDescendants(child);
  }, 0);
}

export function countDescendants(currChild: ITreeResponse[]): number {
  if (!currChild || currChild.length === 0) {
    return 0;
  }

  const firstLevelChildren = currChild;

  let count = 0;

  for (let i = 0; i < firstLevelChildren.length - 1; i++) {
    count += 1 + countNestedDescendants(firstLevelChildren[i]);
  }

  count += firstLevelChildren.length - 1;
  return count;
}
