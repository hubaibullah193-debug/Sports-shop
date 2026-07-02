import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd'
) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
    });
    return intent;
  } catch (error) {
    console.error('Stripe error:', error);
    throw error;
  }
};

export const createCheckoutSession = async (items: any[]) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });
    return session;
  } catch (error) {
    console.error('Stripe error:', error);
    throw error;
  }
};

export default stripe;
