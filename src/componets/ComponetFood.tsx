import { Menu } from "../app/page";
import syledCompone from "./../app/pageComponet.module.css";
import 'react-loading-skeleton/dist/skeleton.css'
const ComponetFood = ({ title, price, url_imagen, category }: Menu) => {
  return (
    <>
     <div className={syledCompone.fooditem}>
      
      <div className={syledCompone.wrapper}>
        <p className={syledCompone.title}> {title}</p>
        <p>
          <span className={syledCompone.price}>{price}$</span> <br />
          categoria <b>{category}</b>
        </p>
        <img src={url_imagen} alt={title}/>
      </div>
     </div>
    </>
  );
};

export default ComponetFood;
