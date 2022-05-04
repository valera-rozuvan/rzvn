const { AppCreateValidator } = require('./AppCreateValidator');
const { AppUpdateValidator } = require('./AppUpdateValidator');
const { ObjIdValidator } = require('./ObjIdValidator');
const { SuperAdminCreateValidator } = require('./SuperAdminCreateValidator');
const { SuperAdminUpdateValidator } = require('./SuperAdminUpdateValidator');

module.exports = {
  AppCreateValidator,
  AppUpdateValidator,
  ObjIdValidator,
  SuperAdminCreateValidator,
  SuperAdminUpdateValidator,
};
