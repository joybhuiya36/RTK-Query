import { Button, Checkbox, Flex, Input, Spin, Typography } from "antd";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../services/apliSlice";
import "./Home.scss";
import { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const {
    data: tasksList,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { Text } = Typography;

  const handleAddClick = () => {
    if (text.trim() != "") {
      const taskData = JSON.parse(JSON.stringify(tasksList));
      const data = {
        id: (Number(taskData[0]?.id) + 1).toString(),
        title: text.trim(),
        isCompleted: false,
      };
      addTask(data);
    }
    setText("");
  };

  const handleOnDelete = (id) => (e) => {
    deleteTask(id);
  };

  const handleInputOnChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const handleCheckboxOnChange = (id) => (e) => {
    const isChecked = e.target.checked;
    let updatedTask = { ...tasksList?.find((task) => task?.id == id) };
    updatedTask.isCompleted = isChecked;
    updateTask(updatedTask);
  };

  return (
    <Flex className="task" vertical gap={20}>
      <Text className="task__header">My Tasks</Text>
      <Flex className="task__inputWarapper">
        <Input value={text} onChange={handleInputOnChange} />
        <Button onClick={handleAddClick}>Add</Button>
      </Flex>
      <Flex vertical gap={10}>
        {isLoading && <Spin size="large" />}
        {isError && <Text className="task__error">Something went wrong</Text>}
        {tasksList &&
          tasksList?.map((task, index) => (
            <Checkbox
              key={index}
              checked={task?.isCompleted}
              onChange={handleCheckboxOnChange(task?.id)}
            >
              <Flex justify="space-between" className="task__item">
                <Text style={{ textAlign: "left" }}>{task?.title}</Text>
                <Button
                  className="task__button"
                  onClick={handleOnDelete(task?.id)}
                >
                  X
                </Button>
              </Flex>
            </Checkbox>
          ))}
      </Flex>
    </Flex>
  );
};

export default Home;
