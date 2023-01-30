import {Task, TaskPropsType} from "./Task";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Task',
    component: Task,
    } as Meta

const changeTaskStatusCallback=action('Status changed inside Task ')
const changeTaskTitleCallback=action('Title changed inside Task ')
const removeTaskCallback=action('Remove Button  inside Task clicked ')


const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArgs={
    changeTaskStatus:changeTaskStatusCallback,
    changeTaskTitle:changeTaskTitleCallback,
    removeTask:removeTaskCallback
}
export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {

    ...baseArgs,
    task: {id: '1', title: 'JS', isDone: true},
    todolistId: 'todolistId1'
}


export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {

    ...baseArgs,
    task: {id: '1', title: 'JS', isDone: false},
    todolistId: 'todolistId1'
}
