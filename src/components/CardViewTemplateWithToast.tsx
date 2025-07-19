import React from 'react';
import { ToastProvider } from './Toast';
import CardViewTemplate from './CardViewTemplate';

interface CardViewTemplateWithToastProps {
  title: string;
  description: string;
}

const CardViewTemplateWithToast: React.FC<CardViewTemplateWithToastProps> = ({ title, description }) => {
  return (
    <ToastProvider>
      <CardViewTemplate title={title} description={description} />
    </ToastProvider>
  );
};

export default CardViewTemplateWithToast;