import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "../components/EditableSpan/editableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan '
        }
    },
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    onChange: action('Value EditableSpan changed')
}
