import {
  Heading,
  Image,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Grid,
  Container,
  GridItem,
  Button,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const ShopDetail = ({ data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [shop, setShop] = useState(
    data.find((item) => item.id == params.shopId)
  );

  console.log(params);
  //   console.log(data);

  useEffect(() => {
    if (shop) {
    } else {
      getShop();
    }
  }, []);

  const getShop = async () => {
    const result = await axios.get("http://localhost:5000/shop", {
      params: {
        id: searchParams.get("shopId"),
      },
    });
    setShop(result.data.results.shop[0]);
  };

  // console.log(data.find((item) => item.id == params.shopId));

  if (!shop) {
    return <Spinner />;
  }

  return (
    <Box w="100%">
      <Button onClick={() => navigate(-1)}>back</Button>
      <Button onClick={() => navigate("/")}>serach page</Button>
      <Container maxW="800px">
        <Grid templateColumns="repeat(5,1fr)" gap={3}>
          <GridItem colSpan={5}>
            <Heading>{shop.name}</Heading>
          </GridItem>
          <GridItem colSpan={5}>
            <Text fontSize="xl">{shop.catch}</Text>
          </GridItem>
          <GridItem colSpan={2} mx="auto">
            {/* {shop.name_kana} */}
            <Image src={shop.photo.pc.l} />
          </GridItem>
          <GridItem colSpan={3}>
            <Text my="3">アクセス:{shop.access}</Text>
            <Text my="3">住所：{shop.address}</Text>
            <Text my="3">ジャンル：{shop.genre.name}</Text>
          </GridItem>
          <GridItem colSpan={5}>
            <Heading size="md">info</Heading>
            <Table>
              <Tbody>
                <Tr>
                  <Td>最寄り駅</Td>
                  <Td>{shop.station_name}</Td>
                </Tr>
                <Tr>
                  <Td>ディナー予算</Td>
                  <Td>{shop.budget.average}</Td>
                </Tr>
                <Tr>
                  <Td>料金備考</Td>
                  <Td>{shop.budget.budget_memo}</Td>
                </Tr>
                <Tr>
                  <Td>総席数</Td>
                  <Td>{shop.capacity}</Td>
                </Tr>
                <Tr>
                  <Td>店舗URL</Td>
                  <Td>
                    <Link href={shop.urls.pc} isExternal>
                      {shop.urls.pc}
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Td>営業時間</Td>
                  <Td>{shop.open}</Td>
                </Tr>
                <Tr>
                  <Td>定休日</Td>
                  <Td>{shop.close}</Td>
                </Tr>
                <Tr>
                  <Td>最大宴会収容人数</Td>
                  <Td>{shop.party_capacity}</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* {shop.mobile_access} */}
            {/* {shop.urls} */}
            {/* {shop.mobile.m} */}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopDetail;
