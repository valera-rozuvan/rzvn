import { makeUniqueActionTypes } from '../../utils';

const AppsActionTypes = makeUniqueActionTypes({
  setApps: 'ET_APPS',
  updateApp: 'UPDATE_APP',
  createApp: 'CREATE_APP',
  deleteApp: 'DELETE_APP',
});

export default AppsActionTypes;
