import { Router } from '../router/router';
import { CartStatus } from '../shared/layout/cartStatus/cartStatus';

export function App() {
  return (
    <div>
      <Router />
      <CartStatus />
    </div>
  );
}
