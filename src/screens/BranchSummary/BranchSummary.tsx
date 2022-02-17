import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import { getDocs } from 'firebase/firestore';
import moment from 'moment';
import { DateRange, Branch, Weather } from '../../models';
import { MainNavProps } from '../../navigation/types';
import { StoreContext } from '../../components/StoreProvider';
import MainMenuBar from '../../components/MainMenuBar';
import Loading from '../../components/Loading';
import Filters from '../../components/Filters';
import BranchItem from './BranchItem';

export default function BranchSummary({ navigation }: MainNavProps<'BranchSummary'>): JSX.Element {
  const { colors } = useTheme();
  const { branchesCollection } = useContext(StoreContext);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(1, 'month').toDate().toISOString(),
    to: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const { docs } = await getDocs(branchesCollection);
      // for convenience, include the document id as a data field
      setBranches(docs.map((branch) => ({ ...branch.data(), id: branch.id })));
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = branches
      ? branches
          .filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()) || searchText === '')
          .sort((lhs, rhs) => (lhs.name > rhs.name ? 1 : rhs.name > lhs.name ? -1 : 0))
      : [];
    setFilteredBranches(filtered);
  }, [branches, searchText]);

  if (isLoading || !filteredBranches) return <Loading />;

  return (
    <View style={styles.container}>
      <MainMenuBar style={styles.navbar} title="BRANCHES" navigation={navigation} />
      <Filters
        style={styles.filters}
        searchText={searchText}
        setSearchText={setSearchText}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <View style={styles.body}>
        <ScrollView style={{ backgroundColor: colors.surface }}>
          {filteredBranches.map((item, index) => (
            <BranchItem key={index} navigation={navigation} item={item} dateRange={dateRange} />
          ))}
        </ScrollView>
        <FAB
          testID="Add.Item"
          style={styles.fab}
          icon="plus"
          onPress={() =>
            navigation.navigate('BranchDetails', {
              dateRange,
              id: '', // use empty string to indicate new Branch
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 86,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
  },
  fab: {
    alignSelf: 'flex-end',
    bottom: 0,
    margin: 35,
    position: 'absolute',
    right: 0,
  },
  filters: {
    flex: 8,
  },
  navbar: {
    flex: 6,
  },
});
