
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "../app/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta

const Template: Story = (args) => <AppWithRedux {...args}/>

export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args = {}
