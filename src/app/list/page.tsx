import Link from 'next/link';

import Button from '@/components/Button';

import List from './List';

export default async function ListPage() {
  return (
    <div className="flex flex-col items-center">
      <List />
      <Link href="/list/new" className="mt-6">
        <Button color="primary" className="btn-circle shadow-xl">
          +
        </Button>
      </Link>
    </div>
  );
}
