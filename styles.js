import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	home: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	scanner: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	scanner_top: {
		flex: .3,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		margin: 10,
		fontSize: 30
	},
	buttonContainer: {
		margin: 20
	},
	doubleButtons: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	input: {
		margin: 10,
		fontSize: 20
	}
});