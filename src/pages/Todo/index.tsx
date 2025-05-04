import { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "../../app/hooks"
import { Button, Col, Flex, Image, Row, Space } from "antd"

import TodoList from "../../components/List/TodoList"
import TodoTitle from '../../assets/TodoTitle.png'
import AddTodoModal from "../../components/Modal/AddTodoModal"
import EmptyTodo from '../../assets/EmptyTodo.png'

const Todo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const todos = useAppSelector(state =>
    state.todos.todos
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space size='large' style={{ marginBottom: 32 }}>
          <Image src={TodoTitle} preview={false} width={93} />
          <Button
            type="primary"
            size="large"
            style={{ width: 230, height: 44, fontWeight: 600 }}
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
          >
            Create Todo
          </Button>
        </Space>
      </Col>
      {todos && todos.length > 0 ? (
        <>
          <Col span={12}>
            <TodoList checked={false} />
          </Col>
          <Col span={12}>
            <TodoList checked={true} />
          </Col>
        </>
      ) : (
        <Col span={24}>
          <Flex justify="center">
            <Image src={EmptyTodo} preview={false} width={273} />
          </Flex>
        </Col>
      )}
      <AddTodoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Row>
  )
}

export default Todo