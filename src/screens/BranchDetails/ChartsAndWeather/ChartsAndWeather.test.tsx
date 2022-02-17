// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react-native';
import moment from 'moment';
import { rest, server } from '../../../msw/setupServer';
import StoreProvider from '../../../components/StoreProvider';
import BranchDetails from '../BranchDetails';

// Charts & weather are shown by default on the BranchDetails screen
// if this changes, use the test setup for BasicInfo or Alerts as a template
describe('Component <BranchDetails />', () => {
  let props: any;
  beforeEach(
    () =>
      (props = {
        navigation: { goBack: jest.fn(), navigate: jest.fn() },
        route: {
          params: {
            dateRange: {
              from: moment().subtract(1, 'month').toDate().toISOString(),
              to: moment().toDate().toISOString(),
            },
            id: 1,
          },
        },
      }),
  );
  it('renders Branch details with alerts', async () => {
    // mount the component and let it load/populate the mock details data
    server.use(point, daily, historical);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/Temperature/, { interval: 250 });
  });
  it('renders Branch details with no weather', async () => {
    server.use(point, no_daily, no_historical);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findAllByText(/NO DATA/, { interval: 250 });
  });
  it('renders Branch details with weather unavailable', async () => {
    server.use(point, unavailable);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findAllByText(/NO DATA/, { interval: 250 });
  });
});

const point = rest.get('*/point-summary/point/1', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ monitoringPoint: { id: 1, name: 'LogoIpsum' } }));
});

const daily = rest.get('*/forecast/daily', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      weather: [
        { timestampUtc: moment().toDate().toISOString(), weatherCodeType: 'CLEAR' },
        { timestampUtc: moment().add(1, 'day').toDate().toISOString() },
      ],
    }),
  );
});

const no_daily = rest.get('*/forecast/daily', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ alerts: [] }));
});

const historical = rest.get('*/historical', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      weather: [
        {
          precipitationIn: 1,
          temperatureFahr: 72,
          timestampUtc: moment().toDate().toISOString(),
        },
        { timestampUtc: moment().add(1, 'day').toDate().toISOString() },
        { timestampUtc: moment().add(1, 'day').toDate().toISOString() },
      ],
    }),
  );
});

const no_historical = rest.get('*/historical', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ alerts: [] }));
});

const unavailable = rest.get('*', (_, res) => {
  return res.networkError('Network error');
});

/*
forecast/daily, returns array of 9 daily forecasts
weather:[
  {
    "id": 2250914,
    "precipitationFt": 0,
    "precipitationIn": 0,
    "precipitationType": "RAIN",
    "temperatureFahr": 62.834,
    "timestampHour": 1618970400,
    "timestampHourUtc": "2021-04-21T02:00:00Z",
    "timestampSec": 1618972800,
    "timestampUtc": "2021-04-21T02:40:00Z",
    "weatherCodeType": "CLEAR",
    "weatherBranchId": 1,
    "windDirectionDeg": 350.5,
  },
]
*/

/*
weather/${weatherBranchId}/historical return array of potentially 1,000s of records
weather: [
  {
    "precipitationAccumulation": 0,
    "precipitationAccumulationIn": 0,
    "precipitationAccumulationMm": 0,
    "temperatureCel": Object {
      "max": Object {
        "value": 15.68,
      },
      "min": Object {
        "value": 15.68,
      },
    },
    "temperatureFahr": Object {
      "max": Object {
        "value": 60.224,
      },
      "min": Object {
        "value": 60.224,
      },
    },
    "timestampHour": 1621468800,
    "timestampHourUtc": "2021-05-20T00:00:00Z",
    "timestampSec": 1621468800,
    "timestampUtc": "2021-05-20T00:00:00Z",
    "weatherCodeType": "CLOUDY",
    "weatherBranchId": 1,
    "windDirectionDeg": Object {
      "max": Object {
        "value": 203.76,
      },
      "min": Object {
        "value": 203.76,
      },
    },
    "windSpeedFps": Object {
      "max": Object {
        "value": 12.07349,
      },
      "min": Object {
        "value": 12.07349,
      },
    },
    "windSpeedMps": Object {
      "max": Object {
        "value": 3.68,
      },
      "min": Object {
        "value": 3.68,
      },
    },
  }
]
*/
