import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet context={{ searchValue }} />
        </main>
      </div>
    </div>
  );
}
