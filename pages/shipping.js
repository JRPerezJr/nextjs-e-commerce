import React, { useContext, useEffect } from 'react';

import { StoreContext } from '../utils/Store';

import { useRouter } from 'next/router';

import { Controller, useForm } from 'react-hook-form';

import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/CheckoutWizard';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    const { fullName, address, city, homeState, zipCode, country } =
      shippingAddress;
    setValue('fullName', fullName);
    setValue('address', address);
    setValue('city', city);
    setValue('homeState', homeState);
    setValue('zipCode', zipCode);
    setValue('country', country);
  }, []);

  const classes = useStyles();

  const submitHandler = ({
    fullName,
    address,
    city,
    homeState,
    zipCode,
    country,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        homeState,
        zipCode,
        country,
      },
    });

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'pattern'
                        ? 'Full Name must be longer than 1 character'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'pattern'
                        ? 'Address must be longer than 1 character'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'pattern'
                        ? 'City must be longer than 1 character'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="homeState"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="homeState"
                  label="State"
                  error={Boolean(errors.homeState)}
                  helperText={
                    errors.homeState
                      ? errors.homeState.type === 'pattern'
                        ? 'State must be longer than 1 character'
                        : 'State is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  error={Boolean(errors.zipCode)}
                  helperText={
                    errors.zipCode
                      ? errors.zipCode.type === 'pattern'
                        ? 'Zip Code must be at least 5 characters'
                        : 'Zip Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'pattern'
                        ? 'Country must be longer than 2 character'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
