import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme, ActivityIndicator, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { FormikProps } from 'formik';
import { Library } from '../../models';
import { TimeZones } from '../../models/enums';
import { MainNavParams } from '../../navigation/types';
import Label from '../../components/Label';
import RowView from '../../components/RowView';

interface Props {
  formik: FormikProps<Library>;
  library: Library;
  navigation: StackNavigationProp<MainNavParams, 'LibraryDetails'>;
  style?: StyleProp<ViewStyle>;
}

export default function LibraryOverview({ formik, library, navigation, style }: Props): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <TouchableOpacity
          testID="Go.Back"
          onPress={() => {
            formik.resetForm();
            formik.setStatus({ disabled: true });
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-left" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <Label title="Library Name" label={library.name} />
        <RowView>
          <Label title="City" label={library.city} />
          <Label title="State" label={library.state} />
        </RowView>
        <Label title="Timezone" label={TimeZones[library.timezoneId as keyof typeof TimeZones]} />
        <Label title="Notes" label={library.notes} />
      </View>
      <View style={styles.right}>
        {formik.status.disabled ? (
          <Button
            testID="Edit.Button"
            labelStyle={styles.buttonLabel}
            mode="contained"
            onPress={() => formik.setStatus({ disabled: false })}
          >
            Edit
          </Button>
        ) : (
          <React.Fragment>
            {formik.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button
                testID="Submit.Button"
                mode="contained"
                labelStyle={styles.buttonLabel}
                disabled={!formik.dirty || !formik.isValid}
                onPress={() => {
                  formik.setStatus({ disabled: true });
                  formik.handleSubmit();
                }}
              >
                Submit
              </Button>
            )}
            <Button
              testID="Cancel.Button"
              mode="contained"
              labelStyle={styles.buttonLabel}
              onPress={() => {
                formik.resetForm();
                formik.setStatus({ disabled: true });
              }}
            >
              Cancel
            </Button>
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    height: 36,
  },
  buttonLabel: {
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  edit: {
    marginBottom: 4,
    width: '100%',
  },
  left: {
    flex: 15,
    justifyContent: 'center',
  },
  middle: {
    flex: 55,
    justifyContent: 'space-between',
  },
  right: {
    flex: 30,
    justifyContent: 'space-around',
  },
});
