export default function ItemImage(props) {
  const img = props.img || process.env.REACT_APP_NO_IMAGE_URL;
  return (
    <img src={img} alt={props.title}/>
  );
}
