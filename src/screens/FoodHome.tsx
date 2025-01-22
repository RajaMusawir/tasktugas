import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; // Import Vector Icons (Ionicons)
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get('window');
const data = [
  {
    id: "1",
    name: "Domino's Pizza - R Y K",
    rating: 4.4,
    reviews: 500,
    image: "https://images.deliveryhero.io/image/fd-pk/LH/i2kn-listing.jpg",
    logo: "https://images.deliveryhero.io/image/fd-pk/pk-logos/cd9mo-logo.jpg",
    price: "$$$",
    type: "Pizza",
    time: "40-60 min",
    deliveryFee: "Rs.129",
    offer: "2 Small Pizzas - 825",
    menu: [
      { id: '1', name: 'Chicken Sekh Kebab', about:"Domino's Pizza is a globally recognized pizza delivery and carryout chain, originally founded in 1960 in Ypsilanti, Michigan, USA. Over the years, it has grown to become one of the largest pizza franchises worldwide",priceSmall:'Rs.420',priceMedium:'Rs.1200',priceLarge:'Rs.1560', details : ['Small', 'Medium', 'Large'], price: 'Rs. 420.00', description: "Pizza sauce base, mozzarella cheese, chicken seekh kebab, green chilies and onions topped with ranch sauce.", image: 'https://www.dominos.com.pk/images/b2006a70-9cda-11ef-9ba0-8f6ccd20db1e-SeekhKabab-HandTossedTop2_variant_0-2024-11-07073417.jpg'},
      { id: '2', name: 'Full Cheese',about:"Domino's Pizza is a globally recognized pizza delivery and carryout chain, originally founded in 1960 in Ypsilanti, Michigan, USA. Over the years, it has grown to become one of the largest pizza franchises worldwide",priceSmall:'Rs.420',priceMedium:'Rs.1200',priceLarge:'Rs.1560', details : ['Small', 'Medium', 'Large'], price: 'Rs. 420.00',description: "Cheddar sauce base, mozzarella cheese, crispy chicken chunks and pickled cucumbers topped with burger sauce", image: 'https://www.dominos.com.pk/images/b3bd35a0-9cda-11ef-a9ad-13554758a2ab-SuperCheese-HandTossedTop_variant_0-2024-11-07073420.jpg' },
      { id: '3', name: 'Veggie',about:"Domino's Pizza is a globally recognized pizza delivery and carryout chain, originally founded in 1960 in Ypsilanti, Michigan, USA. Over the years, it has grown to become one of the largest pizza franchises worldwide",priceSmall:'Rs.420',priceMedium:'Rs.1200',priceLarge:'Rs.1560', details : ['Small', 'Medium', 'Large'], price: 'Rs. 420.00',description: "Pizza sauce base, mozzarella cheese, onions, green peppers, mushrooms and black olives", image: 'https://www.dominos.com.pk/images/b2009180-9cda-11ef-bf94-4552bcb9a3dd-Veggie-HandTossedTopcopy_variant_0-2024-11-07073417.jpg' },
      { id: '4', name: 'Legend Dynamite',about:"Domino's Pizza is a globally recognized pizza delivery and carryout chain, originally founded in 1960 in Ypsilanti, Michigan, USA. Over the years, it has grown to become one of the largest pizza franchises worldwide",priceSmall:'Rs.420',priceMedium:'Rs.1200',priceLarge:'Rs.1560', details : ['Small', 'Medium', 'Large'], price: 'Rs. 420.00',description: "Cheddar cheese base, mozzarella cheese, grilled chicken, onions and oregano topped dynamite sauce.", image: 'https://www.dominos.com.pk/images/b3bd35a0-9cda-11ef-a9ad-13554758a2ab-LegendDynamite-HandTossedTopcopy_variant_0-2024-11-07073420.jpg' },
    ],
  },
  {
    id: "2",
    name: "KFC - Rahim Yar Khan",
    rating: 4.7,
    reviews: 5000,
    image: "https://images.deliveryhero.io/image/fd-pk/LH/n5xt-listing.jpg",
    logo: "https://images.deliveryhero.io/image/fd-pk/pk-logos/cz1js-logo.jpg",
    price: "$$$",
    type: "Fast Food",
    time: "30-45 min",
    deliveryFee: "Rs.99",
    offer: null,
    menu: [
      { id: '1', name: 'Lunch Large',about: "KFC, or Kentucky Fried Chicken, is a fast-food chain that serves fried chicken and is known for its signature blend of 11 herbs and spices", priceSmall:'Free',priceMedium:'Free',priceLarge:'Free', details : ['Coka Cola', 'Sprite', 'Fanta'], price: 'Rs. 1,400',description: "2 Zinger burgers, 2 chicken pieces, large fries and 2 regular soft drinks.", image: 'https://images.deliveryhero.io/image/fd-pk/Products/2066905.png' },
      { id: '2', name: 'Burger With Zinger',about: "KFC, or Kentucky Fried Chicken, is a fast-food chain that serves fried chicken and is known for its signature blend of 11 herbs and spices", priceSmall:'Free',priceMedium:'Free',priceLarge:'Free', details : ['Pepsi', 'Sprite', 'Fanta'],description: "Krunch burger with hot & crispy chicken piece & soft drink - 345 ml", price: 'Rs. 825', image: 'https://images.deliveryhero.io/image/fd-pk/Products/15405182.jpeg' },
      { id: '3', name: 'Bucket of Zinger',about: "KFC, or Kentucky Fried Chicken, is a fast-food chain that serves fried chicken and is known for its signature blend of 11 herbs and spices", priceSmall:'Free',priceMedium:'Free',priceLarge:'Free', details : ['Pepsi', 'Sprite', 'Fanta'],description: "10 Pieces Spicy and Fiery hot, get ready for a ride of flavor and spice with KFC Hot Wings",  price: 'Rs. 1,100', image: 'https://images.deliveryhero.io/image/fd-pk/Products/1166606.png' },
      { id: '4', name: 'Mighty Zinger',about: "KFC, or Kentucky Fried Chicken, is a fast-food chain that serves fried chicken and is known for its signature blend of 11 herbs and spices", price: 'Rs. 600', priceSmall:'Free',priceMedium:'Free',priceLarge:'Free', details : ['Pepsi', 'Sprite', 'Fanta'],description: "2 whole muscle zingers with cheese and fresh lettuce, all bundled in a Mighty bun.",image: 'https://images.deliveryhero.io/image/fd-pk/Products/1511596.png' },
    ],
  },
  {
    id: "3",
    name: "Ali Biryani & Restaurant",
    rating: 4.6,
    reviews: 3000,
    image: "https://i.ytimg.com/vi/oskLFFcvhGI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBzV5NKPyk8XXIhYd_3-XgsZTG6RA",
    price: "$$$",
    type: "Biryani",
    logo: 'https://thejodhaakbar.com/wp-content/uploads/2024/03/Chicken-Biryani.png',
    time: "15-25 min",
    deliveryFee: "Rs.99",
    offer: null,
    menu: [
        { id: '1', name: 'Chicken Biryani', priceSmall:'Rs. 400',priceMedium:'Rs. 800',priceLarge:'Rs. 1000', details : ['Small', 'Medium', 'Large'], price: 'Rs. 400.00',about: "Ali Biryani Restaurant offers flavorful, authentic biryanis, including chicken, mutton, handi, and vegetable varieties. Known for quality ingredients and rich taste, it’s a top choice for biryani lovers.", description: "", image: 'https://yeyfood.com/wp-content/uploads/2024/08/WEB1indian_chicken_biryani._served_on_a_white_plate._s_77c8f1ca-f01e-4a4d-9f2c-61bce785c1d7_3-735x735.jpg' },
        { id: '2', name: 'Mutton Biryani', priceSmall:'Rs. 400',priceMedium:'Rs. 800',priceLarge:'Rs. 1000', details : ['Small', 'Medium', 'Large'],  price: 'Rs. 599.00',about: "Ali Biryani Restaurant offers flavorful, authentic biryanis, including chicken, mutton, handi, and vegetable varieties. Known for quality ingredients and rich taste, it’s a top choice for biryani lovers.",description: "", image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe-500x500.jpg' },
        { id: '3', name: 'Handi Biryani', priceSmall:'Rs. 400',priceMedium:'Rs. 800',priceLarge:'Rs. 1000', details : ['Small', 'Medium', 'Large'],  price: 'Rs. 500.00',about: "Ali Biryani Restaurant offers flavorful, authentic biryanis, including chicken, mutton, handi, and vegetable varieties. Known for quality ingredients and rich taste, it’s a top choice for biryani lovers.",description: "", image: 'https://img.freepik.com/premium-photo/dum-handi-mutton-biryani-prepared-earthen-pot-haandi-with-aromatic-spices_1235831-44790.jpg' },
        { id: '4', name: 'Sabzi Biryani', priceSmall:'Rs. 400',priceMedium:'Rs. 800',priceLarge:'Rs. 1000', details : ['Small', 'Medium', 'Large'],  price: 'Rs. 350.00',about: "Ali Biryani Restaurant offers flavorful, authentic biryanis, including chicken, mutton, handi, and vegetable varieties. Known for quality ingredients and rich taste, it’s a top choice for biryani lovers.",description: "", image: 'https://www.foodfusion.com/wp-content/uploads/2021/12/Sabzi-ki-Biryani-with-Boield-eggs-REcipe-by-Food-fusion-1.jpg' },
      ],
  },
];

const FoodHome = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Menu', { restaurant });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleRestaurantPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.headerTextOnCard }]}>{item.name}</Text>
        <Text style={[styles.details, { color: theme.subTextOnCard }]}>
          {item.price} • {item.type}
        </Text>
        <Text style={[styles.details, { color: theme.highlightsOnCard }]}>
          {item.time} • {item.deliveryFee}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#ff9900" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={[styles.reviews, { color: theme.subTextOnCard }]}>({item.reviews}+)</Text>
        </View>
        {item.offer && <Text style={[styles.offer, { color: theme.headerTextOnCard }]}>{item.offer}</Text>}
      </View>
    </TouchableOpacity>
  );
  const { theme } = useSelector((state) => state.theme);
  console.log(theme);
  const userList = useSelector((state) => state.userList)
  {userList &&
    console.log(userList);
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.mainBackground }]}>
      <StatusBar backgroundColor={theme.statusBar} barStyle={theme.statusBarStyle} />
      <View style={[styles.safeHeader, { backgroundColor: theme.header }]}>
      <Image source={require('./../../assets/new_logo.png')} style={{ height: 65, width: 35, left:15, top:30, resizeMode:'center'}} />
        <View>

          <Text style={[styles.location, { color: theme.text }]}>Tasktugas</Text>
          </View>
        <View style={[styles.header, { backgroundColor: theme.header }]}>
          <View style={{flexDirection:'row'}}>
          <Text style={[styles.subLocation, { color: theme.searchBarText }]}>The foodie person's favourite</Text>
          <TouchableOpacity style={{marginLeft: width * 0.30,marginTop: height * -0.015}} onPress={() => navigation.navigate('Cart')}>
            <Icon size={25} name={'cart-outline'} color={theme.iconHeader}/>

            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderBottomWidth: StyleSheet.hairlineWidth,marginTop:9 ,backgroundColor:theme.text}}></View>
        <TextInput
          style={[styles.searchBar, { backgroundColor: theme.searchBar, color: theme.searchBarText }]}
          placeholder="Search for restaurant and groceries"
          placeholderTextColor={theme.searchBarPlace}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={{marginTop: height * 0.015}}></View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyMessage, {color: theme.text}]}>No results found</Text>
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  safeHeader: {
    marginTop: height * -0.03, // -5% of screen height
  },
  header: {
    marginLeft:59,
    flexDirection:"row", // 15% of screen width
    paddingBottom: height * 0.02, // 1% of screen height
  },
  location: {
    color: "#145343",
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: "bold",
    marginLeft:59,
    marginTop:-20
  },
  subLocation: {
    color: "#145343",
    fontSize: width * 0.035, // 3.5% of screen width
  },
  searchBar: {
    backgroundColor: "#fff",
    margin: width * 0.04, // 4% of screen width
    color: "black",
    padding: width * 0.03, // 3% of screen width
    borderRadius: 8,
    fontSize: width * 0.04, // 4% of screen width
    elevation: 3,
  },
  list: {
    paddingHorizontal: width * 0.04, // 4% of screen width
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: height * 0.02, // 2% of screen height
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: height * 0.25, // 25% of screen height
  },
  infoContainer: {
    padding: width * 0.04, // 4% of screen width
  },
  name: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: "bold",
    marginBottom: height * 0.01, // 1% of screen height
    color: "#000",
  },
  details: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: "#666",
    marginBottom: height * 0.01, // 1% of screen height
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.01, // 1% of screen height
  },
  rating: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: "#ff9900",
    marginLeft: width * 0.01, // 1% of screen width
  },
  reviews: {
    fontSize: width * 0.03, // 3% of screen width
    color: "#666",
    marginLeft: width * 0.01, // 1% of screen width
  },
  offer: {
    marginTop: height * 0.01, // 1% of screen height
    fontSize: width * 0.035, // 3.5% of screen width
    color: "#145343",
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: width * 0.045, // 4.5% of screen width
    marginTop: height * 0.2, // 20% of screen height
    marginLeft:0,
    fontWeight:"bold",
    color: "black",
  },
});

export default FoodHome;
