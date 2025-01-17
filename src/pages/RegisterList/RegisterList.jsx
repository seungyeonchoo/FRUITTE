import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ProductTable from './components/ProductTable';
import OptionTable from './components/OptionTable';
import Pagination from '../../components/Pagination';
import Filter from './components/Filter';
import { chunk } from '../../utils/sliceArr';
import { lightTheme } from '../../styles/theme';

const RegisterList = () => {
  const [productData, setProductData] = useState([]);

  const [pageNum, setPageNum] = useState(0);
  let pageSliceArr = chunk(productData, 8);

  let manufacturedData = [];

  pageSliceArr[pageNum]?.forEach(obj => {
    const updatedArr = [];

    updatedArr.push({ ...obj, type: 'product' });

    obj.options.forEach((option, idx) => {
      if (idx === 0) {
        return;
      }
      updatedArr.push({ ...option, type: 'option' });
    });
    manufacturedData = [...manufacturedData, ...updatedArr];
  });

  const getRequest = async () => {
    const response = await axios('/data.json');
    setProductData(response.data.products_list);
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <Container>
      <Filter productData={productData} setProductData={setProductData} getRequest={getRequest} />

      <Table>
        <tbody>
          <HeadTr>
            {TITLES.map((data, idx) => (
              <TableTitle key={idx} width={data.width}>
                {data.title}
              </TableTitle>
            ))}
          </HeadTr>
          {manufacturedData.map((data, idx) => {
            if (data.type === 'product') {
              return <ProductTable key={idx} data={data} setProductData={setProductData} />;
            } else {
              return <OptionTable key={idx} data={data} />;
            }
          })}
        </tbody>
      </Table>
      <PaginationBox>
        <Pagination pageSliceArr={pageSliceArr} pageNum={pageNum} setPageNum={setPageNum} />
      </PaginationBox>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${lightTheme.bgColor};
  color: ${lightTheme.textColor};
  margin: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid black;
`;

const HeadTr = styled.tr`
  background-color: ${lightTheme.ownColor};
`;

const TableTitle = styled.td`
  border: 0.7px solid black;
  vertical-align: middle;
  height: 30px;
  padding-left: 4px;
  text-align: center;
  width: ${prop => prop.width}%;
`;

const PaginationBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export default RegisterList;

const TITLES = [
  { title: '삭제', width: 3 },
  { title: '품번', width: 3 },
  { title: '이미지', width: 10 },
  { title: '상품명', width: 20 },
  { title: '상품 옵션', width: 16 },
  { title: '가격(할인가)', width: 7 },
  { title: '재고', width: 6 },
  { title: '배송방법', width: 6 },
  { title: '배송비', width: 6 },
  { title: '상태', width: 10 },
  { title: '마지막 수정일', width: 8 },
  { title: '상품노출', width: 16 },
];
