import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { GetProps } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { editTodo } from '../../features/todo/todoSlice';
import { Modal, Form, Input, DatePicker, message, Row, Col, Flex, Space, Button } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
  todo: {
    id: string;
    title: string;
    date: string;
  } | null;
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const EditTodoModal: React.FC<Props> = ({ open, onClose, todo }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        title: todo.title,
        date: dayjs(todo.date, 'DD/MM/YYYY HH:mm'),
      });
    }
  }, [todo, form]);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current < dayjs().startOf('day');
    };
  
    const disabledDateTime = (current: Dayjs | null) => {
      const now = dayjs();
    
      if (current && current.isSame(now, 'day')) {
        const currentHour = now.hour();
        const currentMinute = now.minute();
    
        return {
          disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
          disabledMinutes: (selectedHour: number) => {
            return selectedHour === currentHour
              ? Array.from({ length: currentMinute }, (_, i) => i)
              : [];
          },
          disabledSeconds: () => [],
        };
      }
    
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (todo) {
        dispatch(editTodo({
          id: todo.id,
          title: values.title,
          date: (values.date as Dayjs).format('DD/MM/YYYY HH:mm'),
        }));
        form.resetFields();
        onClose();
      }
    } catch {
      message.error('Please complete the form correctly.');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      footer={false}
      title="Edit Todo"
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <Input placeholder="Enter todo title" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Date is required' }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: '100%' }}
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
              />
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

export default EditTodoModal;
