import './discount.scss';

type PropsType = {
  number: any;
};

export function Discount({ number }: PropsType) {
  return <p className="discount-tag">{number}%</p>;
}
