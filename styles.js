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
		justifyContent: 'flex-end'
	},
	scanner_alt: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	scanner_alt_top: {
		height: 200,
		flexDirection: 'column',
		justifyContent: 'center',
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