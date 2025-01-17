import styled from 'styled-components';
import BoxTitle from './BoxTitle';
const Payment = ({ getData }) => {
  return (
    <>
      <BoxTitle title="결제하기" />
      <CheckBoxWrapper>
        <CheckBox type="checkbox" />
        <Label>전체동의</Label>
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" />
        <Label>개인정보 수집 및 이용 동의</Label>
        <Link href="#">약관보기</Link>
      </CheckBoxWrapper>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" />
        <Label>구매조건 확인 및 결제진행에 동의</Label>
      </CheckBoxWrapper>
      <ButtonBox>
        <Button onClick={getData}>결제하기</Button>
      </ButtonBox>
    </>
  );
};

// styled-components 위치
const CheckBoxWrapper = styled.div``;
const CheckBox = styled.input``;
const ButtonBox = styled.div``;
const Button = styled.button`
  width: 100%;
`;
const Label = styled.label`
  color: ${props => props.theme.textColor};
`;
const Link = styled.a`
  color: ${props => props.theme.textColor};
`;
export default Payment;
