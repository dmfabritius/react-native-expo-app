import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme, Card, List, FAB } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { display } from '../../utils';
import { DateRange, Library } from '../../models';
import { MainNavParams } from '../../navigation/types';
import { StoreContext } from '../../components/StoreProvider';
import SummaryCardHeading from '../../components/SummaryCardHeading';
import RowView from '../../components/RowView';

interface Props {
  navigation: StackNavigationProp<MainNavParams, 'LibrarySummary'>;
  library: Library;
  dateRange: DateRange;
}

export default function LibraryItem({ navigation, library, dateRange }: Props): JSX.Element {
  const { libraryWeather } = useContext(StoreContext);
  const { colors } = useTheme();

  const gotoDetails = () => navigation.navigate('LibraryDetails', { dateRange, id: library.id });

  return (
    <Card style={styles.card} onPress={gotoDetails}>
      <List.Accordion
        testID="Expand.Item"
        onLongPress={gotoDetails}
        style={styles.tight}
        title={
          <SummaryCardHeading
            name={library.name}
            isDraft={library.status === 'stand-by'}
            weather={libraryWeather[library.id]}
          />
        }
      >
        <List.Item
          style={styles.tight}
          title={
            <RowView style={styles.row}>
              <View>
                <Text>Status: {library.status}</Text>
                <Text>Branches: {library.branchesCount}</Text>
                <Text>Capacity: {display(library.capacity, '%')}</Text>
                <Text>Created On: {moment(library.createdTimestampUtc).format('YYYY-MM-DD')}</Text>
              </View>
              <FAB
                style={[{ backgroundColor: colors.surface }, styles.edit]}
                color={colors.primary}
                icon="file-document-edit-outline"
              />
            </RowView>
          }
        />
      </List.Accordion>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 2,
    elevation: 3,
    marginBottom: 5,
    shadowOffset: { height: 3, width: 2 },
    shadowOpacity: 0.95,
    shadowRadius: 3,
  },
  edit: {
    marginLeft: 75,
  },
  imageSmall: {
    height: 20,
    width: 20,
  },
  row: {
    alignItems: 'center',
  },
  tight: {
    margin: 0,
    padding: 0,
  },
});
