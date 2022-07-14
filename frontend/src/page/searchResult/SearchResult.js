import React, { useEffect } from "react";
import {
  useLocation,
  useParams,
  Link as RouteLink,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Link,
  Box,
  Text,
  Flex,
  Heading,
  Image,
  Tag,
  Select,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
// import Pagenate from "../../components/pagenate/Pagenate";
import ReactPaginate from "react-paginate";

const SearchResult = ({ data, setData, available }) => {
  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, []);

  const navigate = useNavigate();

  const loadData = async () => {
    const result = await axios.get(`http://localhost:5000`, {
      params: {
        lat: searchParams.get("lat"),
        lng: searchParams.get("lng"),
        page: searchParams.get("page"),
      },
    });
    console.log(result);
    setData(result.data.results.shop);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  console.log(searchParams.get("page"));
  const location = useLocation();
  const pageAmount = Math.ceil(available / 10);

  const search = async (item) => {
    const result = await axios.get("http://localhost:5000", {
      params: {
        lat: searchParams.get("lat"),
        lng: searchParams.get("lng"),
        range: searchParams.get("range"),
        page: Number(searchParams.get("page")) + 1,
      },
    });
    console.log(result.data.results.shop);
    setData(result.data.results.shop);
    navigate(
      `/result?lat=${searchParams.get("lat")}&lng=${searchParams.get(
        "lng"
      )}&range=${searchParams.get("range")}&page=${
        Number(searchParams.get("page")) + 1
      }`
    );
  };

  if (available == 0) {
    return (
      <>
        <Button onClick={() => navigate("/")}>検索ページ</Button>
        <Box>見つかりませんでした。</Box>
      </>
    );
  }

  return (
    <Box>
      <Button onClick={() => navigate("/")}>検索ページ</Button>
      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl">{available}件見つかりました</Text>
        {data.map((item) => (
          <Box
            m="3"
            borderWidth="1px"
            borderRadius="lg"
            w="800px"
            h="250px"
            overflow="hidden"
            key={item.id}
          >
            <Flex gap="5">
              <Image boxSize="300px" src={item.photo.pc.l} alt="" />
              <Box p="3">
                <RouteLink to={"/detail?shopId=" + item.id}>
                  <Link>
                    <Heading size="md">{item.name}</Heading>
                  </Link>
                </RouteLink>
                <Text py="2">{item.catch}</Text>
                <Text py="2">アクセス:{item.access}</Text>
                <Tag colorScheme="teal" py="2">
                  {item.genre.name}
                </Tag>
                <Text py="2">
                  料金:{item.budget.average ? item.budget.average : "-"}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
        {/* <Pagenate
          setData={setData}
          page={searchParams.get("page")}
          pageAmount={pageAmount}
        /> */}
        <ReactPaginate
          pageCount={pageAmount}
          marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          onClick={() => search()} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
          containerClassName="pagination" //ページネーションリンクの親要素のクラス名
          pageClassName="page-item" //各子要素(li要素)のクラス名
          pageLinkClassName="page-link" //ページネーションのリンクのクラス名
          activeClassName="active" //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
          previousLabel="<" //前のページ番号に戻すリンクのテキスト
          nextLabel=">" //次のページに進むボタンのテキスト
          previousClassName="page-item" // '<'の親要素(li)のクラス名
          nextClassName="page-item" //'>'の親要素(li)のクラス名
          previousLinkClassName="page-link" //'<'のリンクのクラス名
          nextLinkClassName="page-link" //'>'のリンクのクラス名
          disabledClassName="disabled" //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel="..." // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName="page-item" // 上記の「…」のクラス名
          breakLinkClassName="page-link" // 「…」の中のリンクにつけるクラス
        />
      </Flex>
    </Box>
  );
};

export default SearchResult;
