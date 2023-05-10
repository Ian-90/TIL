import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button
        onClick={() => setOrderPhase("review")}
        disabled={totals.scoops === 0}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
