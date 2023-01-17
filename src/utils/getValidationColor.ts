import { ValidationStatus } from '@/types';

export default function getValidationColor(validationStatus: ValidationStatus) {
  if (!validationStatus) return '0, 0%, 100%';

  const validationColorMap = {
    error: '355, 78%, 60%',
    warn: '47, 89%, 59%',
    success: '131, 67%, 60%',
  };

  return validationColorMap[validationStatus];
}
