import { notification } from 'antd';

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).then(
    () => {
      notification.success({
        placement: 'top',
        message: 'Sao chép thành công',
      });
    },
    (err) => {
      console.error('Failed to copy text to clipboard:', err);
    },
  );
};
