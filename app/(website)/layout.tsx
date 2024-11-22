import Header from "@/components/header/header";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <Header />
        {children}
    </div>
  )
}

export default layout