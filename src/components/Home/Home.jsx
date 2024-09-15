import { Button, Checkbox, Flex, Input, Spin, Typography } from "antd";
import { useGetTasksQuery } from "../../services/apliSlice";
import "./Home.scss";
import { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const { data: tasksList, isLoading, isSuccess, isError } = useGetTasksQuery();
  const { Text } = Typography;

  const handleInputOnChange = (e) => {
    const value = e.target.value;
    setText(value);
  };
  const handleCheckboxOnChange = (e) => {
    const isChecked = e.target.checked;
  };

  return (
    <Flex className="task" vertical gap={20}>
      <Text className="task__header">My Tasks</Text>
      <Flex className="task__inputWarapper">
        <Input value={text} onChange={handleInputOnChange} />
        <Button>Add</Button>
      </Flex>
      <Flex vertical gap={10}>
        {isLoading && <Spin size="large" />}
        {isError && <Text className="task__error">Something went wrong</Text>}
        {tasksList?.map((task, index) => (
          <Flex key={index}>
            <Checkbox
              checked={task?.isCompleted}
              onChange={handleCheckboxOnChange}
            >
              <Flex justify="space-between" className="task__item">
                <Text>{task?.title}</Text>
                <Button className="task__button">X</Button>
              </Flex>
            </Checkbox>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
