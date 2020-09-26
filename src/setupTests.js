import '@testing-library/jest-dom';
import { createSerializer } from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

const noScroll = () => {}
Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true })