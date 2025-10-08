
 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth, AuthProvider } from '@/hooks/use-auth';

function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Login failed');
      const { token, user } = body;
      if (token) localStorage.setItem('auth_token', token);
      if (user && (user.id || user._id)) sessionStorage.setItem('userId', String(user.id ?? user._id));
      // inform auth context
      login(user.id ?? user._id as any);
      router.replace('/dashboard');
    } catch (err: any) {
      alert(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-headline">
      <Card className="w-full max-w-md border-4 border-black">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-black tracking-tighter">PIXELATE NEST</CardTitle>
          <CardDescription className="text-lg font-bold text-muted-foreground">AGENCY CRM LOGIN</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
}
