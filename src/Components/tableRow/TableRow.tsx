// TableRow.tsx (дочерний компонент)
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import styles from './TableRow.module.scss';
import { TableRowProps, FormValues } from './TableRow.types';
import { getNestingLevel, getEditFormikConfig, getAddFormikConfig } from './TableRow.service';
import AddIcon from './file.svg';
import DeleteIcon from './delete.svg';

const validationSchema = Yup.object().shape({
  rowName: Yup.string().required('Название строки обязательно'),
  salary: Yup.number().min(0, 'Зарплата не может быть меньше 0').required('Поле обязательно'),
  equipmentCosts: Yup.number().min(0, 'Оборудование не может быть меньше 0').required('Поле обязательно'),
  overheads: Yup.number().min(0, 'Накладные расходы не может быть меньше 0').required('Поле обязательно'),
  estimatedProfit: Yup.number().min(0, 'Прибыль не может быть меньше 0').required('Поле обязательно'),
});

export default function TableRow({
  row,
  onSubmit,
  onAddChild,
  onDeleteRow,
  isEditing,
  isAdding,
  onEditStart,
  onAddStart,
  onCancel,
  lineCount,
  isFirst = false,
  isDeleteDisabled = false,
}: TableRowProps & { isFirst?: boolean; isDeleteDisabled?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const editFormik = useFormik({
    ...getEditFormikConfig(row, onSubmit),
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const addFormik = useFormik({
    ...getAddFormikConfig(row.id, onAddChild),
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const editFormikRef = useRef(editFormik);
  const addFormikRef = useRef(addFormik);

  useEffect(() => {
    editFormikRef.current = editFormik;
  }, [editFormik]);

  useEffect(() => {
    addFormikRef.current = addFormik;
  }, [addFormik]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isEditing || isAdding)) {
        e.preventDefault();
        onCancel();
        if (isEditing) editFormikRef.current.resetForm();
        if (isAdding) addFormikRef.current.resetForm();
      }
    };

    if (isEditing || isAdding) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isEditing, isAdding, onCancel]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    formik: typeof editFormik,
    isAddForm = false
  ) => {
    if (e.key === 'Enter' && !formik.isSubmitting) {
      e.preventDefault();
      formik.handleSubmit();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      formik.resetForm();
      onCancel();
      if (isAddForm) addFormik.resetForm();
    }
  };

  const handleAddClick = () => {
    addFormik.resetForm();
    onAddStart(row.id);
  };

  const handleDeleteClick = () => onDeleteRow(row.id);
  const handleDoubleClick = () => {
    editFormik.resetForm();
    onEditStart(row.id);
  };

  const nestingOffset = getNestingLevel(row) * 20;
  const isFirstLevel = getNestingLevel(row) === 1;

  const renderInput = (
    name: keyof FormValues,
    value: string | number,
    formik: typeof editFormik,
    placeholder: string,
    isAddForm = false,
    disabled = false
  ) => (
    <div className={styles.input_container}>
      <input
        name={name}
        type={name === 'rowName' ? 'text' : 'number'}
        value={value}
        onChange={formik.handleChange}
        onKeyDown={(e) => handleKeyDown(e, formik, isAddForm)}
        className={cn(styles.input, {
          [styles.input_active]: !disabled,
          [styles.input_error]: formik.errors[name] && formik.touched[name]
        })}
        placeholder={placeholder}
        disabled={disabled || formik.isSubmitting}
      />
      {formik.errors[name] && formik.touched[name] && (
        <span className={styles.error_message}>{formik.errors[name]}</span>
      )}
    </div>
  );

  return (
    <>
      <div
        className={cn(styles.table_row, {
          [styles.table_row_active]: isEditing
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handleDoubleClick}
      >
        <div 
          className={cn(styles.level_container, { 
            [styles.level_container_active]: isHovered && !isEditing && !isAdding 
          })}
          onDoubleClick={handleDoubleClick}
          style={{ marginLeft: isFirstLevel ? `${nestingOffset}px` : `${nestingOffset}px` }}
        >
          <button
            className={styles.edit_button}
            onClick={handleAddClick}
            title="Добавить дочерний элемент"
            disabled={isDeleteDisabled}
          >
            <img
              src={AddIcon}
              alt="Добавить"
              className={cn(styles.add_icon, {
                [styles.icon_disabled]: isDeleteDisabled
              })}
            />
            {!!(lineCount > 0) && !isAdding && (
              <div
                className={styles.line_vertical}
                style={{
                  height: `${(lineCount - 1) * 42 + 31}px`,
                }}
              />
            )}
            {!isFirst && !isAdding && <div className={styles.line_hor}></div>}
          </button>

          {isHovered && !isEditing && !isAdding && !isDeleteDisabled && (
            <button
              className={styles.delete_button}
              onClick={handleDeleteClick}
              title="Удалить строку"
              disabled={isDeleteDisabled}
            >
              <img 
                src={DeleteIcon} 
                alt="Удалить" 
                className={cn(styles.delete_icon, {
                  [styles.icon_disabled]: isDeleteDisabled
                })} 
              />
            </button>
          )}
        </div>

        <div className={styles.row_name_container}>
          {renderInput('rowName', editFormik.values.rowName, editFormik, 'Название строки', false, !isEditing)}
        </div>
        {renderInput('salary', editFormik.values.salary, editFormik, 'Зарплата', false, !isEditing)}
        {renderInput('equipmentCosts', editFormik.values.equipmentCosts, editFormik, 'Оборудование', false, !isEditing)}
        {renderInput('overheads', editFormik.values.overheads, editFormik, 'Накладные расходы', false, !isEditing)}
        {renderInput('estimatedProfit', editFormik.values.estimatedProfit, editFormik, 'Прибыль', false, !isEditing)}
      </div>

      {isAdding && (
        <div className={cn(styles.table_row, styles.table_row_active)}>
          <div 
            className={styles.level_container}
            style={{ marginLeft: isFirstLevel ? `${nestingOffset + 20}px` : `${nestingOffset + 20}px` }}
          >
            <img
              src={AddIcon}
              alt="Добавить"
              className={styles.add_icon}
            />
            {!isFirst && <div className={styles.line_hor}></div>} 
          </div>

          <div className={styles.row_name_container}>
            {renderInput('rowName', addFormik.values.rowName, addFormik, 'Новое название', true)}
          </div>
          {renderInput('salary', addFormik.values.salary, addFormik, 'Зарплата', true)}
          {renderInput('equipmentCosts', addFormik.values.equipmentCosts, addFormik, 'Оборудование', true)}
          {renderInput('overheads', addFormik.values.overheads, addFormik, 'Накладные расходы', true)}
          {renderInput('estimatedProfit', addFormik.values.estimatedProfit, addFormik, 'Прибыль', true)}
        </div>
      )}
    </>
  );
}