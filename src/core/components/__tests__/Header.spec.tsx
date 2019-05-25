import * as React from "react";
import { shallow } from "enzyme";

import { Header } from '../header/Header';

describe('Header Component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <Header />
    );
    expect(tree).toMatchSnapshot();
  });
});
