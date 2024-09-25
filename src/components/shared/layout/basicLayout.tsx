import { Header } from './header/header';

export function BasicLayout({ children, onSearch }: any) {
  return (
    <>
      <Header onSearch={onSearch}></Header>
      {children}
    </>
  );
}
