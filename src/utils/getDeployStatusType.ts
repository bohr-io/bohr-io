type StatusName = keyof typeof deploysStatusTypeMap

const deploysStatusTypeMap = {
  BUILDING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function getDeployStatusType(statusName: StatusName) {
  return deploysStatusTypeMap[statusName] || 'off';
}
