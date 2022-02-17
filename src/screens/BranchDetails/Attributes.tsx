import React from 'react';
import { Materials, Shapes } from '../../models/enums';
import { FormikTextInput, FormikSelectInput, FormikSwitchInput } from '../../inputs';
import { BranchDetailsProps } from '.';

export default function Attributes({ formik }: BranchDetailsProps): JSX.Element {
  return (
    <>
      <FormikSelectInput formik={formik} label="Material" field="materialId" items={Materials} />
      <FormikSelectInput formik={formik} label="Shape" field="shapeId" items={Shapes} />
      <FormikTextInput formik={formik} label="Amperage (amps)" field="amperage" keyboardType="numeric" />
      <FormikTextInput formik={formik} label="Resistance (ohms)" field="resistance" keyboardType="numeric" />
      <FormikTextInput formik={formik} label="Voltage (volts)" field="voltage" keyboardType="numeric" />
      <FormikSwitchInput formik={formik} label="Protected?" field="isProtected" />
    </>
  );
}
