import './button.scss';

type propsType = {
  title: string;
};

export function CustomButton({ title }: propsType) {
  return <button className="custom-button">{title}</button>;
}
