export const EmailStatusTemplateConstant = {
  PENDING_PAYMENT: {
    templatePath: 'src/templates/order_status_pending_payment.ejs',
    getSubject: (order_id: string) =>
      `Action Required: Complete Your Payment for Order #${order_id}`,
  },
};
