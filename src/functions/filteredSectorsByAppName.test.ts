import { filteredSectorsByAppName } from './filteredSectorsByAppName'; // replace with the correct import

describe('filteredSectorsByAppName', () => {
  it('should correctly filter sectors based on current app name', () => {
    const filteredSectorsBySite = ['n', 'f1', 'f2', 'f3', 'f4', 'out', 'extra'];
    const currentAppName = 'hvac';

    const result = filteredSectorsByAppName({
      filteredSectorsBySite,
      currentAppName,
    });

    expect(result).toEqual(['n', 'f1', 'f2', 'f3', 'f4']);
  });

  it('should return an empty array if no sectors match', () => {
    const filteredSectorsBySite = ['extra1', 'extra2'];
    const currentAppName = 'hvac';

    const result = filteredSectorsByAppName({
      filteredSectorsBySite,
      currentAppName,
    });

    expect(result).toEqual([]);
  });

  it('should throw an error if app name does not exist in SECTORS_FILTER_APPNAME_DATA', () => {
    const filteredSectorsBySite = ['n', 'f1', 'f2', 'f3', 'f4', 'out'];
    const currentAppName = 'non-existent-app';

    const result = filteredSectorsByAppName({
      filteredSectorsBySite,
      currentAppName,
    });

    expect(result).toEqual([]);
  });
});
