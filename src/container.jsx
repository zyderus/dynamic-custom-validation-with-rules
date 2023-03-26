import { useEffect, useState } from 'react';
import { fieldRows, mappedFields } from './data';
import Row from './row';

const Container = () => {
  const [rows, setRows] = useState(fieldRows);
  const [checkedFields, setCheckedFields] = useState(mappedFields);

  const toggleMappedFields = (isChecked, id) => {
    if (isChecked) {
      setCheckedFields(
        checkedFields.filter(field => field.manomano_field_id !== +id)
      );
    } else {
      const { name, id: fieldId } = rows.find(row => row.id === +id);

      setCheckedFields([
        ...checkedFields,
        {
          manomano_field_name: name,
          manomano_field_id: fieldId,
          static_value: '',
        },
      ]);
    }
  };

  // ! Function is question
  const isFieldRequired = (field, mappedFields) => {
    const validationRuleMap = {
      value_is_false: 'false',
      value_is_true: 'true',
      is_empty: 'empty',
    };

    const mappedFieldsMap = {};

    mappedFields.forEach(fieldEl => {
      const key = fieldEl.manomano_field_name;
      mappedFieldsMap[key] = { static_value: fieldEl?.static_value };
    });

    return field?.conditions?.every(rule => {
      return rule?.dependency_fields.every(dependency => {
        if (
          validationRuleMap[rule.rule] === 'empty' &&
          !mappedFieldsMap[dependency]
        )
          return true;

        return (
          mappedFieldsMap[dependency]?.static_value ===
          validationRuleMap[rule.rule]
        );
      });
    });
  };

  const updateFieldsValidation = () => {
    const res = rows.map(field => {
      if (!field.conditions) return field;

      // console.log('isFieldRequired::', isFieldRequired(field, mappedFields));

      return {
        ...field,
        is_required: isFieldRequired(field, mappedFields) ? true : false,
      };
    });

    setRows(res);
  };

  useEffect(() => {
    updateFieldsValidation();
  }, [checkedFields]);

  useEffect(() => {
    console.log(rows);
  });

  const sortedRows = rows.sort((a, b) => +b.is_required - +a.is_required);

  const Rows = sortedRows.map(row => {
    const isRowMapped = checkedFields.some(
      mappedRow => mappedRow.manomano_field_id === row.id
    );

    return (
      <Row
        key={row.id}
        toggleMappedFields={toggleMappedFields}
        checked={isRowMapped}
        {...row}
      />
    );
  });

  return (
    <>
      <h1>Fields</h1>
      <div
        style={{
          display: 'flex',
          fontWeight: '500',
          fontSize: '.8rem',
          marginBottom: '.7rem',
        }}
      >
        <div style={{ width: '10%' }}>Required?</div>
        <div style={{ width: '40%' }}>Field name</div>
        <div style={{ width: '20%' }}>Is field mapped?</div>
        <div>Status</div>
      </div>
      <div>{Rows}</div>
    </>
  );
};

export default Container;
