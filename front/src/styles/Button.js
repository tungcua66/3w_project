export const styleOne = {

	backgroundColor: 'transparent',
	border: '2px solid #679289',
	borderRadius: '15px',
	boxSizing: 'border-box',
	color: 'white',
	cursor: 'pointer',
	display: 'inline-block',
	fontFamily: '1.2em "Fira Sans, Arial, Roboto", sans-serif',
	fontSize: '16px',
	fontWeight: '600',
	lineHeight: 'normal',
	margin: '0',
	outline: 'none',
	padding: '4px 8px',
	textAlign: 'center',
	textDecoration: 'none',
	transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
	touchAction: 'manipulation',
	willChange: 'transform',

	'&:hover': {
		color: '#fff',
		backgroundColor: '#f4c095',
		boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
		transform: 'translateY(-2px)',
	},

	'&:active': {
		boxShadow: 'none',
		transform: 'translateY(0)',
	},
};
