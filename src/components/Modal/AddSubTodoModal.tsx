import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addSubTodo } from '../../features/todo/todoSlice';
import { Modal, Form, Input, message, Row, Col, Flex, Space, Button } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
  todoId: string | null;
}

const AddSubTodoModal: React.FC<Props> = ({ open, onClose, todoId }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (todoId) {
        dispatch(
          addSubTodo({
            todoId,
            subTodo: {
              id: Date.now().toString(),
              title: values.title,
              completed: false,
            },
          })
        );
        form.resetFields();
        onClose();
      }
    } catch {
      message.warning('Sub todo tidak boleh kosong!');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  return (
    <Modal
      open={open}
      footer={false}
      title="Add Sub Todo"
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Sub Todo"
              rules={[{ required: true, message: 'Sub todo is required!' }]}
            >
              <Input placeholder="Enter sub todo" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex justify='flex-end'>
              <Space>
                <Button key="save" type="primary" onClick={handleOk}>Save</Button>
                <Button key="cancel" onClick={handleCancel}>Cancel</Button>
              </Space>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddSubTodoModal;
