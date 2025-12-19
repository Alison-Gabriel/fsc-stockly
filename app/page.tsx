import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "./_components/header";

const HomePage = () => {
  return (
    <main className="h-full space-y-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Dashboard</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
    </main>
  );
};

export default HomePage;
