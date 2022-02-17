import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Text, useTheme, Card, List } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosResponse } from 'axios';
import { useCancelToken, display, getBatteryIcon } from '../../utils';
import { openWeatherUrl } from '../../../openweather.config';
import { images } from '../../assets';
import { DateRange, Branch, Weather } from '../../models';
import { MainNavParams } from '../../navigation/types';
import RowView from '../../components/RowView';
import SummaryCardHeading from '../../components/SummaryCardHeading';
import Loading from '../../components/Loading';

const width = Dimensions.get('window').width;

interface Props {
  navigation: StackNavigationProp<MainNavParams, 'BranchSummary'>;
  item: Branch;
  dateRange: DateRange;
}

export default function BranchItem({ navigation, item, dateRange }: Props): JSX.Element {
  const { getCancelToken } = useCancelToken();
  const { colors } = useTheme();
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const url =
          `${openWeatherUrl}&exclude=minutely,hourly,alerts&units=imperial` +
          `&lat=${item.latitude}&lon=${item.longitude}`;
        const { data }: AxiosResponse<Weather> = await axios.get(url, { cancelToken: getCancelToken() });
        setWeather(data);
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return; // request canceled by user, probably navigated away
        setWeather({} as Weather);
        setIsLoading(false);
      }
    };
    loadWeather();
  }, []);

  const gotoDetails = () => navigation.navigate('BranchDetails', { dateRange, id: item.id });

  if (isLoading) return <Loading />;
  return (
    <Card style={styles.card} onPress={gotoDetails}>
      <List.Accordion
        testID="Expand.Item"
        onLongPress={gotoDetails}
        style={styles.tight}
        title={<SummaryCardHeading name={item.name} isDraft={item.isDraft} weather={weather} />}
      >
        <List.Item
          style={styles.tight}
          title={
            <RowView style={styles.row}>
              <Card style={[{ backgroundColor: colors.light }, styles.item]}>
                <Text>Status: {item.status}</Text>
                <RowView>
                  <Text>Battery: </Text>
                  <Image style={styles.imageSmall} source={getBatteryIcon(item.voltage)} resizeMode="center" />
                  <Text>{display(item.voltage, 'volts')}</Text>
                </RowView>
                <RowView>
                  <Text>Connection: </Text>
                  <Image
                    style={styles.imageSmall}
                    source={item.connection === 'connected' ? images.connection : images.noconnection}
                    resizeMode="center"
                  />
                </RowView>
                <Text>Amperage: {display(item.amperage, 'amps')}</Text>
                <Text>Resistance: {display(item.resistance, 'ohms')}</Text>
              </Card>
            </RowView>
          }
        />
      </List.Accordion>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    elevation: 3,
    marginBottom: 5,
    shadowOffset: { height: 3, width: 2 },
    shadowOpacity: 0.95,
    shadowRadius: 3,
  },
  image: {
    height: 45,
    marginRight: 15,
    width: 45,
  },
  imageSmall: {
    height: 20,
    width: 20,
  },
  item: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: width * 0.9,
  },
  row: {
    alignItems: 'center',
  },
  tight: {
    margin: 0,
    padding: 0,
  },
});
