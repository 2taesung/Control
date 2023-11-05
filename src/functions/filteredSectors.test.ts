import { ALL_SECTORS } from '@src/constants/display/index';

import filteredSectors from './filteredSectors';
import * as filteredSectorsByAppNameModule from './filteredSectorsByAppName';

jest.mock('./filteredSectorsByAppName');

describe('filteredSectors function', () => {
  let mockFilteredSectorsByAppName: jest.Mock<
    string[],
    [{ filteredSectorsBySite: string[]; currentAppName: string }]
  >;

  beforeEach(() => {
    mockFilteredSectorsByAppName = jest.fn();
    (filteredSectorsByAppNameModule.filteredSectorsByAppName as jest.Mock) =
      mockFilteredSectorsByAppName;
  });

  afterEach(() => {
    mockFilteredSectorsByAppName.mockClear();
  });

  test('it should return sectors by site if currentSite is not tb', () => {
    const currentSite = 'oc';
    const currentAppName = 'chart';
    const result = filteredSectors({ currentSite, currentAppName });
    expect(result).toEqual(ALL_SECTORS[currentSite]);
    expect(mockFilteredSectorsByAppName).not.toHaveBeenCalled();
  });

  test('it should return sectors by app name if currentSite is tb', () => {
    const currentSite = 'tb';
    const currentAppName = 'chart';
    const filteredSectorsBySite = ALL_SECTORS[currentSite];
    const expectedResult = ['expected', 'sectors'];

    mockFilteredSectorsByAppName.mockReturnValue(expectedResult);
    const result = filteredSectors({ currentSite, currentAppName });

    expect(result).toEqual(expectedResult);

    expect(mockFilteredSectorsByAppName).toHaveBeenCalledWith({
      filteredSectorsBySite,
      currentAppName,
    });
  });
});
