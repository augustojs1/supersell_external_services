export const EmailStatusTemplateConstant = {
  PENDING_PAYMENT: {
    templatePath: 'src/templates/order_status_pending_payment.ejs',
    getSubject: (order_id: string) =>
      `Action Required: Complete Your Payment for Order #${order_id}`,
  },
  FAILED_PAYMENT: {
    templatePath: 'src/templates/order_status_failed_payment.ejs',
    getSubject: (order_id: string) =>
      `Payment Failed for Order #${order_id} – Try Again`,
  },
  PAID: {
    templatePath: 'src/templates/order_status_paid.ejs',
    getSubject: (order_id: string) =>
      `Payment Received! Your Order #${order_id} is Being Processed`,
  },
  SENT: {
    templatePath: 'src/templates/order_status_sent.ejs',
    getSubject: (order_id: string) =>
      `Your Order #${order_id} Has Been Shipped!`,
  },
  ON_DELIVERY: {
    templatePath: 'src/templates/order_status_on_delivery.ejs',
    getSubject: (order_id: string) =>
      `Your Order #${order_id} is Out for Delivery!`,
  },
  DELIVERED: {
    templatePath: 'src/templates/order_status_delivered.ejs',
    getSubject: (order_id: string) =>
      `Your Order #${order_id} Has Been Delivered!`,
  },
  CANCELLED: {
    templatePath: 'src/templates/order_status_cancelled.ejs',
    getSubject: (order_id: string) =>
      `Your Order #${order_id} Has Been Cancelled`,
  },
};
