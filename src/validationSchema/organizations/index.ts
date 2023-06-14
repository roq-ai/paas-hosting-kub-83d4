import * as yup from 'yup';
import { clusterValidationSchema } from 'validationSchema/clusters';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  cluster: yup.array().of(clusterValidationSchema),
});
