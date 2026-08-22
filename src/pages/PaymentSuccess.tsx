import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/db/supabase';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('No payment session found');
      setVerifying(false);
      return;
    }

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('verify_stripe_payment', {
        body: JSON.stringify({ sessionId }),
      });

      if (invokeError) {
        const errorMsg = await invokeError?.context?.text();
        console.error('Verification error:', errorMsg || invokeError?.message);
        setError(errorMsg || 'Failed to verify payment');
      } else if (data?.data?.verified) {
        setVerified(true);
      } else {
        setError('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {verifying ? (
            <div className="text-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Verifying Payment</h2>
              <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
            </div>
          ) : verified ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/my-bookings">View My Bookings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Verification Failed</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/booking">Try Again</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
