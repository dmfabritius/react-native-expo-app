import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme, ActivityIndicator, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { FormikProps } from 'formik';
import { Branch } from '../../models';
import { TimeZones } from '../../models/enums';
import { MainNavParams } from '../../navigation/types';
import Label from '../../components/Label';
import RowView from '../../components/RowView';

interface Props {
  style?: StyleProp<ViewStyle>;
  navigation: StackNavigationProp<MainNavParams, 'BranchDetails'>;
  formik: FormikProps<Branch>;
  branch: Branch;
}

export default function BranchOverview({ style, navigation, formik, branch }: Props): JSX.Element {
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
        <Label title="Monitoring Point Name" label={branch.name} />
        <RowView>
          <Label title="City" label={branch.city} />
          <Label title="State" label={branch.state} />
        </RowView>
        <Label title="Timezone" label={TimeZones[branch.timezoneId as keyof typeof TimeZones]} />
      </View>
      <View style={styles.right}>
        {formik.status.disabled ? (
          formik.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button
              testID="Edit.Button"
              labelStyle={styles.buttonLabel}
              mode="contained"
              onPress={() => formik.setStatus({ disabled: false })}
            >
              Edit
            </Button>
          )
        ) : (
          <React.Fragment>
            <Button
              testID="Submit.Button"
              mode="contained"
              labelStyle={styles.buttonLabel}
              onPress={() => {
                formik.handleSubmit();
                formik.setStatus({ disabled: true });
              }}
            >
              Submit
            </Button>
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
