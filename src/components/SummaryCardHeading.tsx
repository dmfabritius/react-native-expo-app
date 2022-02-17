import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { Weather } from '../models';
import { images, weatherIcons } from '../assets';
import { display } from '../utils';
import RowView from './RowView';

interface Props {
  name: string;
  isDraft?: boolean;
  weather: Weather;
}

export default function SummaryCardHeading({ name, isDraft, weather }: Props): JSX.Element {
  const { colors } = useTheme();
  const image = weatherIcons[weather.current.weather[0].icon];

  return (
    <RowView>
      <Image style={styles.image} source={image} />
      <View>
        <RowView>
          <Text style={{ color: colors.primary }}>{name}</Text>
          {isDraft ? <Text style={[{ color: colors.error }, styles.draft]}>DRAFT</Text> : <></>}
        </RowView>
        <RowView>
          <Text style={styles.label}>Weather:</Text>
          <Text>{weather.current.weather[0].description}</Text>
        </RowView>
        <RowView>
          <Text style={styles.label}>Humidity:</Text>
          <Text>{display(weather.current.humidity, '%')}</Text>
        </RowView>
      </View>
    </RowView>
  );
}

const styles = StyleSheet.create({
  draft: {
    fontSize: 11,
    fontStyle: 'italic',
    paddingLeft: 10,
    paddingTop: 2,
  },
  image: {
    height: 45,
    marginRight: 15,
    width: 45,
  },
  label: {
    color: '#808080',
    paddingRight: 5,
  },
});
