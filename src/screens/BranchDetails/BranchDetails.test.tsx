// yarn test projdetails --coverage
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import moment from 'moment';
import { rest, server } from '../../msw/setupServer';
import { sleep } from '../../utils';
import StoreProvider from '../../components/StoreProvider';
import BranchDetails from './BranchDetails';

// an id number of 0 indicates a new Branch, otherwise it's an existing one
const createTestProps = (id: number) => ({
  navigation: { goBack: jest.fn(), navigate: jest.fn() },
  route: {
    params: {
      dateRange: {
        from: moment().subtract(1, 'month').toDate().toISOString(),
        to: moment().toDate().toISOString(),
      },
      id,
    },
  },
});

describe('Component <BranchDetails />', () => {
  it('renders Branch details and shows branch, pipe details, installation, and notifications', async () => {
    // mount the component and let it load/populate the mock details data
    server.use(point, unavailable);
    const props: any = createTestProps(1);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findAllByText(/NO DATA/, { interval: 250 });

    const edit = await screen.findByTestId('Edit.Button');
    fireEvent.press(edit);
    const cancel = await screen.findByTestId('Cancel.Button');
    fireEvent.press(cancel);
    fireEvent.press(edit);
    const submit = await screen.findByTestId('Submit.Button');
    await act(async () => fireEvent.press(submit)); // wait for Formik to handle submit

    const back = await screen.findByTestId('Go.Back');
    fireEvent.press(back);

    const showMenu = await screen.findByTestId('Show.MenuBar');
    fireEvent.press(showMenu);
    const branch = await screen.findByTestId('MenuItem.Branch');
    fireEvent.press(branch);
    screen.getAllByText(/Latitude/);

    fireEvent.press(showMenu);
    const pipe = await screen.findByTestId('MenuItem.Pipe');
    fireEvent.press(pipe);
    screen.getAllByText(/Material/);

    fireEvent.press(showMenu);
    const install = await screen.findByTestId('MenuItem.Installation');
    fireEvent.press(install);
    screen.getAllByText(/Upper Unit/);

    fireEvent.press(showMenu);
    const note = await screen.findByTestId('MenuItem.Notifications');
    fireEvent.press(note);
    screen.getAllByText(/notifications/);
  });
  it('renders new Branch', async () => {
    // mount the component as a new library
    server.use(point, unavailable);
    const props: any = createTestProps(0);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findAllByText(/NO DATA/, { interval: 250 });
  });
  it('handles network error', async () => {
    server.use(point_unavailable);
    const props: any = createTestProps(1);
    const screen = render(<BranchDetails {...props} />, { wrapper: StoreProvider });
    await screen.findAllByText(/NO DATA/, { interval: 250 });
    await sleep(250);
  });
});

const point = rest.get('*/point-summary/point/1', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      monitoringPoint: { id: 1, name: 'LogoIpsum' },
    }),
  );
});

const point_unavailable = rest.get('*/point-summary/point/1', (_, res) => {
  return res.networkError('Network error');
});

const unavailable = rest.get('*', (_, res) => {
  return res.networkError('Network error');
});
