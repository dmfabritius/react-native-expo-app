import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { getDocs } from 'firebase/firestore';
import moment from 'moment';
import axios, { AxiosResponse } from 'axios';
import { useCancelToken } from '../../utils';
import { openWeatherUrl } from '../../../openweather.config';
import { DateRange, Library, Weather } from '../../models';
import { MainNavProps } from '../../navigation/types';
import { StoreContext } from '../../components/StoreProvider';
import MainMenuBar from '../../components/MainMenuBar';
import Loading from '../../components/Loading';
import Filters from '../../components/Filters';
import LibraryItem from './LibraryItem';

export default function LibrarySummary({ navigation }: MainNavProps<'LibrarySummary'>): JSX.Element {
  const { getCancelToken } = useCancelToken();
  const { colors } = useTheme();
  const { librariesCollection, updateStore } = useContext(StoreContext);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [filteredLibraries, setFilteredLibraries] = useState<Library[]>([]);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: moment().subtract(3, 'month').toDate().toISOString(),
    to: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const { docs } = await getDocs(librariesCollection);
        // for convenience, include the document id as a data field
        const libraryList = docs.map((library) => ({ ...library.data(), id: library.id }));
        setLibraries(libraryList);

        const libraryEnum = libraryList.reduce((acc, library) => {
          acc[library.id] = library.name;
          return acc;
        }, {} as Record<string, string>);

        const cancelToken = getCancelToken();
        const libraryWeather = await libraryList.reduce(async (promise, library) => {
          const acc = await promise;
          const url =
            `${openWeatherUrl}&exclude=minutely,hourly,alerts&units=imperial` +
            `&lat=${library.latitude}&lon=${library.longitude}`;
          const { data: weather }: AxiosResponse<Weather> = await axios.get(url, { cancelToken });
          acc[library.id] = weather;
          return acc;
        }, Promise.resolve({} as Record<string, Weather>));

        //!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!
        console.log('lib summ weather keys:', Object.keys(libraryWeather));
        //!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!

        updateStore({ libraryEnum, libraryWeather });
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return; // request canceled by user, probably navigated away
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = libraries
      ? libraries
          .filter(
            (s) =>
              dateRange.from <= s.createdTimestampUtc &&
              s.createdTimestampUtc <= dateRange.to &&
              (s.name.toLowerCase().includes(searchText.toLowerCase()) || searchText === ''),
          )
          .sort((lhs, rhs) => (lhs.name > rhs.name ? 1 : rhs.name > lhs.name ? -1 : 0))
      : [];
    setFilteredLibraries(filtered);
  }, [libraries, searchText, dateRange]);

  if (isLoading || !filteredLibraries) return <Loading />;

  return (
    <View style={styles.container}>
      <MainMenuBar style={styles.navbar} title="LIBRARIES" navigation={navigation} />
      <Filters
        style={styles.filters}
        searchText={searchText}
        setSearchText={setSearchText}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <View style={styles.body}>
        <ScrollView style={{ backgroundColor: colors.surface }}>
          {filteredLibraries.map((library, index) => (
            <LibraryItem key={index} navigation={navigation} library={library} dateRange={dateRange} />
          ))}
        </ScrollView>
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
  filters: {
    flex: 8,
  },
  navbar: {
    flex: 6,
  },
});
