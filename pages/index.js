import { useContext } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';

import { StoreContext } from '../utils/Store';

import db from '../utils/db';
import Product from '../models/Product';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { products } = props;

  const addToCartHandler = (product) => {
    fetch(`/api/products/${product._id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const itemExists = state.cart.cartItems.find(
          (x) => x._id === product._id
        );
        const quantity = itemExists ? itemExists.quantity + 1 : 1;
        if (data.countInStock < quantity) {
          return window.alert('Sorry. The product is currently out of stock');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        return router.push('/cart');
      });
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
