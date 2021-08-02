import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'

const Cart = ({ 
    cart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart
    }) => {
    const classes = useStyles();



    const EmptyCart = () => (
        <Typography variant="subtitle">
            <Link to="/" className={classes.link}>You Have No Item In Cart</Link>!
        </Typography>
    );


    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4" color="initial">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="Secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkout} size="large" type="button" variant="contained" color="Primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" color="initial" gutterBottom className={classes.title}>
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
