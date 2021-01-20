import React, { useEffect, useContext } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Row,
	CardSubtitle,
	Col,
} from 'reactstrap';
import { ShopContext } from '../../context/shopContext';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

const Example = (props) => {
	const { fetchAllProducts, products } = useContext(ShopContext);

	useEffect(() => {
		fetchAllProducts();
		return () => {
			// cleanup
		};
	}, [fetchAllProducts]);

	if (!products) return <Loader />;
	return (
		<div>
			<Row className='justify-content-md-center'>
				{products.map((product) => (
					<Col xs='12' sm='6' lg='3' key={product.id}>
						<Link
							to={`/app/product/${product.id}`}
							style={{ textDecoration: 'none' }}
						>
							<Card>
								<CardImg
									top
									width='100%'
									src={`${product.images[0].src}`}
									alt='Card image cap'
								/>
								<CardBody>
									<CardTitle tag='h5'>{product.title}</CardTitle>
									<CardSubtitle tag='h6' className='mb-2 text-muted'>
										$ {product.variants[0].price}
									</CardSubtitle>
									<CardText style={{ maxHeight: '6rem', overflow: 'hidden' }}>
										{product.description}
									</CardText>
								</CardBody>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Example;
