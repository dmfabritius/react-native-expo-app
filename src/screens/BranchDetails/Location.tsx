import React from 'react';
import { States, TimeZones } from '../../models/enums';
import { FormikTextInput, FormikSelectInput } from '../../inputs';
import { BranchDetailsProps } from '.';

export default function Location({ formik }: BranchDetailsProps): JSX.Element {
  return (
    <React.Fragment>
      <FormikTextInput formik={formik} label="Address" field="address1" />
      <FormikTextInput formik={formik} label="Address 2" field="address2" />
      <FormikTextInput formik={formik} label="City" field="city" />
      <FormikSelectInput formik={formik} label="State" field="state" items={States} />
      <FormikTextInput formik={formik} label="Zip Code" field="zip" keyboardType="numeric" />
      <FormikSelectInput formik={formik} label="Timezone" field="timezoneId" items={TimeZones} />
      <FormikTextInput formik={formik} label="Latitude" field="latitude" keyboardType="numeric" />
      <FormikTextInput formik={formik} label="Longitude" field="longitude" keyboardType="numeric" />
    </React.Fragment>
  );
}
