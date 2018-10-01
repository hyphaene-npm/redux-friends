import classnames from 'classnames';
import { withState, withHandlers } from 'recompose';

export const withStateActiveTab = defaultTab => withState('activeTab', 'setActiveTab', defaultTab);

export const styleTabHandler = props => tabId => classnames({ active: props.activeTab === tabId });
export const toggleHandler = props => tab => () => {
	if (props.activeTab !== tab) {
		props.setActiveTab(tab);
	}
};

export const withToggle = withHandlers({
	onToggle: toggleHandler,
	onStyleTab: styleTabHandler,
});
