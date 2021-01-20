import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../../context/shopContext.js';
import Loader from '../../components/Loader/Loader';

import { Button, Row, Col } from 'reactstrap';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		display: 'flex',
// 		padding: '3rem 0',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	right: {
// 		flex: '1',
// 	},
// 	left: {
// 		flex: '1',
// 		display: 'flex',
// 		flexDirection: 'column',
// 	},
// 	image: {
// 		backgroundRepeat: 'no-repeat',
// 		height: '400px',
// 		maxWidth: '400px',
// 		padding: '1rem',
// 		backgroundColor:
// 			theme.palette.type === 'light'
// 				? theme.palette.grey[50]
// 				: theme.palette.grey[900],
// 		backgroundSize: 'cover',
// 		backgroundPosition: 'center',
// 	},
// 	para: {
// 		maxWidth: '450px',
// 	},
// 	paper: {
// 		margin: theme.spacing(8, 4),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		marginBottom: '0px',
// 		backgroundColor: theme.palette.secondary.main,
// 		display: 'inline-block',
// 	},
// }));

const ProductPage = () => {
	let { id } = useParams();
	const { fetchProductWithId, addItemToCheckout, product } = useContext(
		ShopContext
	);
	// const [product, setProduct] = useState(null)
	// async function fetchData() {
	//     const fetchedProduct = await fetchProductWithId(id)
	//     setProduct(fetchedProduct)
	// }

	useEffect(() => {
		fetchProductWithId(id);

		// fetchData()
		return () => {
			// setProduct(null)
		};
	}, [fetchProductWithId, id]);

	if (!product.title) return <Loader />;
	return (
		<>
			<Row
				style={{
					diplay: 'flex',
					padding: '3rem 0',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Col
					sm='12'
					md='4'
					style={{ flex: '1', diplay: 'flex', justifyContent: 'center' }}
				>
					<img
						src={product.images[0].src}
						style={{
							backgroundRepeat: 'no-repeat',
							height: '400px',
							maxWidth: '400px',
							padding: '1rem',
						}}
					/>
				</Col>
				<Col item sm={12} md={4} style={{ flex: '1' }}>
					<h3>{product.title}</h3>
					<h5>
						<span style={{ color: 'rgb(171 52 125)', fontWeight: '600' }}>
							$ {product.variants[0].price}
						</span>
					</h5>
					<p>{product.description}</p>
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<Button
							color='primary'
							padding='1rem'
							onClick={() => addItemToCheckout(product.variants[0].id, 1)}
						>
							Add To Cart
						</Button>
						<Link to='/app/cart'>
							<Button color='success' padding='1rem'>
								Go to Cart
							</Button>
						</Link>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default ProductPage;
