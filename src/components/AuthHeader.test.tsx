import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AuthHeader from './AuthHeader';

describe('Component <AuthHeader />', () => {
  it('component renders logged out', () => {
    const shallow = ShallowRenderer.createRenderer();
    shallow.render(<AuthHeader />);
    const tree = shallow.getRenderOutput();
    expect(tree).toBeTruthy();
  });
});
