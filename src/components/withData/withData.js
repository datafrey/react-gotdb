import React, { Component } from 'react';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const withData = (View, getData) => {
	return class extends Component {

		state = {
			data: null,
			loading: true,
			error: false
		}
	
		onError = (error) => {
      console.log(error);
			this.setState({
				error: true,
				loading: false
			});
		}
	
		componentDidMount() {
			getData()
				.then((data) => {
					this.setState({
						data,
						loading: false,
						error: false
					});
				})
				.catch(this.onError);
		}

		render() {
			const { data, loading, error } = this.state;

			const errorMessage = error ? <ErrorMessage /> : null;
			const spinner = loading ? <Spinner /> : null;
			const content = !(loading || error) 
				? <View { ...this.props } data={ data } />
				: null; 
			
			return (
				<>
					{ errorMessage }
					{ spinner }
					{ content }
				</>
			);
		}
	};
};

export default withData;
