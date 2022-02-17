// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import moment from 'moment';
import { rest, server } from '../../msw/setupServer';
import StoreProvider from '../../components/StoreProvider';
import BranchDetails from './BranchDetails';

describe('Component <BranchDetails />', () => {
  it('renders Branch details with basic info', async () => {
    // mount the component and let it load/populate the mock details data
    server.use(point, options, unavailable);
    const screen = await gotoBasicInfo();
    await screen.findAllByText(/Technician Name/, { interval: 250 });
  });
  it('renders Branch details with no options', async () => {
    server.use(point, no_options, unavailable);
    const screen = await gotoBasicInfo();
    await screen.findAllByText(/Technician Name/, { interval: 250 });
  });
  it('renders Branch details with options unavailable', async () => {
    server.use(point, unavailable);
    const screen = await gotoBasicInfo();
    await screen.findAllByText(/Technician Name/, { interval: 250 });
  });
});

const options = rest.get('*/option', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      options: [
        { id: 1, name: 'Test Option1' },
        { id: 2, name: 'Test Option2' },
      ],
    }),
  );
});

// BasicInfo is not shown by default on the BranchDetails screen
// so start each test by using the menu to select it
const gotoBasicInfo = async (): Promise<RenderAPI> => {
  const props: any = {
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
  };
  const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
  await screen.findAllByText(/NO DATA/, { interval: 250 });
  const showMenu = await screen.findByTestId('Show.MenuBar');
  fireEvent.press(showMenu);
  const info = await screen.findByTestId('MenuItem.BasicInfo');
  fireEvent.press(info);
  return screen;
};

const point = rest.get('*/point-summary/point/1', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ monitoringPoint: { id: 1, name: 'LogoIpsum' } }));
});

const no_options = rest.get('*/option', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ options: [] }));
});

const unavailable = rest.get('*', (_, res) => {
  return res.networkError('Network error');
});
