import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../App';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: () => null,
}));

describe('Component <App />', () => {
  it('component renders', () => {
    const shallow = ShallowRenderer.createRenderer();
    shallow.render(<App />);
    const tree = shallow.getRenderOutput();
    expect(tree).toBeTruthy();
  });
});
