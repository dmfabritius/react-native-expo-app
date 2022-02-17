import React, { useContext, useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { StoreContext } from '../../components/StoreProvider';
import { BranchDetailsProps } from '.';
import { FormikTextInput, FormikDateInput, FormikSelectInput, FormikSwitchInput } from '../../inputs';
import Loading from '../../components/Loading';

export default function BasicInfo({ formik }: BranchDetailsProps): JSX.Element {
  const { supervisorsCollection, userInfo } = useContext(StoreContext);
  const [supervisors, setSupervisors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { docs } = await getDocs(supervisorsCollection);
      const supervisorEnum = docs
        .map((supervisor) => ({ ...supervisor.data(), id: supervisor.id }))
        .reduce((acc, supervisor) => {
          acc[supervisor.id] = supervisor.name;
          return acc;
        }, {} as Record<string, string>);
      setSupervisors(supervisorEnum);
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <React.Fragment>
      <FormikTextInput formik={formik} label="Name" field="name" />
      <FormikSwitchInput formik={formik} label="Draft?" field="isDraft" />
      <FormikSwitchInput formik={formik} label="Enabled?" field="isEnabled" />
      <FormikSelectInput formik={formik} label="Supervisor" field="supervisor" items={supervisors} />
      <FormikDateInput formik={formik} label="Install Date" field="installDate" />
      <FormikTextInput formik={formik} label="Status" field="status" />
      <FormikTextInput formik={formik} label="Notes" field="notes" />
    </React.Fragment>
  );
}
