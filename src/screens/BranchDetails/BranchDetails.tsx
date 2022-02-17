import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import { DateRange, Branch } from '../../models';
import { MainNavProps } from '../../navigation/types';
import { StoreContext } from '../../components/StoreProvider';
import Loading from '../../components/Loading';
import {
  BranchOverview,
  BranchMenuBar,
  BasicInfo,
  ChartsAndWeather,
  Location,
  Attributes,
  branchValidationSchema,
} from '.';

const tabs = { BasicInfo, Location, Attributes, ChartsAndWeather };

export default function BranchDetails({ navigation, route }: MainNavProps<'BranchDetails'>): JSX.Element {
  const { colors } = useTheme();
  const { branchesCollection } = useContext(StoreContext);
  const [dateRange] = useState<DateRange>({
    from: route.params.dateRange.from,
    to: route.params.dateRange.to,
  });
  const [branch, setBranch] = useState<Branch>({ id: '' } as Branch);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [tabIndex, setTabIndex] = useState<keyof typeof tabs>('BasicInfo');
  const Tab = tabs[tabIndex];

  useEffect(() => {
    const loadData = async () => {
      try {
        const branch = await getDoc(doc(branchesCollection, route.params.id));
        setBranch({ ...branch.data(), id: branch.id } as Branch);
      } catch (error) {
        console.error('Error loading branch details: ', (error as Error).message);
        setErrorMessage('Cannot load branch details');
      } finally {
        setIsLoading(false);
      }
    };

    if (route.params.id !== '') {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [route]);

  if (isLoading) return <Loading />;
  return (
    <Formik<Branch>
      initialValues={branch}
      initialStatus={{ disabled: true }}
      onSubmit={async (fields) => {
        try {
          await updateDoc(doc(branchesCollection, branch.id), fields);
          setBranch(fields);
        } catch (error) {
          console.log('Error updating branch details: ', (error as Error).message);
          setErrorMessage('Cannot update branch details');
        }
      }}
      validationSchema={branchValidationSchema}
    >
      {(formik) => (
        <View style={styles.container}>
          <Snackbar
            style={[{ backgroundColor: colors.error }, styles.errorMessage]}
            visible={errorMessage !== ''}
            duration={2000}
            onDismiss={() => setErrorMessage('')}
          >
            {errorMessage}
          </Snackbar>
          <BranchOverview style={styles.overview} navigation={navigation} formik={formik} branch={branch} />
          <BranchMenuBar style={styles.menubar} tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <ScrollView style={[{ backgroundColor: colors.surface }, styles.tab]}>
            <Tab formik={formik} libraryId={branch.libraryId} dateRange={dateRange} />
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menubar: {
    maxHeight: 45,
    minHeight: 45,
  },
  overview: {
    maxHeight: 120,
    minHeight: 120,
  },
  tab: {
    flex: 1,
    padding: 10,
  },
  errorMessage: {
    alignSelf: 'center',
    width: '40%',
  },
});
