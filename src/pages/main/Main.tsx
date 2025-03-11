import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllRowQuery } from 'src/app/store/api/Entity.api';
import useActions from 'src/hooks/UseAction';
import { getSortedTableData, getCurrLvl } from './Main.service';
import { getTableData } from 'src/selectors/rowSelector';
import Table from 'src/components/table/Table';
import { Loader } from 'src/components/Loader/Loader';
import {  ITreeResponse } from 'src/share/Interfaces';
import { COLUMN_MAP } from 'src/share/Constants';
import styles from './Main.module.scss';
import { ITreeResponseWithLvl } from 'src/components/table/Table.types';



// Функция для рекурсивного добавления lvl
function assignLvlToRows(rows: ITreeResponse[], parentLvl = '0'): ITreeResponseWithLvl[] {
  return rows.map((row, index) => {
    const lvl = getCurrLvl(parentLvl, index);
    return {
      ...row,
      lvl,
      child: assignLvlToRows(row.child || [], lvl),
    };
  });
}

// Компонент MainPage
export function MainPage() {
  const { setTableData } = useActions();
  const { data: tableData, isLoading, isFetching, isError } = useGetAllRowQuery();
  const tableDataCurr = useSelector(getTableData);
  const [localTableData, setLocalTableData] = useState<ITreeResponseWithLvl[] | undefined>(undefined);

  useEffect(() => {
    if (tableData) {
      const sortedTableData = getSortedTableData(tableData);
      const dataWithLvl = assignLvlToRows(sortedTableData);
      setTableData(dataWithLvl);
      setLocalTableData(dataWithLvl);
    }
  }, [tableData, setTableData]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.table__container}>
      <div className={styles.table_header}>
        {COLUMN_MAP.map((colName, index) => (
          <p key={index} className={styles.table_header_cell}>
            {colName}
          </p>
        ))}
      </div>
      <div className={styles.table_content}>
        {localTableData && <Table initialRows={localTableData} />}
      </div>
    </div>
  );
}

export default MainPage;