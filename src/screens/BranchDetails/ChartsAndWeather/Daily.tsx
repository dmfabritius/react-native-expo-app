import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import moment from 'moment';
import { StoreContext } from '../../../components/StoreProvider';
import { WeatherProps } from '.';
import { images, weatherIcons } from '../../../assets';
import { display, degrees2cardinal } from '../../../utils';
import RowView from '../../../components/RowView';
import Card from '../../../components/Card';

export default function Daily({ libraryId }: WeatherProps): JSX.Element {
  const { colors } = useTheme();
  const { libraryWeather } = useContext(StoreContext);

  return (
    <RowView style={styles.container}>
      {libraryWeather[libraryId].daily.slice(0, 4).map((day, index) => (
        <Card style={styles.card} key={index}>
          <Image style={styles.image} source={weatherIcons[day.weather[0].icon]} />
          <Text style={[{ color: colors.subtitle }, styles.day]}>
            {index === 0 ? 'Today' : moment().add(index, 'days').format('ddd')}
          </Text>
          <RowView style={styles.row}>
            <Image style={styles.icon} source={images.thermometer} />
            <Text style={styles.daily}>{day.temp.max.toFixed(0)} °F</Text>
          </RowView>
          <RowView style={styles.row}>
            <Image style={styles.icon} source={images.rain_drop} />
            <Text style={styles.daily}>{display(day.rain, 'in')}</Text>
          </RowView>
          <RowView style={styles.row}>
            <Image style={styles.icon} source={images.windy} />
            <Text style={styles.daily}>
              {degrees2cardinal(day.wind_deg)} {'\n'}
              {display(day.wind_speed, 'mph')}
            </Text>
          </RowView>
        </Card>
      ))}
    </RowView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 1,
    padding: 3,
    width: '24%',
  },
  container: {
    justifyContent: 'space-between',
  },
  daily: {
    fontSize: 12,
  },
  day: {
    alignSelf: 'center',
    fontSize: 14,
  },
  icon: {
    height: 16,
    marginRight: 10,
    width: 16,
  },
  image: {
    alignSelf: 'center',
    height: 45,
    width: 45,
  },
  row: {
    alignItems: 'center',
    paddingVertical: 3,
  },
});
