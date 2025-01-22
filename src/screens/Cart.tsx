import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery ,gql } from '@apollo/client';

const { width, height } = Dimensions.get('window');

const Cart = ({ route, navigation }) => {
  const [count, setCount] = useState(1);
  const [priceGg, setPriceGg] = useState();
  const cart = useSelector((state) => state.cart.cart);

  const CHARACTER_GRAPH = gql`
  query {
  hello
}
`
  const {data, loading} = useQuery(CHARACTER_GRAPH)
  console.log("DATAAAAAAAA", data);
  useEffect(() => {
    if (cart.length > 0) {
      const numericPrice = parseFloat(cart[0]?.price?.replace("Rs.", "").replace(",", "").trim());
      if (!isNaN(numericPrice)) {
        setPriceGg(numericPrice + 9.99);
      }
    }
  }, [cart]);



  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./../../assets/close-button.png')} style={styles.closeStyle} />
            </TouchableOpacity>
            <Text style={styles.text}>Cart</Text>
          </View>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>No items in cart</Text>
            </View>
          ) : (
            <View>
              <View style={styles.section}>
                <View style={styles.row}>
                  <Image source={{ uri: cart[0]?.product_image }} style={styles.productImage} />
                  <Text style={styles.productName}>{cart[0]?.product_name}</Text>
                  <Text style={styles.productPrice}>{cart[0]?.price}.00</Text>
                </View>
                <View style={styles.adder}>
                  <TouchableOpacity onPress={() => setCount(count > 0 ? count - 1 : 0)} style={styles.iconContainer}>
                    <Ionicons name="trash-outline" size={20} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.count}>{count}</Text>
                  <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.iconContainer}>
                    <Ionicons name="add-outline" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.row}>
                  <Text style={styles.subtotal}>Subtotal</Text>
                  <Text style={styles.subtotalPrice}>{cart[0]?.price}.00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Standard Delivery</Text>
                  <Text style={styles.deliveryPrice}>Free</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Platform Fee</Text>
                  <View style={styles.icon}>
                    <Ionicons name="information-circle-outline" size={20} color="black" />
                  </View>
                  <Text style={styles.platformFee}>Rs. 9.99</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.inclFees}>(incl. fees and tax)</Text>
                <Text style={styles.totalPrice}>Rs. {priceGg}</Text>
              </View>
              <TouchableOpacity style={styles.orderNow} onPress={() => navigation.navigate('Youtube')}>
                <Text style={styles.orderNowText}>Order Now!</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  closeStyle: {
    width: width * 0.05,
    height: height * 0.03,
    marginLeft: width * 0.04,
    marginTop: height * 0.007,
  },
  text: {
    fontSize: width * 0.045,
    color: 'black',
    marginTop: height * 0.01,
    fontWeight: 'bold',
    marginLeft: width * 0.04,
  },
  emptyCart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.4,
  },
  emptyCartText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'grey',
  },
  adder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    width: width * 0.26,
    marginTop: height * -0.05,
    marginLeft: width * 0.25,
  },
  iconContainer: {
    padding: width * 0.02,
  },
  count: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
    marginTop: height * 0.007,
    textAlign: 'center',
  },
  section: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: height * 0.02,
    borderColor: '#D3D3D3',
  },
  row: {
    flexDirection: 'row',
  },
  productImage: {
    width: width * 0.17,
    height: height * 0.08,
    borderRadius: width * 0.13,
    marginTop: height * 0.03,
    marginLeft: width * 0.03,
  },
  productName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    marginLeft: width * 0.03,
    marginTop: height * 0.03,
  },
  productPrice: {
    color: '#E91E63',
    fontWeight: 'bold',
    marginTop: height * 0.08,
    marginLeft: width * 0.2,
  },
  subtotal: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
  },
  subtotalPrice: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: width * 0.5,
    fontSize: width * 0.045,
    marginTop: height * 0.02,
  },
  label: {
    color: 'black',
    marginTop: height * 0.015,
    marginLeft: width * 0.04,
  },
  deliveryPrice: {
    color: '#E91E63',
    marginLeft: width * 0.55,
    marginTop: height * 0.01,
  },
  platformFee: {
    color: 'black',
    marginLeft: width * 0.5,
    marginTop: height * 0.01,
  },
  icon: {
    marginTop: height * 0.014,
    marginLeft: width * 0.01,
  },
  total: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
  },
  inclFees: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: width * 0.03,
    marginTop: height * 0.03,
    marginLeft: width * 0.01,
  },
  totalPrice: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: width * 0.35,
    fontSize: width * 0.045,
    marginTop: height * 0.025,
  },
  orderNow: {
    backgroundColor: '#E91E63',
    marginTop: height * 0.54,
    width: width * 0.85,
    height: height * 0.06,
    marginLeft: width * 0.08,
    borderRadius: width * 0.06,
    justifyContent: 'center',
  },
  orderNowText: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginLeft: width * 0.33,
    color: 'white',
  },
});

export default Cart;
