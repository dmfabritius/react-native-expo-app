/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { rest, server } from '../../msw/setupServer';
import * as weather from '../../msw/weather';
import StoreProvider from '../../components/StoreProvider';
import LibrarySummary from './LibrarySummary';

describe('Component <LibrarySummary />', () => {
  let props: any;
  beforeEach(() => (props = { navigation: { navigate: jest.fn() } }));

  it('renders summary', async () => {
    // mount the component and let it load/populate the mock summary data
    server.use(library_summary, weather.branches, weather.current, weather.summary);
    const screen = render(<LibrarySummary {...props} />, { wrapper: StoreProvider });
    await screen.findByText(/LogoIpsum/, { interval: 250 });

    // expand the first accordian group and simulate selecting an item
    const expand = screen.getAllByTestId('Expand.Item')[0];
    fireEvent.press(expand);
    const goto = screen.getAllByText(/Monitoring Points/)[0];
    fireEvent.press(goto);

    // fill in a search term and verify the list is filtered
    const search = screen.getByPlaceholderText('Search');
    fireEvent.changeText(search, 'testing');
    const filtered = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
    expect(filtered.length).toBe(0);
  });
  it('handles network error', async () => {
    server.use(library_summary_unavailable, weather.branches_unavailable);
    const screen = render(<LibrarySummary {...props} />, { wrapper: StoreProvider });
    const missing = await waitFor(() => screen.queryAllByText(/LogoIpsum/), { interval: 500, timeout: 500 });
    expect(missing.length).toBe(0);
  });
});

const library_summary = rest.get('*/library-summary', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      librarySummarys: [
        { currentStatus: {}, library: { name: 'LogoIpsum' }, summary: {} },
        { currentStatus: {}, library: { name: 'Test' }, summary: {} },
        { currentStatus: {}, library: { name: 'Test' }, summary: {} },
        { currentStatus: {}, library: { name: 'Hydro-Bench' }, summary: {} },
      ],
    }),
  );
});

const library_summary_unavailable = rest.get('*/library-summary', (_, res) => {
  return res.networkError('Network error');
});
