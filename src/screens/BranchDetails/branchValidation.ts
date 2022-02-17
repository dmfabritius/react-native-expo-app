import * as yup from 'yup';

export const branchValidationSchema = yup.object().shape({
  address1: yup.string().nullable(),
  address2: yup.string().nullable(),
  city: yup.string().nullable(),
  latitude: yup.number().label('Latitude').required('Latitude is required').min(-180).max(180),
  longitude: yup.number().label('Longitude').required('Longitude is required').min(-180).max(180),
  name: yup.string().label('Name').required('Name is required').min(2).max(64),
  note: yup.string().nullable(),
  state: yup.string().nullable(),
  zip: yup.string().label('Zip code').required('Zip code is required').min(5).max(10),
});
