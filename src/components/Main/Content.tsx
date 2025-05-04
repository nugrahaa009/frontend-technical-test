import { Layout } from "antd"
import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <Layout.Content style={{ padding: 30 }}>
      {children}
    </Layout.Content>
  )
}

export default Content