import { ImageSourcePropType } from 'react-native';
import { images } from '../assets';

/**
 * Determine the appropriate battery icon given a voltage level.
 *
 * @param      {number | undefined}  voltage    Voltage level
 * @return     {image}                          Battery icon
 */
export const getBatteryIcon = (voltage: number | undefined): ImageSourcePropType => {
  const max = 13.0;
  const sixth = max / 6;
  return !voltage
    ? images.batterynodata
    : voltage < 1 * sixth
    ? images.battery1
    : voltage < 2 * sixth
    ? images.battery2
    : voltage < 3 * sixth
    ? images.battery3
    : voltage < 4 * sixth
    ? images.battery4
    : voltage < 5 * sixth
    ? images.battery5
    : images.battery6;
};
