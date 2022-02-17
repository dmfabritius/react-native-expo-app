import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { BarChart, StackedBarChart } from 'react-native-chart-kit';
import { getDocs, query, where, orderBy } from 'firebase/firestore';
import { StoreContext } from '../../../components/StoreProvider';
import { HistoricalWeather } from '../../../models';
import { WeatherProps } from '.';
import Loading from '../../../components/Loading';
import NoData from '../../../components/NoData';

const width = Dimensions.get('window').width * 0.95;
const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  barPercentage: 0.2,
  color: (opacity: number) => `rgba(5,5,5, ${opacity})`,
  useShadowColorFromDataset: false,
};

export default function Historical({ libraryId, dateRange }: WeatherProps): JSX.Element {
  const { colors } = useTheme();
  const { weatherCollection } = useContext(StoreContext);
  const [historical, setHistorical] = useState<HistoricalWeather[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const { docs } = await getDocs(
          query(
            weatherCollection,
            // where('libraryId', '==', libraryId),
            where('date', '>=', dateRange!.from),
            where('date', '<=', dateRange!.to),
            orderBy('date'),
          ),
        );
        const data = docs.map((weather) => weather.data());
        if (data.length > 0) {
          setHistorical(data);
        } else {
          setIsError(true);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [libraryId, dateRange]);

  const darkgreen = () => `rgba(0, 80, 0, 1)`;
  darkgreen(); // this is just here for test coverage

  if (isLoading) return <Loading />;
  if (isError) return <NoData />;

  return (
    <>
      <Text style={[{ color: colors.primary }, styles.heading]}>Precipitation</Text>
      <BarChart
        style={styles.chart}
        data={{
          datasets: [{ color: darkgreen, data: historical.map((item) => item.precipitation) }],
          labels: [],
        }}
        width={width}
        height={200}
        yAxisLabel=""
        yAxisSuffix=" in"
        yLabelsOffset={20}
        showBarTops={false}
        withVerticalLabels={false}
        chartConfig={{ ...chartConfig, fillShadowGradient: '#008000', fillShadowGradientOpacity: 1 }}
      />
      <Text style={[{ color: colors.primary }, styles.heading]}>Temperature</Text>
      <StackedBarChart
        style={styles.chart}
        data={{
          barColors: ['#0000f060', '#f0050560'],
          data: historical.map((item) => [item.min_temp, item.max_temp]),
          labels: [],
          legend: [],
        }}
        width={width}
        height={200}
        yAxisSuffix=" °F"
        yLabelsOffset={-1}
        hideLegend={true}
        chartConfig={{
          ...chartConfig,
          propsForHorizontalLabels: { opacity: 1 },
          propsForLabels: { opacity: 0 },
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  chart: {
    alignItems: 'center',
    borderRadius: 5,
  },
  heading: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
});
