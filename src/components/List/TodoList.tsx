import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTodo, toggleTodo, toggleSubTodo, deleteSubTodo } from '../../features/todo/todoSlice';
import { Card, List, Typography, Checkbox, Button, Dropdown, MenuProps, Popconfirm, Row, Col, Flex } from 'antd';

import AddSubTodoModal from '../Modal/AddSubTodoModal';
import EditTodoModal from '../Modal/EditTodoModal';

const { Text } = Typography;

interface Props {
  checked: boolean;
}

interface SubTodoInterface {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoInterface {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  subTodos: SubTodoInterface[];
}

const TodoList: React.FC<Props> = ({ checked }) => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state =>
    state.todos.todos.filter(todo => todo.completed === checked)
  );

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [showSubModal, setShowSubModal] = useState(false);
  const [editModalTodo, setEditModalTodo] = useState<{
    id: string;
    title: string;
    date: string;
  } | null>(null);

  const openAddSubModal = (id: string) => {
    setSelectedTodoId(id);
    setShowSubModal(true);
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const renderSubTodos = (todo: TodoInterface) => (
    <List
      size="small"
      dataSource={todo.subTodos}
      renderItem={(sub) => (
        <List.Item style={{ width: '100%', display: 'table' }}>
          <Card style={{ borderRadius: 16, marginBottom: 10, boxShadow: '2px 5px 28px 0px #15488617' }} styles={{ body: { padding: 15 } }}>
            <Row gutter={16} align='middle'>
              <Col span={1}>
                <Checkbox
                  checked={sub.completed}
                  onChange={() => dispatch(toggleSubTodo({ todoId: todo.id, subTodoId: sub.id }))}
                />
              </Col>
              <Col span={21}>
                <Text delete={sub.completed}>
                  {sub.completed}
                  {sub.title}
                </Text>
              </Col>
              <Col span={2}>
                <Flex justify='flex-end'>
                  <Popconfirm
                    title="Delete this sub todo?"
                    onConfirm={() => dispatch(deleteSubTodo({ todoId: todo.id, subTodoId: sub.id }))}
                  >
                    <Button danger type="text">🗑</Button>
                  </Popconfirm>
                </Flex>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <Card title={checked ? 'Checked Todos' : 'Not Checked Todos'}>
      <Row gutter={16}>
        <Col span={24}>
          <List
            dataSource={todos}
            renderItem={(todo) => {
              const menuItems: MenuProps['items'] = [
                {
                  key: 'edit',
                  label: 'Edit',
                  onClick: () =>
                    setEditModalTodo({
                      id: todo.id,
                      title: todo.title,
                      date: todo.date,
                  }),
                },
                {
                  key: 'delete',
                  label: 'Delete',
                  onClick: () => handleDeleteTodo(todo.id),
                },
                {
                  key: 'create',
                  label: 'Create Sub Todo',
                  onClick: () => openAddSubModal(todo.id),
                },
              ];
              return (
                <List.Item
                  key={todo.id}
                  style={{
                    border: '1px solid #CDD5E0',
                    width: '100%',
                    display: 'table',
                    padding: 0,
                    marginBottom: 10,
                    borderRadius: 16,
                    boxShadow: '2px 5px 28px 0px #15488617',
                  }}
                >
                  <Card style={{ borderRadius: 16, boxShadow: '2px 5px 28px 0px #15488617' }} styles={{ body: { padding: 15 } }}>
                    <Row gutter={16} align='middle'>
                      <Col span={1}>
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => dispatch(toggleTodo(todo.id))}
                        />
                      </Col>
                      <Col span={13}>
                        <Text delete={todo.completed}>
                          {todo.title}
                        </Text>
                      </Col>
                      <Col span={8}>
                        <Flex justify='flex-end'>
                          <Text type="secondary" style={{ marginRight: 8 }}>
                            {todo.date}
                          </Text>
                        </Flex>
                      </Col>
                      <Col span={2}>
                        <Flex justify='flex-end'>
                          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                            <Button type="text" icon={<MoreOutlined />} />
                          </Dropdown>
                        </Flex>
                      </Col>
                    </Row>
                  </Card>
                  {todo.subTodos.length > 0 && renderSubTodos(todo)}
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
      <AddSubTodoModal
        open={showSubModal}
        todoId={selectedTodoId}
        onClose={() => setShowSubModal(false)}
      />
      <EditTodoModal
        todo={editModalTodo}
        open={!!editModalTodo}
        onClose={() => setEditModalTodo(null)}
      />
    </Card>
  );
};

export default TodoList;
