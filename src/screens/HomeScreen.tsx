import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Center } from 'native-base';
import { SearchBox } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchShoppingData, fetchUserData } from '../redux/slices';
import { Category, Product } from '../models';
import Routes from '../navigations/routes';
import { useNavigation } from '@react-navigation/native';
import { CategoryList, ProductList } from '../containers';
import { loadCartData } from '../redux/slices/userSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const { categories, products } = useAppSelector((state) => state.shoppingState?.shoppingData);
  const user = useAppSelector((state) => state.userState.userData);
  console.log(user);

  useEffect(() => {
    if (products && categories) {
      setFilterProducts(products);
      setCategory(categories[0]);
    }
  }, [categories, products]);

  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  const navigation = useNavigation();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [category, setCategory] = useState<Category>({} as Category);
  useEffect(() => {
    let filterList;
    if (category?.title === 'All') filterList = products;
    else filterList = products?.filter((item) => item?.category === category?.title);
    setFilterProducts(
      filterList?.filter(
        (item) =>
          item?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item?.category.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, category]);

  // useEffect(() => {
  //   if (category?.title === 'All') setFilterProducts(products);
  //   else setFilterProducts(products?.filter((item) => item?.category === category?.title));
  // }, [category]);

  // Loading Data
  useEffect(() => {
    (async () => {
      await dispatch(fetchShoppingData());
      // if (fetchShoppingData.fulfilled.match(responseFetching)) {
      //   const categories = responseFetching.payload?.categories;
      //   const products = responseFetching.payload?.products;

      //   if (categories.length) setCategory(categories[0]);
      //   setFilterProducts(products);
      // }

      // await AsyncStorage.clear();
      await dispatch(fetchUserData({ username: user.phone, password: user.password }));
      await dispatch(loadCartData());
    })();
  }, []);

  return (
    <Box flex={1} paddingX="5%" bgColor="background">
      <SearchBox style={{ marginTop: 15, width: '100%', height: 55 }} onTouch={() => {}} onChange={setSearchKeyword} />
      <Box marginTop="25px" flex={1}>
        {!products && !categories ? (
          <Center flex={1}>
            <Spinner accessibilityLabel="Loading" color="#cf4614" size={50} />
          </Center>
        ) : (
          <Box flex={1}>
            <Box>
              <Heading fontSize={20} color="heading">
                Category
              </Heading>

              <CategoryList
                itemList={categories}
                onTouchItem={(item: Category) => setCategory(item)}
                itemSelected={category}
                style={{ marginTop: 10 }}
              />
            </Box>

            <ProductList
              itemList={filterProducts}
              onTouchItem={(item: Product) => navigation.navigate(Routes.PRODUCT, { productId: item.id })}
              style={{ marginTop: 10 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomeScreen;
