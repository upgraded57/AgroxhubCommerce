interface Prop {
  fieldName: string;
  formik: Record<string, any>;
}

export default function ErrorMessage({ formik, fieldName }: Prop) {
  return formik.touched[fieldName] && formik.errors[fieldName] ? (
    <p className="text-xs text-red-400 mt-1">{formik.errors[fieldName]}</p>
  ) : null;
}
