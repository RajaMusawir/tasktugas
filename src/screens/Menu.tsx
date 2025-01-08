import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, StatusBar, Dimensions } from "react-native";

const MenuView = ({ route, navigation }) => {

  const { restaurant } = route.params;
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(restaurant.menu);

    const handleAddItem = (item) => {
      navigation.navigate("AddItem", { item });
    };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>{item.price}</Text>
        <Text style={styles.menuDiscount}>{item.discount}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddItem', { item })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurant.menu.filter((item) =>
      item.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./../../assets/back.png')} style={{ width: width * 0.08, height: height * 0.04, marginTop: height * 0.03,  }} />
          </TouchableOpacity>
          <Image source={{ uri: restaurant.logo }} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.rating}>
            ⭐ {restaurant.rating} - ({restaurant.reviews}+ ratings)
          </Text>
           <View style={styles.searchContainer}>
                                  <View style={styles.search_icon_inTxT}>
                                      <Image
                                          style={styles.search_icon}
                                          source={require('./../../assets/search.png')}
                                      />
                                      <TextInput
                                          style={styles.searchBox}
                                          placeholder="Search items..."
                                          placeholderTextColor={'grey'}
                                          value={searchQuery}
                                          onChangeText={handleSearch}
                                      />
                                  </View>
                              </View>
          {/* <Text style={styles.deliveryInfo}>
            Delivery {restaurant.deliveryTime} • Rs. {restaurant.deliveryFee} delivery • Min. order Rs. {restaurant.minOrder}
          </Text> */}
        </View>
      </View>
      {/* <TextInput style={styles.searchBar} placeholder="Search in menu" /> */}
      <View style={{flexDirection:'row'}}>
        <Image source={require('./../../assets/fire_logo.png')} style={{width: width * 0.1, height: height * 0.05,}}/>
      <Text style={styles.sectionHeader}>Popular</Text>
      </View>
      <Text style={styles.sectionSubtitle}>Most ordered right now.</Text>
      <FlatList
        data={filteredData}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={
        <Text style={styles.emptyMessage}>No results found</Text>
         }
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.04, 
  },
  header: {
    marginBottom: height * 0.02, // 2
    marginTop: height * 0.005, // 0.5
  },
  logo: {
    width: width * 0.2, // 20
    height: height * 0.1, // 10
    borderRadius: 20,
    marginLeft: width * 0.28, // 25
    marginTop: height * 0.03, // 3
  },
  headerInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: width * 0.055, // 5.5
    marginLeft: width * 0.24, // 20
    marginTop: height * 0.015, // 1.5
    fontWeight: "bold",
    color: "black",
  },
  rating: {
    fontSize: width * 0.04, // 4
    marginLeft: width * 0.27, // 23
    color: "black",
    fontWeight: "bold",
  },
  deliveryInfo: {
    fontSize: width * 0.03, // 3
    color: "#666",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: width * 0.02, // 2
    borderRadius: 8,
    marginBottom: height * 0.02, // 2
    elevation: 2,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: height * 0.02, // 2
  },
  tab: {
    marginRight: width * 0.04, // 4
  },
  tabText: {
    fontSize: width * 0.035, // 3.5
    fontWeight: "bold",
    color: "#145343",
  },
  sectionHeader: {
    fontSize: width * 0.06, // 6
    fontWeight: "bold",
    color: "black",
    marginTop: height * 0.002, // 0.2
  },
  sectionSubtitle: {
    fontSize: width * 0.035, // 3.5
    color: "#666",
    marginTop: height * -0.012, // -1.2
    marginLeft: width * 0.1, // 10
    marginBottom: height * 0.02, // 2
  },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: height * 0.015, // 1.5
  },
  menuImage: {
    width: width * 0.4, // 40
    height: height * 0.16, // 16
    marginRight: width * 0.04, // 4
    marginLeft: width * 0.03, // 1.5
    borderRadius: 8,
  },
  menuDetails: {
    flex: 1, 
  },
  menuName: {
    fontSize: width * 0.04, // 4
    fontWeight: "bold",
    marginLeft: width * 0.04, // 2
    marginTop: height * 0.002, // 0.2
    color: "#000",
  },
  menuPrice: {
    fontSize: width * 0.03, // 3
    color: "#666",
    marginLeft: width * 0.04, // 2
  },
  menuDiscount: {
    fontSize: width * 0.03, // 3
    color: "#ff0000",
  },
  addButton: {
    backgroundColor: "white",
    width: width * 0.06, // 6
    height: width * 0.06, // 6
    marginLeft: width * 0.35, // 35
    marginTop: height * -0.05, // -5
    marginBottom: height * 0.02, // 2
    borderRadius: width * 0.04, // 4
    elevation: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "black",
    fontSize: width * 0.04, // 4
    fontWeight: "bold",
  },
  searchContainer: {
    paddingTop: height * 0.01, // 1
    paddingHorizontal: width * 0.025, // 2.5
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: height * 0.02, // 2
    borderColor: '#D3D3D3',
  },
  search_icon_inTxT: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: width * 0.025, // 2.5
    backgroundColor: '#fff',
    position: 'relative',
  },
  search_icon: {
    width: width * 0.05, // 5
    height: height * 0.025, // 2.5
    position: 'absolute',
    left: width * 0.07, // 7
    top: height * 0.025, // 2.5
    zIndex: 1,
    elevation: 4,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#f5f5f4',
    borderRadius: 100,
    color: 'black',
    width: '100%',
    height: height * 0.05, // 5
    paddingLeft: width * 0.12, // 12
    marginTop: height * 0.012, // 1.2
    padding: width * 0.025, // 2.5
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: width * 0.045, // 4.5
    marginTop: height * 0.2, // 20
    marginLeft: 0,
    fontWeight: "bold",
    color: "black",
  },
});

export default MenuView;
