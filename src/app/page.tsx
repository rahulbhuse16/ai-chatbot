// app/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { handler } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(handler);

  if (session) {
    redirect('/chat');
  } else {
    redirect('/login');
  }
}
