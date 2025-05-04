import { Col, Result, Row } from 'antd';

const HomePage = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Result
          status="404"
          title="Coming soon"
          subTitle="Sorry, the page you visited does not exist."
        />
      </Col>
    </Row>
  );
};

export default HomePage;