import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import type { GetProps } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todo/todoSlice';
import { Modal, Input, DatePicker, Button, Form, Row, Col, Space, Flex } from 'antd';

interface Props {
  open: boolean;
  onClose: () => void;
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const AddTodoModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();

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

  const onFinish = (values: { title: string; date: Dayjs; }) => {
    const value = {
      id: Date.now().toString(),
      title: values.title,
      date: (values.date as Dayjs).format('DD/MM/YYYY HH:mm'),
      completed: false,
      subTodos: [],
    }
    dispatch(addTodo(value));
    onClose();
  };

  return (
    <Modal
      title="Add Todo"
      open={open}
      footer={false}
      onCancel={onClose}
    >
      <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label='Todo'
              name='title'
              rules={[
                { required: true, message: 'Please input your todo!' }
              ]}
            >
              <Input placeholder="Todo" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='date'
              label='Date Time'
              rules={[
                { required: true, message: 'Please input your date time!' }
              ]}
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
                <Button key="save" type="primary" htmlType='submit'>Save</Button>
                <Button key="cancel" onClick={onClose}>Cancel</Button>
              </Space>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
