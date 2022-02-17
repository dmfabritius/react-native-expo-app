import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Divider, Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import { Library } from '../../models';
import { States, TimeZones } from '../../models/enums';
import { MainNavProps } from '../../navigation/types';
import { StoreContext } from '../../components/StoreProvider';
import Loading from '../../components/Loading';
import { FormikTextInput, FormikSelectInput, FormikSwitchInput } from '../../inputs';
import LibraryOverview from './LibraryOverview';
import { libraryValidationSchema } from './libraryValidation';

export default function LibraryDetails({ navigation, route }: MainNavProps<'LibraryDetails'>): JSX.Element {
  const { colors } = useTheme();
  const { librariesCollection } = useContext(StoreContext);
  const [library, setLibrary] = useState<Library>({ id: '' } as Library);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const library = await getDoc(doc(librariesCollection, route.params.id));
        setLibrary({ ...library.data(), id: library.id } as Library);
      } catch (error) {
        console.error('Error loading library details: ', (error as Error).message);
        setErrorMessage('Cannot load library details');
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
    <Formik<Library>
      initialValues={library}
      initialStatus={{ disabled: true }}
      onSubmit={async (fields) => {
        try {
          await updateDoc(doc(librariesCollection, library.id), fields);
          setLibrary(fields);
        } catch (error) {
          console.log('Error updating library details: ', (error as Error).message);
          setErrorMessage('Cannot update library details');
        }
      }}
      validationSchema={libraryValidationSchema}
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
          <LibraryOverview style={styles.overview} navigation={navigation} formik={formik} library={library} />
          <ScrollView style={[{ backgroundColor: colors.surface }, styles.tab]}>
            <FormikTextInput formik={formik} label="Name" field="name" />
            <FormikSwitchInput formik={formik} label="Draft?" field="isDraft" />
            <FormikSwitchInput formik={formik} label="Enabled?" field="isEnabled" />
            <FormikTextInput formik={formik} label="Status" field="status" />
            <FormikTextInput formik={formik} label="Notes" field="notes" />
            <Divider />
            <FormikTextInput formik={formik} label="Address" field="address1" />
            <FormikTextInput formik={formik} label="Address 2" field="address2" />
            <FormikTextInput formik={formik} label="City" field="city" />
            <FormikSelectInput formik={formik} label="State" field="state" items={States} />
            <FormikTextInput formik={formik} label="Zip Code" field="zip" keyboardType="numeric" />
            <FormikSelectInput formik={formik} label="Timezone" field="timezoneId" items={TimeZones} />
            <FormikTextInput formik={formik} label="Latitude" field="latitude" keyboardType="numeric" />
            <FormikTextInput formik={formik} label="Longitude" field="longitude" keyboardType="numeric" />
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
    maxHeight: 160,
    minHeight: 160,
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
