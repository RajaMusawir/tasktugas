import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import { Text, RadioButton, Card } from "react-native-paper";
import { useDispatch } from 'react-redux';
import { addItemToCart } from './../../components/redux/action';

const { width, height } = Dimensions.get('window');

const AddItem = ({ route, navigation }) => {
  const [softDrink1, setSoftDrink1] = React.useState("");
  const dispatch = useDispatch();

  const { item } = route.params;
  const AddItemToCart = async () => {
    
    try {
            const selectedPrice = sizePrices[softDrink1];
            const priceToSave = selectedPrice === 'Free' ? item.price : selectedPrice;
    
            const cartItem = {
                price: priceToSave,
                size: softDrink1,
                product_name: item.name,
                product_image: item.image,
            };
            dispatch(addItemToCart(cartItem));
    
            console.log("Navigating to Cart...");
            navigation.navigate("Cart");
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
      }
  const sizePrices = {
    small: item.priceSmall,
    medium: item.priceMedium,
    large: item.priceLarge,
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar hidden={true} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('./../../assets/close-button.png')}
            style={styles.closeStyle}
          />
        </TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.detailsContainer}>
  <Text style={styles.title}>{item.name}!</Text>
  <Text style={styles.price}>{item.price}</Text>
  <Text style={styles.description}>{item.description}</Text>
</View>

        <Card style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.optionTitle}>Select your size</Text>
            <View
              style={{
                backgroundColor: "#E91E63", 
                width: width * 0.18, 
                height: height * 0.03, 
                borderRadius: 123, 
                marginLeft: width * 0.27, 
                justifyContent: "center", 
                paddingLeft: width * 0.03
              }}
            >
              <Text style={styles.required}>Required</Text>
            </View>
          </View>
          <Text style={{color: "#555", marginBottom: height * 0.03, fontSize: width * 0.033, }}>
            Please select one
          </Text>
          <RadioButton.Group
            onValueChange={(value) => setSoftDrink1(value)}
            value={softDrink1}
          >
            <RadioButton.Item
              label={`${item.details[0]} - ${sizePrices.small}`}
              value="small"
              labelStyle={styles.radioLabel}
              style={styles.radioItem}
              color="#E91E63"
              uncheckedColor="#888"
            />
            <RadioButton.Item
              label={`${item.details[1]} - ${sizePrices.medium}`}
              value="medium"
              labelStyle={styles.radioLabel}
              style={styles.radioItem}
              color="#E91E63"
              uncheckedColor="#888"
            />
            <RadioButton.Item
              label={`${item.details[2]} - ${sizePrices.large}`}
              value="large"
              labelStyle={styles.radioLabel}
              style={styles.radioItem}
              color="#E91E63"
              uncheckedColor="#888"
            />
          </RadioButton.Group>
        </Card>
        <Card style={styles.card2}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: width * 0.045, }}>
            About Restaurant :
          </Text>
          <Text style={styles.description}>{item.about}</Text>
        </Card>
        {softDrink1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#E91E63",
               width: width * 0.90, 
               height: height * 0.06, 
               marginLeft: width * 0.05, 
               borderRadius: width * 0.06, 
               justifyContent: "center",
            }}
            onPress={AddItemToCart}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 123 }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={{
              backgroundColor: "grey", 
              width: width * 0.90, 
              height: height * 0.06, 
              marginLeft: width * 0.05, 
              borderRadius: width * 0.06, 
              justifyContent: "center",
            }}
            onPress={() => console.log("Added To Cart")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 123 }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: height * 0.2,
  },
  detailsContainer: {
    padding: width * 0.04,
  },
  title: {
    fontSize: width * 0.06,
    color: 'black',
    marginLeft: width * -0.01,
    fontWeight: "bold",
  },
  price: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#E91E63",
    marginVertical: height * 0.01, 
  },
  description: {
    fontSize: width * 0.035, 
    marginTop: height * 0.004,
    color: "#555",
  },
  realValue: {
    fontSize: width * 0.04,
    color: "#555",
    marginTop: height * 0.01,
    fontWeight: "bold",
  },  
  card: {
    margin: width * 0.03, 
    padding: width * 0.04,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    elevation: 8,
    borderRadius: 20,
  },
  card2: {
    margin: width * 0.04,
    marginTop: height * -0.002,
    padding: width * 0.04,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    elevation: 8,
    borderRadius: 20,
  },
  optionTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: 'black',
    marginBottom: height * 0.005,
  },
  required: {
    fontSize: width * 0.035, 
    color: "white",
    borderRadius: 123,
    fontWeight: 'bold',
  },
  footer: {
    padding: width * 0.04, 
  },
  itemImage: {
    width: '100%',
    height: height * 0.3, 
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05, 
    zIndex: 10,
    backgroundColor: '#f5f5f4',
    borderRadius: 20,
    padding: width * 0.02, 
    elevation: 3,
  },
  closeStyle: {
    width: width * 0.04, 
    height: height * 0.02,
  },
  radioGroup: {
    flexDirection: "column",
    paddingVertical: height * 0.02,
  },
  radioItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: width * 0.02, 
    marginBottom: height * 0.01,
  },
  radioLabel: {
    fontSize: width * 0.04, 
    color: "#000", 
    fontWeight: "bold",
  },
});

export default AddItem;