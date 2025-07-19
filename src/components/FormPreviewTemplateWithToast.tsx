import React from 'react';
import { ToastProvider } from './Toast';
import FormPreviewTemplate from './FormPreviewTemplate';

interface FormField {
  label: string;
  value?: string;
}

interface FormPreviewTemplateWithToastProps {
  title: string;
  description: string;
  fields: FormField[];
}

const FormPreviewTemplateWithToast: React.FC<FormPreviewTemplateWithToastProps> = ({ title, description, fields }) => {
  return (
    <ToastProvider>
      <FormPreviewTemplate title={title} description={description} fields={fields} />
    </ToastProvider>
  );
};

export default FormPreviewTemplateWithToast;