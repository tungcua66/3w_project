import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { productsSliceActions } from '../features/productsReducer';
import { categoriesSliceActions } from '../features/categoriesReducer';

const ModalBackground = styled.div(() => ({
	backgroundColor: '#d1d6de',
	position: 'fixed',
	top: '0',
	left: '0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	opacity: '0.98',
	width: '100vw',
	height: '100vh',
}));

const ModalContainer = styled.div(() => ({
	width: '500px',
	height: '500px',
	borderRadius: '12px',
	backgroundColor: 'white',
	boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
	display: 'flex',
	flexDirection: 'column',
	padding: '25px',
	top: '50%',
	right: '50%',
}));

const DivClose = styled.div(() => ({
	textAlign: 'left',
}));

const Title = styled.div(() => ({
	right: '0px',
	float: 'right',
	color: '#2c5777',
}));

const BodyDiv = styled.div(() => ({
	flex: '50%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '1.7rem',
	textAlign: 'center',
}));

const Modal = ({ children, setProductModalOpen, setCategoryModalOpen }) => (
	<div>
		<ModalBackground>
			<ModalContainer>
				<DivClose>
					<button
						type="button"
						onClick={() => {
							setProductModalOpen(false);
							setCategoryModalOpen(false);
						}}
					>
						X
					</button>
				</DivClose>
				<Title>
					<h1>Form</h1>
				</Title>
				<BodyDiv>
					{children}
				</BodyDiv>
			</ModalContainer>
		</ModalBackground>
	</div>
);

const mapDispatchToProps = {
	setProductModalOpen: productsSliceActions.setProductModalOpen,
	setCategoryModalOpen: categoriesSliceActions.setCategoryModalOpen,
};

export default connect(null, mapDispatchToProps)(Modal);
