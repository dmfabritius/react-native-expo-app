/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import moment from 'moment';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { rest, server } from '../../msw/setupServer';
import * as weather from '../../msw/weather';
import StoreProvider from '../../components/StoreProvider';
import BranchSummary from './BranchSummary';

describe('Component <BranchSummary />', () => {
  let props: any;
  beforeEach(() => (props = { navigation: { navigate: jest.fn() } }));

  it('renders summary', async () => {
    // mount the component and let it load/populate the mock summary data
    server.use(monitoringPoint_summary, weather.branches, weather.current, weather.summary);
    const screen = render(<BranchSummary {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/LogoIpsum/, { interval: 250 });

    // expand the first accordian group and simulate selecting an item
    const expand = screen.getAllByTestId('Expand.Item')[0];
    fireEvent.press(expand);
    const goto = screen.getAllByText(/Battery/)[0];
    fireEvent.press(goto);

    // fill in a search term and verify the list is filtered
    const search = screen.getByPlaceholderText('Search');
    fireEvent.changeText(search, 'testing');
    const filtered = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
    expect(filtered.length).toBe(0);

    // simulate adding a new item
    const add = screen.getByTestId('Add.Item');
    fireEvent.press(add);
  });
  it('handles summary with weather unavailable', async () => {
    server.use(monitoringPoint_summary, weather.branches_unavailable);
    const screen = render(<BranchSummary {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/LogoIpsum/, { interval: 250 });
  });
  it('handles summary and weather unavailable', async () => {
    server.use(monitoringPoint_summary_unavailable, weather.branches_unavailable);
    const screen = render(<BranchSummary {...props} />, { wrapper: StoreProvider });
    const missing = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
    expect(missing.length).toBe(0);
  });
});

const monitoringPoint_summary = rest.get('*/point-summary', (_, res, ctx) => {
  const updatedTimestampUtc = moment().subtract(1, 'week').toDate().toISOString();
  return res(
    ctx.status(200),
    ctx.json({
      monitoringPointSummarys: [
        {
          currentStatus: { connection: 'CONNECTED' },
          monitoringPoint: {
            isDraft: true,
            name: 'LogoIpsum',
            updatedTimestampUtc,
            weatherBranchId: 1,
          },
          summary: {},
        },
        { currentStatus: {}, monitoringPoint: { name: 'Test', updatedTimestampUtc }, summary: {} },
        { currentStatus: {}, monitoringPoint: { name: 'Test', updatedTimestampUtc }, summary: {} },
        { currentStatus: {}, monitoringPoint: { name: 'Office Pond', updatedTimestampUtc }, summary: {} },
      ],
    }),
  );
});

const monitoringPoint_summary_unavailable = rest.get('*/point-summary', (_, res) => {
  return res.networkError('Network error');
});
