import React from 'react';
import { Center, Text, IconButton, Box, ScrollView, Icon, Image, HStack, Button, Heading } from 'native-base';
import { useAppSelector } from '../hooks';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProductScreenRouteProp } from '../navigations/MainNavigator/types';
import { Ionicons } from '@expo/vector-icons';
import Routes from '../navigations/routes';
import { QuantityInput } from '../components';

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const products = useAppSelector((state) => state.shopping.availability.products);
  const product = products.find((item) => item.id === route.params.productId);

  const navigation = useNavigation();

  return (
    <Box flex={1} bgColor="background">
      <HStack marginBottom={0.5} marginTop={1.5} justifyContent="space-between" alignItems="center" marginX={3.5}>
        <IconButton
          borderRadius={999}
          w="45px"
          h="45px"
          icon={<Icon as={Ionicons} name="chevron-back" color="black" size={8} />}
          bgColor="transparent"
          _pressed={{ backgroundColor: '#00000025' }}
          onPress={() => navigation.goBack()}
        />

        <IconButton
          borderRadius={999}
          w="45px"
          h="45px"
          icon={<Icon as={Ionicons} name="md-cart" color="black" size={7} />}
          bgColor="transparent"
          _pressed={{ backgroundColor: '#00000025' }}
          onPress={() => navigation.navigate(Routes.CART)}
        />
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        <Box marginX={5}>
          <Box>
            <Text color="brand.800" fontSize={18}>
              {product?.category}
            </Text>
            <Heading color="heading" bold fontSize={22} marginTop={3}>
              {product?.name}
            </Heading>
            <HStack space={3.5} marginTop={1.5}>
              {product?.motivations?.map((item) => (
                <Text color="gray.500" fontSize={16} key={item}>
                  {item}
                </Text>
              ))}
            </HStack>
          </Box>

          <Box marginY={5} borderRadius={15} shadow={2}>
            <Image source={{ uri: product?.image }} w="100%" h="350px" alt=" " borderRadius={15} />
            <IconButton
              position="absolute"
              borderRadius={999}
              w="40px"
              h="40px"
              icon={<Icon as={Ionicons} name="heart" color="white" size={6} />}
              top={5}
              right={5}
              bgColor="#00000025"
            />
          </Box>

          <HStack justifyContent="space-between" marginTop={0.5} marginX={2.5} alignItems="center">
            <QuantityInput onChange={() => {}} start={1} min={0} max={10} />

            <Center bgColor="brand.800" paddingY={2} borderRadius={999} w="45%">
              <Text color="white" fontSize={20} bold isTruncated>
                ${product?.price}
              </Text>
            </Center>
          </HStack>

          <Box marginTop={2.5} marginBottom={5}>
            <Heading fontSize={20} color="heading" bold>
              Description
            </Heading>
            <Text color="#6E6D7A" marginTop={1.5} fontSize={17} textAlign="justify">
              {product?.description}
            </Text>
          </Box>
        </Box>
      </ScrollView>

      <HStack marginTop={1.5} background="red.500" paddingY={0.5} paddingX={5} alignItems="center">
        <Box flex={3} alignItems="center">
          <IconButton
            borderRadius={10}
            w="55px"
            h="42px"
            icon={<Icon as={Ionicons} name="heart-outline" color="rose.800" size={7} />}
            bgColor="transparent"
            border={1.5}
            borderColor="rose.800"
          />
        </Box>

        <Box flex={9}>
          <Button
            h="45px"
            w="90%"
            borderRadius={10}
            bgColor="#363B64"
            _text={{ fontWeight: 'bold', fontSize: 18 }}
            alignSelf="center"
            endIcon={<Icon as={Ionicons} name="md-cart" size={7} marginLeft={1.5} />}
          >
            Add To Cart
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default ProductScreen;
